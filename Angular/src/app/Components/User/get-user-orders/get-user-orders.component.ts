import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-get-user-orders',
  templateUrl: './get-user-orders.component.html',
  styleUrls: ['./get-user-orders.component.css']
})
export class GetUserOrdersComponent implements OnInit {

  _userOrders:any; //property who contains the user Order

  constructor(private userService:UserService,private router:Router) {


   }
   //function that get all the user's orders by subscribing getUserOrders with the UserId param
  // and save the result to _userOrders
   getuserOrders(){
     this.userService.getUserOrders(this.userService.currentUser.UserID).subscribe(orders=>
      {this._userOrders=orders})
   }


  ngOnInit(): void {
      this.getuserOrders();
    

  }

}
