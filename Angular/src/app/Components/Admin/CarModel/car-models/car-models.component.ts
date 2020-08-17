import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-car-models',
  templateUrl: './car-models.component.html',
  styleUrls: ['./car-models.component.css']
})
export class CarModelsComponent implements OnInit {

  carmodels:any;
  //function that return all the car models and saved it to carmodels property
  getAllCarModels(){
    this.adminService.getAllCarModels().subscribe(cm=>{this.carmodels=cm})
  }
  //function that get one carmodelid property
  //subscribes to DeleteCarModel function to delete the current carModel with 
  //that car model id and refresh the carmodels arr
  deleteCarModel(carmodelid:string){
    this.adminService.DeleteCarModel(Number(carmodelid)).subscribe(cm=>{console.log(cm)
    this.getAllCarModels();
    })
  }
  constructor(private adminService:AdminService) {

   }

  ngOnInit(): void {
    this.getAllCarModels();
  }

}
