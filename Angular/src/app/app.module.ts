import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/UI/header/header.component';
import { FooterComponent } from './Components/UI/footer/footer.component';
import { SearchAvaliableCarsComponent } from './Components/Cars/search-avaliable-cars/search-avaliable-cars.component';
import { CarService } from './Services/car.service';
import { SearchCarPipe } from './Pipe/search-car.pipe';
import { GetCarComponent } from './Components/Cars/get-car/get-car.component';
import { CarOrderComponent } from './Components/Order/car-order/car-order.component';
import { SignInComponent } from './Components/User/sign-in/sign-in.component';
import { UserService } from './Services/user.service';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchAvaliableCarsComponent,
    SearchCarPipe,
    GetCarComponent,
    CarOrderComponent,
    SignInComponent,
    ReturnCarComponent,
    ControlPanelComponent,
    EditEmployeesComponent,
    WelcomeComponent,
    EditComponent,
    AddUserComponent,
    CarModelsComponent,
    EditCarModelComponent,
    AddCarModelComponent,
    GetCarsComponent,
    EditCarComponent,
    AddCarComponent,
    GetOrdersComponent,
    AddOrderComponent,
    EditOrderComponent,
    RegisterComponent,
    UserPanelComponent,
    EditUserComponent,
    GetUserOrdersComponent,
    HelloComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
