import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private adminService:AdminService,private router:Router) { }

  //function that get on parameter orderData with the ordersTable property
  // and adds new user
  // if the process has failed it will alert
  // else if succeded it will alert for success and navigate to adminOrders component
  onSubmit(orderData) {
    this.adminService.AddOrder(orderData).subscribe(h=>{
      alert("the Process Has Succeeded")
      this.router.navigate(['/admin/', { outlets: { list: ['orders'] } }]);

    },error => 
      alert("the Process Has Failed Please Check Your Values")
    );
  }
  //function that create new form group with empty details and save it to registerForm property
  ngOnInit(): void {
    this.registerForm =this.formBuilder.group({
      UserID: '',
      CarLicenseNumber:'',
      StartDate:'',
      EstimatedReturnDate: '',
      ReturnDate: '',
    });
  }

}
