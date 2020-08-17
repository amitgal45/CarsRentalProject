import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serverUrl:string="http://localhost:61243";

  //#region UserControl
  
  getAllUsers(){
    return this.http.get(`${this.serverUrl}/api/users/admin/allusers/`);
  }

  GetUser(userid:string){
    return this.http.get(`${this.serverUrl}/api/users/getuser/${userid}`);
  }

  EditUser(user:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.serverUrl}/api/users/admin/edit`,user,httpOptions)
  }

  DeleteUser(userid:number){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(`${this.serverUrl}/api/user/deleteuser/${userid}`,httpOptions)
  }

  AddUser(user:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.serverUrl}/api/users/admin/add/`,user,httpOptions)
  }
  //#endregion

  //#region CarModelControl

  getAllCarModels(){
    return this.http.get(`${this.serverUrl}/api/carmodel/admin/get/`);
  }

  getCarModel(carmodelID:string){
    return this.http.get(`${this.serverUrl}/api/carmodel/admin/get/${carmodelID}/`);
  }

  editCarModel(carmodel:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.serverUrl}/api/carmodel/admin/edit`,carmodel,httpOptions);
  }
  

  AddCarModel(carmodel:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.serverUrl}/api/CarModel/admin/add`,carmodel,httpOptions)
  }

  DeleteCarModel(carmodelID:number){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(`${this.serverUrl}/api/carmodel/admin/delete/${carmodelID}/`,httpOptions)
  }

  //#endregion

  //#region CarsControl

  getAllCars(){
    return this.http.get(`${this.serverUrl}/api/cars/admin/get/`);
  }

  getCar(carlicenseid:string){
    return this.http.get(`${this.serverUrl}/api/cars/admin/get/${carlicenseid}/`);
  }

  AddCar(car:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.serverUrl}/api/cars/admin/add/`,car,httpOptions)
  }

  editCar(car:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.serverUrl}/api/cars/admin/edit`,car,httpOptions);
  }

  DeleteCar(carlicenseid:number){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(`${this.serverUrl}/api/cars/admin/delete/${carlicenseid}/`,httpOptions)
  }
  
  //#endregion
  
  //#region OrdersControl

  getAllOrders(){
    return this.http.get(`${this.serverUrl}/api/orders/admin/allorders`);
  }

  GetOrder(orderid:string){
    return this.http.get(`${this.serverUrl}/api/orders/admin/get/${orderid}`);
  }

  EditOrder(order:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.serverUrl}/api/orders/admin/edit/`,order,httpOptions)
  }

  DeleteOrder(orderid:number){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete(`${this.serverUrl}/api/orders/admin/delete/${orderid}`,httpOptions)
  }

  AddOrder(user:any){
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(`${this.serverUrl}/api/orders/admin/add/`,user,httpOptions)
  }

  //#endregion

  constructor(private http:HttpClient) { }
}
