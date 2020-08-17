import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/Services/car.service';

@Component({
  selector: 'app-search-avaliable-cars',
  templateUrl: './search-avaliable-cars.component.html',
  styleUrls: ['./search-avaliable-cars.component.css']
})
export class SearchAvaliableCarsComponent implements OnInit {
  AvaliableCars:any;
  lastcars:any;
  userSearchSelect:number
  isDate:boolean;
  searchInput:string;
  count;


  userSelect(any){
    this.userSearchSelect = Number(any);
    if(this.userSearchSelect ==8){
      this.isDate=true
    }
    else{
      this.isDate=false;
    }

  }

  //Function who get car object,
  //count value is the local storage length happens on ngOnInit
  //if the value is lower than 4 so car "++count" equals to carID
  
  carmodelClick(car:any){
    if(this.count < 4){         
      localStorage.setItem("car"+ ++this.count,car.CarID)
    }

    //else count equals to 1
    //we push the car "2-4" to a  new arr 1 is the oldest data
    //and lately push the car.carID value, and set the array back to the locale storage
    else{
      let arr:Array<string>=new Array<string>();
      this.count=1;
      for(let i=2;i<=4;i++){
        arr.push(localStorage.getItem("car"+i))
      }
      arr.push(car.CarID);
      for(let i=1;i<=4;i++){
        localStorage.setItem("car"+i,arr[i-1]) 
      }
    }
  }

  //Function get all the cars who stored in the locale storage
  //subscribe to this channel and if car isnt null the object will be added to the cars arr
  //finally return the cars array
  getLastCarModels(){
    let cars:any =[];
    let car:any;
    for(let i=1;i<=4;i++){
      if((localStorage.getItem("car"+i)!=null)){
        this.carService.getAvaliableCar(localStorage.getItem("car"+i)).subscribe(c=>{car=c
          if(car!=null){
            cars.push(car);
          }
        });
      }
    }
    return cars;
  }

  constructor(private carService:CarService) {   }

  ngOnInit(): void {
    this.count=localStorage.length;
    this.carService.getAvaliableCarModels().subscribe(cm=>this.AvaliableCars=cm);
    this.lastcars=this.getLastCarModels();
  }

}
