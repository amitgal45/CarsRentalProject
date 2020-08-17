import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCar'
})
export class SearchCarPipe implements PipeTransform {

  transform(cars: any[],value:number,inputText:string): any[] {
    inputText=inputText.toLowerCase();
    let tmpCars:any[]=[];
    if(value==undefined){
      value=0;
      return cars;
    }
    else{
    
    switch(value){
      case 0:{
        return cars;
      }

      

    case 1:{
            for(let i=0;i<cars.length;i++){
            if(cars[i].manufacturer.toLowerCase().indexOf(inputText)>-1)
             {
            tmpCars.push(cars[i]);
             }
      }
      return tmpCars;
    }

    case 2:{
      for(let i=0;i<cars.length;i++){
      if(cars[i].model.toLowerCase().indexOf(inputText)>-1)
       {
      tmpCars.push(cars[i]);
       }
      }
      return tmpCars;
    }

    case 3:{
      for(let i=0;i<cars.length;i++){
      if(cars[i].year.toLowerCase().indexOf(inputText)>-1)
       {
      tmpCars.push(cars[i]);
       }
      }
      return tmpCars;
    }

    case 4:{
      for(let i=0;i<cars.length;i++){
      if(cars[i].gearbox.toLowerCase().indexOf(inputText)>-1)
       {
      tmpCars.push(cars[i]);
       }
      }
      return tmpCars;
    }

    case 5:{
      for(let i=0;i<cars.length;i++){
      if(cars[i].dailyPrice.toString().indexOf(inputText)>-1)
       {
      tmpCars.push(cars[i]);
       }
      }
      return tmpCars;
    }

    case 6:{
      for(let i=0;i<cars.length;i++){
        if((cars[i].manufacturer.toLowerCase().indexOf(inputText)>-1)||
        (cars[i].model.toLowerCase().indexOf(inputText)>-1) ||
        (cars[i].year.toLowerCase().indexOf(inputText)>-1) ||
        (cars[i].gearbox.toLowerCase().indexOf(inputText)>-1)||
        (cars[i].dailyPrice.toString().indexOf(inputText)>-1))
         {
        tmpCars.push(cars[i]);
         }
  }
  return tmpCars;
      
    }



    


      }

    }
    

    
  }

}
