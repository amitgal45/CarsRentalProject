using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace CarsApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            #region GuestLevel

            //***************************************************
            //  Get All Avaliable & now damaged cars orderby manufacturer with BranchTable & CarModelTable.

            config.Routes.MapHttpRoute(
            name: "getavaliableCars",
            routeTemplate: "api/cars/getavaliablecars",
            defaults: new
            {
                controller = "Cars",
                action = "GetAllAvaliableCars"
            }
            );

            //***************************************************
            //  Get Car by passing the carlicenseid
            config.Routes.MapHttpRoute(
            name: "GetAvaliableCarsForSearchComponent",
            routeTemplate: "api/cars/admin/get/{carlicenseid}",
            defaults: new
            {
                controller = "Cars",
                action = "GetCar"
            }
            );

            #endregion

            #region UserLevel

            #region CarsController

            //***************************************************
            // Get Avaliable Cars
            config.Routes.MapHttpRoute(
            name: "getnonavaliablecar",
            routeTemplate: "api/{controller}/returncar/{carLicenseNumber}",
            defaults: new
            {
                controller = "Orders",
                action = "GetCarOrder"
            }
        );



            #endregion

            #region OrderController
            //***************************************************
            // get user orders
            config.Routes.MapHttpRoute(
            name: "getuserorders",
            routeTemplate: "api/orders/user/{userid}",
            defaults: new
            {
            controller = "Orders",
            action = "GetAllUserOrders"
            }
            );



            #endregion

            #region UserController

            //***************************************************
            // user login
            config.Routes.MapHttpRoute(
            name: "userlogin",
            routeTemplate: "login/{username}/{password}",
            defaults: new
            {
                controller = "Users",
                action = "GetUserLogin"
            }
            );



            #endregion


            #endregion

            #region EmployeeLevel

            config.Routes.MapHttpRoute(
name: "getcardetails",
routeTemplate: "api/cars/cardetails/{carid}",
defaults: new
{
    controller = "Cars",
    action = "GetAvaliableCar"
}
 );


            // ********************************************************************************************************************
            // Finish car order

            config.Routes.MapHttpRoute(
            name: "finishcarorder",
            routeTemplate: "api/cars/employee/{CarLicenseNumber}/{OrderID}",
            defaults: new
            {
            controller = "Orders",
            action = "OrderFinish"
            }
            );

            // ********************************************************************************************************************
            // Car Order
            config.Routes.MapHttpRoute(
            name: "ordercarstart",
            routeTemplate: "api/cars/rentcar/edit",
            defaults: new
            {
            controller = "Orders",
            action = "OrderStart"
            }
            );






            #endregion

            #region AdminLevel
            #region CarsContoller
            //***************************************************
            // Get All Cars In DB
            config.Routes.MapHttpRoute(
               name: "getallcars",
               routeTemplate: "api/cars/admin/get",
               defaults: new
               {
                   controller = "Cars",
                   action = "GetAllCars"
               }
                );
            //**************************************************
            //  Edit Car
            config.Routes.MapHttpRoute(
            name: "editcar",
            routeTemplate: "api/cars/admin/edit",
            defaults: new
            {
                controller = "Cars",
                action = "Put"
            }
            );

            //***************************************************
            //  Delete Car
            config.Routes.MapHttpRoute(
            name: "deletecar",
            routeTemplate: "api/cars/admin/delete/{caridnumber}",
            defaults: new
            {
                controller = "Cars",
                action = "Delete"
            }
            );
            //***************************************************
            //  Add Car
            config.Routes.MapHttpRoute(
            name: "addcar",
            routeTemplate: "api/cars/admin/add/",
            defaults: new
            {
                controller = "Cars",
                action = "Post"
            }
            );





            #endregion

            #region CarModel
            //***************************************************
            //  Get All Car Models
            config.Routes.MapHttpRoute(
            name: "getallcarmodels",
            routeTemplate: "api/carmodel/admin/get",
            defaults: new
            {
                controller = "CarModel",
                action = "GetAllCarModels"
            }
            );
            //***************************************************
            //  Edit Car Model
            config.Routes.MapHttpRoute(
            name: "editcarmodel",
            routeTemplate: "api/CarModel/admin/edit",
            defaults: new
            {
                controller = "CarModel",
                action = "Put"
            }
            );

            //**************************************************
            //  Delete Car Model
            config.Routes.MapHttpRoute(
            name: "deletecarmodel",
            routeTemplate: "api/CarModel/admin/delete/{carmodelID}",
            defaults: new
            {
                controller = "CarModel",
                action = "Delete"
            }
            );
            //**************************************************
            //  Get Car Model
            config.Routes.MapHttpRoute(
            name: "GetCarModel",
            routeTemplate: "api/carmodel/admin/get/{carmodelID}",
            defaults: new
                {
            controller = "CarModel",
            action = "GetCarModel"
                }
            );
            //**************************************************
            //  Add Car Model
            config.Routes.MapHttpRoute(
            name: "addcarmodel",
            routeTemplate: "api/CarModel/admin/add/",
            defaults: new
            {
                controller = "CarModel",
                action = "Post"
            }
            );



            #endregion

            #region Orders

            // *****************************************************************************************************************************************
            // Get All Orders
            config.Routes.MapHttpRoute(
             name: "getallorders",
             routeTemplate: "api/orders/admin/allorders",
             defaults: new
             {
                 controller = "Orders",
                 action = "GetAllOrders"
             }
              );
            // *****************************************************************************************************************************************
            // Delete Order
            config.Routes.MapHttpRoute(
            name: "deleteorder",
            routeTemplate: "api/orders/admin/delete/{orderid}",
            defaults: new
            {
            controller = "Orders",
            action = "Delete"
            }
            );

            // *****************************************************************************************************************************************
            // POST order
            config.Routes.MapHttpRoute(
            name: "addorder",
            routeTemplate: "api/orders/admin/add/",
            defaults: new
            {
            controller = "Orders",
            action = "Post"
            }
            );

            // *****************************************************************************************************************************************
            // Get Order 
            config.Routes.MapHttpRoute(
            name: "getorder",
            routeTemplate: "api/orders/admin/get/{orderid}",
            defaults: new
            {
            controller = "Orders",
            action = "Get"
            }
            );

            // *****************************************************************************************************************************************
            // Edit Order 
            config.Routes.MapHttpRoute(
            name: "editorder",
            routeTemplate: "api/orders/admin/edit/",
            defaults: new
            {
            controller = "Orders",
            action = "Put"
            }
            );


            #endregion

            #region UsersContoller

            // *****************************************************************************************************************************************
            // Get All Users In DB
            config.Routes.MapHttpRoute(
               name: "getallusersadmin",
               routeTemplate: "api/users/admin/allusers",
               defaults: new
               {
                   controller = "Users",
                   action = "GetAllUsers"
               }
                );

            // *****************************************************************************************************************************************
            // Add User
            config.Routes.MapHttpRoute(
             name: "adduseradmin",
             routeTemplate: "api/users/admin/add/",
             defaults: new
             {
                 controller = "Users",
                 action = "Post"
             }
              );
            // *****************************************************************************************************************************************
            // Delete user

            config.Routes.MapHttpRoute(
            name: "deleteuser",
            routeTemplate: "api/user/deleteuser/{userid}",
            defaults: new
            {
                controller = "Users",
                action = "Delete"
            }
             );

            // *****************************************************************************************************************************************
            // Get User
            config.Routes.MapHttpRoute(
            name: "getUser",
            routeTemplate: "api/{controller}/getuser/{UserID}",
            defaults: new
            {
                controller = "Users",
                action = "GetUser",
                
            }
        );

            // *****************************************************************************************************************************************
            //Edit User
            config.Routes.MapHttpRoute(
           name: "editUser",
           routeTemplate: "api/users/admin/edit",
           defaults: new
           {
               controller = "Users",
               action = "EditUser"
               
           }
       );

            #endregion

            #endregion


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
