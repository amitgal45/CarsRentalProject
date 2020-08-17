import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarService } from 'src/app/Services/car.service';
import { CalcService } from 'src/app/Services/calc.service';

@Component({
  selector: 'app-get-car',
  templateUrl: './get-car.component.html',
  styleUrls: ['./get-car.component.css']
})
export class GetCarComponent implements OnInit {

  car:any;
  StartDate:Date;
  EndDate:Date;
  days:number;

  constructor(
    private route: ActivatedRoute,
    private carService:CarService,
    private location: Location,
    private calcService:CalcService) {

     }

  getCar(): void {
    const CarID = this.route.snapshot.paramMap.get('CarID'); //get the CarID param from the url
    this.carService.getAvaliableCar(CarID) //subscribes to the channel using CarID parameter
      .subscribe(tmpcar => {this.car = tmpcar //store it the car property
      });  
  }

  //function who get 2 params start date and end date and saved it in the CarService
  
  passDateParams(startDate:Date,endDate:Date){
    this.carService.startDate=startDate;
    this.carService.endDate=endDate;
  }

  // לא מספיק יעיל לייעל
  calcDays(startdate:any,enddate:any){
    if(startdate<enddate){
    this.days=this.calcService.CalcEstimidatedDaysOfRent(startdate,enddate)
  }else{
    alert("wrong value");
  }
  }

  
  ngOnInit(): void {
    this.getCar();
  }

}
