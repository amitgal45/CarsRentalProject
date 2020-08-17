import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  user:any;
  checkoutForm:FormGroup;
  imageUrl:string;
  image:any;

  constructor(private adminService:AdminService,private route:ActivatedRoute,private router:Router,private formBuilder: FormBuilder) { }

  onSubmit(userData) {
    userData.Image=this.imageUrl;
    this.adminService.EditUser(userData).subscribe(h=>{
      if(h!=null){
        alert("the Process Has Succeeded")
        this.router.navigate(['/admin/', { outlets: { list: ['employee'] } }]);
      }
    },error => {
      alert("the Process Has Failed Please Check Your Values")
    });
  }

  //function that get one file and converts it to base 64 code
  // taking the first item from filelist and store it to the image property
  // using reader.ReadasDataUrl and pass the image as parameter,
  // on load this.imageUrl propery will get the Base 64 Image Code
  handleFileInput(file:FileList){
    this.image = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl=event.target.result;
      
    }
    reader.readAsDataURL(this.image);

  }

  getCar(){
    const UserID = this.route.snapshot.paramMap.get('UserID');
    console.log(UserID);
    debugger;
    this.adminService.GetUser(UserID)
      .subscribe(tmpuser => {this.user = tmpuser
        console.log(this.user);
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
        debugger;
        if(this.user.Image!=undefined){
          this.imageUrl=this.user.Image;
          
        }
          else{
          this.imageUrl='/assets/icons/defaultuser.png';
        }
      });
  }

  ngOnInit(): void {
    this.getCar();


  }

}
