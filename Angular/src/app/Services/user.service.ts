import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ServerUrl:string ;
  public currentUser: any = null;
  public isLogged:boolean = false;


  //function that get username and password as parameters and return user
  Login(username:string,password:string){
    return  this.http.get(`${this.ServerUrl}/login/${username}/${password}`);
  }

  //Function that navigates you to home page
  NavigateHome(){
    this.router.navigate(['/home']);
  }

    //Function that navigates you to home page
    NavigateUserPanel(){
      this.router.navigate(['/userpanel']);
    }
  //Function that navigates you to Sign In page
  NavigateSignIn(){
    this.router.navigate(['/sign-in']);
  }

  //function that checks if the user is logged and the current user member level is 0
  // if the currentuser is null and isLogged equals to false (means the user isnt logged) 
  // it will alert about it and navigate u to the sign in component
  //if the user is logged and his memberlevel is different than 0 so it will alert 
  // user isnt user and navigate home
  isUser(){
    if(this.currentUser == null && this.isLogged == false)
    {
      alert("U arent Logged in");
      this.NavigateSignIn();
    }
    else if(this.currentUser != null && this.currentUser.MemberLevel != 0){
      alert("U arent an user");
      this.NavigateHome();
    }
  }

  //function that checks if the user is logged and the current user member level is 1 (means employee)
  // if the currentuser is null and isLogged equals to false (means the user isnt logged) 
  // it will alert about it and navigate u to the sign in component
  //if the user is logged and his memberlevel is different than 1 so it will alert 
  // current user isnt an employee and navigate home

  isEmployee(){
    if(this.currentUser == null && this.isLogged == false)
    {
      alert("U arent Logged in");
      this.NavigateSignIn();
    }
    else if(this.currentUser != null && this.currentUser.MemberLevel != 1){
      alert("U arent an employee");
      this.NavigateHome();
    }
  }

  //function the log out the current user by changing the currentuser property 
  // to null and isLogged property to false
  LogOut(){
    this.currentUser=null;
    this.isLogged=false;
    
      this.router.navigate(['/home']);
    
  }

  
  // UserEdit(user:User){
  //   return this.http.put(`${this.ServerUrl}/${user.idnumber}`,user);
  // }
//http://localhost:61243/api/users/getuser/1
  getUser(userid:number){
    return this.http.get(`${this.ServerUrl}/api/users/getuser/${userid}`);
  }

  getUserOrders(userid:number){
    return this.http.get(`${this.ServerUrl}/api/orders/user/${userid}`);
  }
  
  constructor(private http: HttpClient,
    private router:Router,
    private formBuilder:FormBuilder,) { 
    this.ServerUrl="http://localhost:61243/";
    
    }
}
