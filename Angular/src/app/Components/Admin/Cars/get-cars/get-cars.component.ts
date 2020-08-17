import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-get-cars',
  templateUrl: './get-cars.component.html',
  styleUrls: ['./get-cars.component.css']
})
export class GetCarsComponent implements OnInit {
cars:any;
  constructor(private adminService:AdminService) { }

  //function that get all the cars in CarsTable and store it to cars property
  getallCars(){
    this.adminService.getAllCars().subscribe(c=>{this.cars=c})
  }
  //function that get 1 parameter - carid id call the DeleteCar Function and
  //passing the carid and subscribe to the function to delete the table object
  //that the carid value is equal to table value and deletes it.
  //finally it refreshes the page by calling getallcar Function
  deleteCar(carid:string){
    this.adminService.DeleteCar(Number(carid)).subscribe(cm=>{
    this.getallCars();
    })
  }
  
  ngOnInit(): void {
    this.getallCars();
  }

}
