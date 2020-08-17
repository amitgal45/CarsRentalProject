import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {


  car:any;
  editcarForm:FormGroup;  
  imageUrl:string;
  image:any;

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  // function that get the carData from type any 
  // change the carData.Image to the base 64 code of the image that stored at the imageUrl
  // subscribe to the function to edit the currentUser- if succeded alert for success and navigate to getCars Component
  // else it will alert an error
  onSubmit(carData) {
    carData.Image=this.imageUrl;
    this.adminService.editCar(carData).subscribe(h=>{
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['cars'] } }]);
    },error => {console.log(error)
      alert(error);
    });
  }

  //function that get one file and converts it to base 64 code
  // taking the first item from filelist and store it to the image property
  // using reader.ReadasDataUrl and pass the image as parameter,
  // on load this.imageUrl propery will get the Base 64 Image Code
  handleFileInput(file:FileList){
    this.image = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl=event.target.result;
      
    }
    reader.readAsDataURL(this.image);

  }

  // function that happens on Components load, 
  // store the CarLicense number from the url
  // subscribe to getCar function with passing the car license number
  // if success it will store the value to the car prop
  // and create new Form with the object values 
  // if the car is undefined the imageUrl will get the car.Image value
  // else it will get the default image
  ngOnInit(): void {
    const CarLicenseNumber = this.route.snapshot.paramMap.get('CarLicenseNumber'); 
    this.adminService.getCar(CarLicenseNumber)
      .subscribe(tmpuser => {this.car = tmpuser
        this.editcarForm =this.formBuilder.group({
          CarLicenseNumber: this.car.CarLicenseNumber,
          currentKm: this.car.currentKm,
          Image: this.car.Image,
          isRentable:this.car.isRentable,
          isDamaged:this.car.isDamaged,
          carmodelID: this.car.carmodelID,
          BranchId:this.car.BranchId,
          CarID:this.car.CarID,


        });

        if(this.car.Image!=undefined){
          this.imageUrl=this.car.Image;
          
        }
          else{
          this.imageUrl='/assets/icons/defaultuser.png';
        }
        
      
      });

  }

}
