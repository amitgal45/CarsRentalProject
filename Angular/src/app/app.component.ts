import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Best Car Rent';
  
  imageUrl:string;

  calculateDate(date1:Date,date2:Date){
    var diff = Math.abs(date1.getTime() - date2.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
  }
  
  handleFileInput(file:FileList){
    var itemToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any)=> {
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(itemToUpload);

  }
}
