import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  registerForm:FormGroup;
  imageUrl:string;
  image:any;

  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router) { }

  //function that get 1 parameter from type any of the user data,
   //inserts the image url to the object and subscribe to the function AddUser
  //if its completed it will show an alert and navigate to manager user page
  //else alert for failure
  onSubmit(userData) {
    debugger;
    var isCompleted=null;
    userData.Image=this.imageUrl;
      this.adminService.AddUser(userData).subscribe(h=>{
        isCompleted=h
        alert("the Process Has Succeeded")
        this.router.navigate(['/admin/', { outlets: { list: ['employee'] } }]);
      },error => {console.log(error)
        alert("the Process Has Failed Please Check Your Values")
      });
  }

  //function that get one file and converts it to base 64 code
  // taking the first item from filelist and store it to the image property
  // using reader.ReadasDataUrl and pass the image as parameter,
  // on load this.imageUrl propery will get the Base 64 Image Code
  handleFileInput(file:FileList){
    this.image = file.item(0);
    let reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(this.image);
  }


  

  ngOnInit(): void {
    this.imageUrl = 'assets/icons/defaultuser.png'
    this.registerForm =this.formBuilder.group({
      FullName: '',
      PassportID:'',
      UserName:'',
      BirthDate: '',
      Gender: '',
      Email: '',
      Image: '',
      MemberLevel: '',
      Password: '',
    });
  }

}
