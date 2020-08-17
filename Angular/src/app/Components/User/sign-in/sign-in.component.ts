import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  currentUser:any = null;
  //function who gets 2 params 
  //and subscribe to Login with username and password properties
  //if there is user with this information it signs in

  onSubmit(username:string,password:string){
      this.userService.Login(username,password).subscribe(user=>{
        this.currentUser=user
      if(this.currentUser != null){
        this.userService.isLogged=true
        this.userService.currentUser=this.currentUser
        alert("login succedded")
        this.userService.NavigateHome();
      }
        },err=>{alert("Failed to log in please check ur values")
      console.log(err)
      }
        
        )
      }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

}
