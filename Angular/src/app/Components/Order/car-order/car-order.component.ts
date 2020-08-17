import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/Services/car.service';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-car-order',
  templateUrl: './car-order.component.html',
  styleUrls: ['./car-order.component.css']
})
export class CarOrderComponent implements OnInit {

  car:any;
  user:any;
  checkoutForm:any;
  
  constructor(private route: ActivatedRoute,
    private carService:CarService,
    private userService:UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }


  //function who gets the CarId param from the url
  //subscribe to getCarModel in CarService
  //saves the object to the car propery
  //and calls to checkoutFormGroup

  getCar(): void {
    const CarID = this.route.snapshot.paramMap.get('CarID');
    console.log(CarID);
    this.carService.getAvaliableCar(CarID)
      .subscribe(tmpcar => {this.car = tmpcar
        this.checkoutFormGroup(this.car.CarLicenseNumber);
      });
      
  }

  //function who check if the user is logged in by check if isLogged is false , when its false 
  // it will show alert of "please log in" and navigate it to sign-in url
  // else user value equals to userService.CurrentUser
  isUserLogged(): void {
    if(!this.userService.isLogged){
      alert("please log in")
      this.router.navigate(['/sign-in']);
    }
    else{
      this.user=this.userService.currentUser;
    }

      
  }

  //function who get the customer data
  //subscribe to the orderCar function in car Service
  
  onSubmit(customerData) {
    // Process checkout data here
    if(customerData.EstimatedReturnDate<customerData.StartDate){
      alert("Please Check Your Dates");
    }else{
      this.carService.orderCar(customerData).subscribe(h=>{
        alert('Your order has been submitted');
          this.router.navigate(['/home']);
  
      }
      
      );
    }
    
    this.checkoutForm.reset();  
  }

  checkoutFormGroup(CarLicenseNumber:string){
    this.checkoutForm =this.formBuilder.group({
      StartDate: this.carService.startDate,
      EstimatedReturnDate: this.carService.endDate,
      UserID:this.userService.currentUser.UserID,
      CarLicenseNumber:CarLicenseNumber,
      ReturnDate: null,
    });

  }
  //
  ngOnInit(): void {
    this.isUserLogged();
    this.getCar();
  }

}
