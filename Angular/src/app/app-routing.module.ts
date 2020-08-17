import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchAvaliableCarsComponent } from './Components/Cars/search-avaliable-cars/search-avaliable-cars.component';
import { GetCarComponent } from './Components/Cars/get-car/get-car.component';
import { CarOrderComponent } from './Components/Order/car-order/car-order.component';
import { SignInComponent } from './Components/User/sign-in/sign-in.component';
import { ReturnCarComponent } from './Components/Employee/return-car/return-car.component';
import { ControlPanelComponent } from './Components/Admin/control-panel/control-panel.component';
import { EditEmployeesComponent } from './Components/Admin/User/edit-employees/edit-employees.component';
import { WelcomeComponent } from './Components/Admin/welcome/welcome.component';
import { EditComponent } from './Components/Admin/User/edit/edit.component';
import { AddUserComponent } from './Components/Admin/User/add-user/add-user.component';
import { CarModelsComponent } from './Components/Admin/CarModel/car-models/car-models.component';
import { EditCarModelComponent } from './Components/Admin/CarModel/edit-car-model/edit-car-model.component';
import { AddCarModelComponent } from './Components/Admin/CarModel/add-car-model/add-car-model.component';
import { GetCarsComponent } from './Components/Admin/Cars/get-cars/get-cars.component';
import { EditCarComponent } from './Components/Admin/Cars/edit-car/edit-car.component';
import { AddCarComponent } from './Components/Admin/Cars/add-car/add-car.component';
import { GetOrdersComponent } from './Components/Admin/Orders/get-orders/get-orders.component';
import { AddOrderComponent } from './Components/Admin/Orders/add-order/add-order.component';
import { EditOrderComponent } from './Components/Admin/Orders/edit-order/edit-order.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { UserPanelComponent } from './Components/User/user-panel/user-panel.component';
import { EditUserComponent } from './Components/User/edit-user/edit-user.component';
import { GetUserOrdersComponent } from './Components/User/get-user-orders/get-user-orders.component';
import { HelloComponent } from './Components/UI/hello/hello.component';


const routes: Routes = [
  { path: 'employee', component: ReturnCarComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'home', component: HelloComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'car/:CarID', component: GetCarComponent },
  { path: 'order/:CarID', component: CarOrderComponent },

  { path: 'userpanel',
    component:UserPanelComponent,
  children:[
    {
      path: 'edituser',
      component: EditUserComponent,
      outlet:'userpanel'
      
    },
    {
      path: 'userorders',
      component: GetUserOrdersComponent,
      outlet:'userpanel'
      
    },
    {
      path: '',
      component: GetUserOrdersComponent,
      outlet:'userpanel'
      
    },


  ]}

,

  {
    path: 'admin',
    component: ControlPanelComponent,
    children:[

      {
        path: 'edituser/:UserID',
        component: EditComponent,
        outlet:'list'
        
      },
      {
        path: 'editcarmodel/:carmodelID',
        component: EditCarModelComponent,
        outlet:'list'
        
      },
      {
        path: 'editcar/:CarLicenseNumber',
        component: EditCarComponent,
        outlet:'list'
        
      },
      {
        path: 'editorder/:orderid',
        component: EditOrderComponent,
        outlet:'list'
        
      },
      {
        path: 'employee',
        component: EditEmployeesComponent,
        outlet:'list'
      },

      {
        path: 'cars',
        component: GetCarsComponent,
        outlet:'list'
      },
      {
        path: 'adduser',
        component: AddUserComponent,
        outlet:'list'
      },
      {
        path: 'addcar',
        component: AddCarComponent,
        outlet:'list'
      },

      {
        path: 'addorder',
        component: AddOrderComponent,
        outlet:'list'
      },
      {
        path: 'addcarmodel',
        component: AddCarModelComponent,
        outlet:'list'
      },
      {
        path: 'carmodel',
        component: CarModelsComponent,
        outlet:'list'
      },
      {
        path: 'orders',
        component: GetOrdersComponent,
        outlet:'list'
      },

      {
        path: '',
        component: WelcomeComponent, 
        outlet:'list'
      },


    ]
  },

  {
    path: 'searchcar',
    component: SearchAvaliableCarsComponent,
    
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
