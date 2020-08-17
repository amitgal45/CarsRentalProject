import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  //function that get 2 parameters of date and calculate the number of days between the dates
  //create new date object with date1 & date2 string, convert the time to milliseconds
  // subbtracting date1-date2 the remainder will convert to days
  //and return the number of days +1
  //for including the last day of order
  CalcEstimidatedDaysOfRent(date1,date2)
  {
      date1=new Date(date1);
      date2= new Date(date2);
      let diff = Math.abs(date1.getTime() -date2.getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays+1
  }
  //function that get 1 parameter and calculate the days that have been passed 
  //from the date1 parameter that we get from the function till today
  //return the number of days that has been passed from the StartDate till now
  CalcTotalDays(date1)
  {
      date1=new Date(date1);
      let date2= new Date();
      let diff = Math.abs(date1.getTime() -date2.getTime());
      let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      return diffDays;
  }


  constructor() { }
}
