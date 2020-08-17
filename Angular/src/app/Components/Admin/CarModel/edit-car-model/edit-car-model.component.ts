import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-car-model',
  templateUrl: './edit-car-model.component.html',
  styleUrls: ['./edit-car-model.component.css']
})
export class EditCarModelComponent implements OnInit {

  

  carmodel:any;
  carmodelForm:FormGroup;

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  //a function that get carmodel data, subscribes to editCarModel
  //if the process has succeeded it will show an alert and navigate to ManageCarModel Component
  //else it show a failure message
  onSubmit(carmodelData) {
    console.log(carmodelData);
    var isCompleted=null;
    this.adminService.editCarModel(carmodelData).subscribe(h=>{
      isCompleted=h
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['carmodel'] } }]);

    },error => {console.log(error)
      alert("the Process Has Failed Please Check Your Values")
    });
  }

  // function who create new form builder with the current carModel values
  createCarModelForm(){
    return this.formBuilder.group({
      carmodelID: this.carmodel.carmodelID,
      manufacturer: this.carmodel.manufacturer,
      model: this.carmodel.model,
      dailyPrice:this.carmodel.dailyPrice,
      dailyLateFee:this.carmodel.dailyLateFee,
      year: this.carmodel.year,
      gearbox: this.carmodel.gearbox
    });
  }

  // function that get the carmodelid value from the url
  // subscribes to getCarModel function passing the carmodelID
  // if succedded the carmodelForm prop will get the createCarModelForm function return
  ngOnInit(): void {
    const carmodelID = this.route.snapshot.paramMap.get('carmodelID');
    this.adminService.getCarModel(carmodelID)
      .subscribe(currentcm => {this.carmodel = currentcm
        this.carmodelForm = this.createCarModelForm();
      });

  }

}
