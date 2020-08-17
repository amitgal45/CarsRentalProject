import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  
isAdmin(){
  if(this.userService.isLogged==false||this.userService.isLogged==true && this.userService.currentUser.MemberLevel != 2 ){
    alert("u are not an admin")
    this.router.navigate(['/home']);
  }
}
  ngOnInit(): void {
    this.isAdmin();
  }

}
