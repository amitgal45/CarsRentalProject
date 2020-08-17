import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {

  

  allUsers:any;
  


  getAllUsers(){
    this.adminService.getAllUsers().subscribe(u=>{this.allUsers=u
    console.log(this.allUsers);
    })
  }

  DeleteUser(userid:number){
    this.adminService.DeleteUser(userid).subscribe(h=>{console.log(h)
      this.getAllUsers()
    })
    
  }

  ngOnInit(): void {
    this.getAllUsers();
    
  }

  constructor(private adminService:AdminService) { }

}
