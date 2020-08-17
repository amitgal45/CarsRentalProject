import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {


  imageUrl:string;
  image:any;
  user:any;
  checkoutForm:FormGroup;

  constructor(private userService:UserService,private adminService:AdminService,
              private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  // function who get json that include all the edited user details
  // changes the object.Image value to imageUrl
  // subscribe to EditUser 
  // if the proccess succeded it will alerts u and navigate u back to the user panel component
  // else it will alerts u for failure

  onSubmit(customerData) {
    customerData.Image=this.imageUrl;
    this.adminService.EditUser(customerData).subscribe(h=>{
      this.userService.currentUser=h
      console.log(this.userService.currentUser)
      alert("the Process Has Succeeded")
      this.router.navigate(['/userpanel']);
    },error => {console.log(error)
      alert("the Process Has Failed Please Check Your Values")
    });
  }


  //function that gets one parameter from filelist type
  handleFileInput(file:FileList){
    this.image = file.item(0); // saved the file to image propery
    var reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl=event.target.result; //convert this.image to base64 code and store it to imageUrl Prop
    }
    reader.readAsDataURL(this.image);
  }

  //a function who builds a form with all the user params
  getUser(){
      this.checkoutForm =this.formBuilder.group({
      UserID: this.user.UserID,
      FullName: this.user.FullName,
      PassportID:this.user.PassportID,
      UserName:this.user.UserName,
      BirthDate: this.user.BirthDate,
      Gender: this.user.Gender,
      Email: this.user.Email,
      Image: this.user.Image,
      MemberLevel: this.user.MemberLevel,
      Password: this.user.Password,
    });
      this.imageUrl=this.user.Image;
  }

  ngOnInit(): void {

    if(this.userService.currentUser !=undefined){
      
      this.user=this.userService.currentUser;
      this.getUser();
    }
  }
}
