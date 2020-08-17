import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carmodels:any;
  addCarForm:FormGroup;
  car:any;
  imageUrl:string;
  image:any;
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router) { }


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
  
  // function that get the carData from type any 
  // changes the carData.Image value to the base 64 code of the image that stored at the imageUrl
  // subscribe to the function to add new car , if succeded alert for success and navigate to getCars Component
  // else it will alert an error
  onSubmit(carData) {
    carData.Image=this.imageUrl;
    this.adminService.AddCar(carData).subscribe(h=>{
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['cars'] } }]);
    
    },error => {console.log(error)
      alert("the Process Has Failed Please Check Your Values")
    });
  }

  //function that get all the "carmodels" in the CarModelsTable
  //subscribe to thr function and store the carmodel names in carmodels prop
  getAllCarModels(){
    this.adminService.getAllCarModels().subscribe(cm=>{this.carmodels=cm})
  }

  //creates new form that contains all the carsTable values,
  //and get the carModel values to make sure that the car model value who choosen is valid
  
  ngOnInit(): void {
    this.addCarForm =this.formBuilder.group({
      CarLicenseNumber:[ null,[Validators.required , Validators.pattern('[0-9]*')]],
      currentKm: '',
      Image:'',
      isRentable:'',
      isDamaged:'',
      carmodelID: '',
      BranchId: 1,
    });
    this.getAllCarModels();
    this.imageUrl='/assets/icons/defaultuser.png';
  }

  

}
