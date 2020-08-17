import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {

  editForm:FormGroup;
  order:any;
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router,private route:ActivatedRoute) { }

   //function that get on parameter orderData with the ordersTable property
  // and edits existing user user
  // if the process has failed it will alert
  // else if succeded it will alert for success and navigate to adminOrders component
  onSubmit(orderData) {
    this.adminService.EditOrder(orderData).subscribe(h=>{
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['orders'] } }]);

    },error => {console.log(error)
      alert("the Process Has Failed Please Check Your Values")
    });
  }

  //function that get the orderid from the url
  // subscribe to getOrder func to get the order with the current orderid
  // and save the ordersTable values to a new FormGroup

  ngOnInit(): void {
    const orderid = this.route.snapshot.paramMap.get('orderid');
    this.adminService.GetOrder(orderid)
      .subscribe(tmporder => {this.order = tmporder
        this.editForm =this.formBuilder.group({
          OrderID: this.order.OrderID,
          UserID: this.order.UserID,
          CarLicenseNumber:this.order.CarLicenseNumber,
          StartDate:this.order.StartDate,
          EstimatedReturnDate: this.order.EstimatedReturnDate,
          ReturnDate: this.order.ReturnDate,
        });
  });


  }
}