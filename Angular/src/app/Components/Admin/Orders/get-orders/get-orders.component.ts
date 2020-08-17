import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.css']
})
export class GetOrdersComponent implements OnInit {


  orders:any;
  //function that get all the car orders to orders property
  getAllOrders(){
    this.adminService.getAllOrders().subscribe(odr=>{this.orders=odr
    })
  }
  //function that get 1 paramater passed it to delete function
  // the orderid of any object in OrdersTable will be removed from the table
  //and the orders get refreshed
  deleteOrder(orderid:string){
    this.adminService.DeleteOrder(Number(orderid)).subscribe(cm=>{console.log(cm)
    this.getAllOrders();
    })
  }
  constructor(private adminService:AdminService) {

   }

  ngOnInit(): void {
    this.getAllOrders();
  }

}
