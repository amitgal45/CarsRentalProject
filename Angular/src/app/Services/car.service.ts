import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  serverUrl:string="http://localhost:61243";
  avaliableCars:any;
  car:any;
  public startDate:Date;
  public endDate:Date;

  orderCar(order:any){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    return this.http.put(`${this.serverUrl}/api/cars/rentcar/edit/`,order,httpOptions)
  }
  
  getAvaliableCar(carID:string){
    return this.http.get(`${this.serverUrl}/api/cars/cardetails/${carID}`);
  }

  getAvaliableCarModels(){
    return this.http.get(`${this.serverUrl}/api/cars/getavaliablecars`);
  }

  constructor(private http:HttpClient) { 

  }
}
