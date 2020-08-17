import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router } from '@angular/router';
import { CalcService } from 'src/app/Services/calc.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-return-car',
  templateUrl: './return-car.component.html',
  styleUrls: ['./return-car.component.css']
})
export class ReturnCarComponent implements OnInit {

  //property need to change
  OrdersFound:any ;
  orderdays:number;
  extrafeeDays:number;
  totalamount:number;
  totaldays:number;

  //function who get one parameter: Car License number
  //subscribes to getCar function in employee Service
  //store the object in OrdersFound
  //checks if the object isnt null or underfined
  //calculate the days of the estimated return date and store it to the property orderdays
  //calculate the days of the days from the start date till today and store it to totaldays
  //calcute the extrafree days 
  //and checks what kind of amount is it from the function isLateAmount
  //else alerts car license number

  searchCarOrder(carlicensenumber:string){
    this.employeeService.getCar(carlicensenumber).subscribe(
      order=>{
        this.OrdersFound=order;
        if(this.OrdersFound!=null && this.OrdersFound !=undefined){
        this.orderdays=this.calcService.CalcEstimidatedDaysOfRent(this.OrdersFound.StartDate,this.OrdersFound.EstimatedReturnDate)
        this.totaldays= this.calcService.CalcTotalDays(this.OrdersFound.StartDate)
        this.extrafeeDays=this.totaldays-this.orderdays
        this.isLateAmount();
    }
    else{
      alert("Car License Number is Invalid")
    } 
  })
   }


   //While the car order is already found and the user want to return the car
   //the function get 2 parameters
   // Subscribes to EditCarsTable to update the cars table and the orders table
   //alerts when its succeded and change the orderfound value to null

    onReturnClick(carlicensenumber:string,orderId:number){
    this.employeeService.EditCarsTable(carlicensenumber,orderId).subscribe(u=>{
      alert("The Return Has Succeded");
      this.OrdersFound=null;
    })

  }


  //Function thats compares the total days (days from the start day till now)
  // and the order days (the days between the start date to the estimated return date)
  // if order days value is bigger or equal to total days the total amount
  // so the total amount is equal to (daily price * total days) and the extra fee days value = 0
  //  else if total days is bigger the orderdays value
  //the total amount is order days * daily price to get the amount of money of the order not including the taxes
  // to get the fee days we inc total days-order days to get the amount of the days the user has late 
  // and calculate the fee the user should pay include the days of late
  
  isLateAmount(){   
    if(this.totaldays<=this.orderdays){
      this.totalamount = (this.totaldays*this.OrdersFound.dailyPrice)
      this.extrafeeDays=0;
    }
     else{
       if(this.totaldays>this.orderdays){
        this.totalamount = (this.orderdays*this.OrdersFound.dailyPrice) + ((this.totaldays-this.orderdays)*this.OrdersFound.dailyLateFee)
        this.extrafeeDays=this.totaldays-this.orderdays;
       }
     }
  }



  constructor(private employeeService:EmployeeService,private router: Router,private calcService:CalcService,private userService:UserService) { }

  
  ngOnInit(): void {
    this.userService.isEmployee();
    


  }

}
