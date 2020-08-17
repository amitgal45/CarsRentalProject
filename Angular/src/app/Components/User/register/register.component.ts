import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imageUrl:string;
  image:any;
  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private userService:UserService,private adminService:AdminService,private router:Router) { }

  //function who gets the form data of new user
  //change the Object.Image value to the imageUrl
  //subscribe to AddUser func in adminService
  //Shows alert if the proccess has completed
  //if the proccess has succeded the user will be logged in and navigate to home page
  //else it will alert for failure
  onSubmit(customerData) {
    customerData.Image=this.imageUrl;
      this.adminService.AddUser(customerData).subscribe(h=>{
        this.userService.isLogged=true
        this.userService.currentUser=customerData;
        alert("thank u for registering u are now logged in")
        this.userService.NavigateHome();
  
      },error => {
        alert("the Process Has Failed Please Check Your Values")
      });
  }

    handleFileInput(file:FileList){
    let image = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl= event.target.result;      
    }
    reader.readAsDataURL(image);
  }



  newUserForm(){
    return this.formBuilder.group({
      FullName: '',
      PassportID:'',
      UserName:'',
      BirthDate: '',
      Gender: '',
      Email: '',
      Image: '',
      MemberLevel: 0,
      Password: '',
    });
  }

  ngOnInit(): void {
    this.registerForm = this.newUserForm();
  }
}
