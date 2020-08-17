import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car-model',
  templateUrl: './add-car-model.component.html',
  styleUrls: ['./add-car-model.component.css']
})
export class AddCarModelComponent implements OnInit {

  carModelForm:FormGroup;
  
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router) { }

  //the function who get  carmodelData
  // and subscribe to AddCarModel function to create new Car Model
  // if the proccess has failed it will show an alert
  // else it'll navigate u to ManageCarModels component
  onSubmit(carmodelData) {
    var isCompleted=null;
    this.adminService.AddCarModel(carmodelData).subscribe(h=>{
      isCompleted=h
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['carmodel'] } }]);

    },error => {console.log(error)
      alert("the Process Has Failed Please Check Your Values")
    });
  }
  //function that return new formGroup with empty details
  createcarModelForm(){
    return this.formBuilder.group({
      manufacturer: '',
      model:'',
      dailyPrice:'',
      dailyLateFee: '',
      year: '',
      gearbox: '',
    });

  }
  ngOnInit(): void {
    this.carModelForm = this.createcarModelForm();
  }

}
