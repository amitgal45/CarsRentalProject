import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  serverUrl:string="http://localhost:61243";
  getCar(carlicensenumber:string){
    return this.http.get(`${this.serverUrl}/api/Orders/returncar/${carlicensenumber}`)
  }

  EditCarsTable(carlicensenumber:string,orderid:number){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.serverUrl}/api/cars/employee/${carlicensenumber}/${orderid}`,httpOptions)
  }

  constructor(private http:HttpClient) { }
}
