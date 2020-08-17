using CarsApp.Filter;
using CarsApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarsApp.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class OrdersController : ApiController

    {
        // **********************************************************************************************************************************************
        // GET: api/orders/admin/allorders -- admin using
        // function that returns all the OrdersTable
        public IHttpActionResult GetAllOrders()
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                return Ok(db.OrdersTable.ToList());
            }
        }
        // ****************************************************************************************************************************************
        // PUT : api/cars/rentcar/edit
        // function that get one parameter of order from OrdersTable type
        // if the car license number from the order is exists at the carstable
        // that carIsRentable value will be changing to false and the order will add to the OrdersTable
        // else return bad request
        [Validate]
        [HttpPut]
        public HttpResponseMessage OrderStart([FromBody]OrdersTable order)
        {

            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCar = db.CarsTable.FirstOrDefault(tmpcar => tmpcar.CarLicenseNumber == order.CarLicenseNumber);
                if (currentCar != null)
                {
                    currentCar.isRentable = false;
                    db.OrdersTable.Add(order);
                    db.SaveChanges();
                    return Request.CreateResponse<CarsTable>(HttpStatusCode.OK, currentCar);

                }
                else
                {
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Count find that current car");
                }



            }
        }

        // *********************************************************************************************************************************************w
        // GET: api/orders/returncar/{carLicenseNumber}
        // function that returns the latests order that active of the car with the carLicenseNumber 
        // by merging 3 tables OrdersTable, CarsTable And CarModelTable
        // when customer makes an order, the order is adding to the table and the end date is null if the order is value is null it means that the order is 
        // still active
        // this function helped me to show the employee the amount of money the customer needs to pay by merging carmodeltable
        // and get the car image and license number to help the employee to see if the car matches the order by merging carstable
        public IHttpActionResult GetCarOrder(int carLicenseNumber)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var innerJoinQuery =
                                    from order in db.OrdersTable
                                    join cars in db.CarsTable on order.CarLicenseNumber equals cars.CarLicenseNumber
                                    join model in db.CarModelTable on cars.carmodelID equals model.carmodelID
                                    where order.CarLicenseNumber == carLicenseNumber && order.ReturnDate == null
                                    select new
                                    {
                                        order.OrderID,
                                        order.EstimatedReturnDate,
                                        order.ReturnDate,
                                        order.StartDate,
                                        order.UserID,
                                        cars.Image,
                                        cars.CarLicenseNumber,
                                        model.dailyPrice,
                                        model.dailyLateFee
                                    };
             
                   return Ok(innerJoinQuery.FirstOrDefault());
            }
        }

        // **********************************************************************************************************************************************
        // GET: api/orders/admin/get/{orderid} -- admin using
        // function that get one parameter (orderid), and search for the first object in OrderTable with this primary key
        // if it founds it returns ok and the objects that found
        // else return bad request
        public IHttpActionResult Get(int orderid)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentOrder = db.OrdersTable.Find(orderid);
                if(currentOrder != null)
                {
                    return Ok(currentOrder);
                }
                else
                {
                    return BadRequest("cannot find the order with the order id #"+ orderid);
                }

                
            }
        }

        // ********************************************************************************************************************************************
        // GET: api/orders/user/{userid} -- user using
        // function that get one parameter - user id and returns all the orders in OrderTable with this user id
        public IHttpActionResult GetAllUserOrders(int userid)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var innerJoinQuery =
                    from order in db.OrdersTable
                     join cars in db.CarsTable on order.CarLicenseNumber equals cars.CarLicenseNumber
                     where order.UserID == userid
                     select order;
                return Ok(innerJoinQuery.ToList());
            }
        }




        // **********************************************************************************************************************************************
        // Edit: api/cars/employee/{CarLicenseNumber}/{OrderID}
        // the function gets 2 parameters and edit 2 tables, finish the Order with the same id by editing the ReturnDate and Carlicensenumber to edit the
        // car with the same carlicensenumber to back being rentable again
        [HttpPut]
        public HttpResponseMessage OrderFinish(int CarLicenseNumber, int OrderID)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCar = db.CarsTable.FirstOrDefault(tmpcar => tmpcar.CarLicenseNumber == CarLicenseNumber);
                if (currentCar != null)
                {
                    currentCar.isRentable = true;
                    var currentOrder = db.OrdersTable.FirstOrDefault(tmporder => tmporder.OrderID == OrderID);
                    if (currentOrder != null)
                    {
                        currentOrder.ReturnDate = DateTime.Now.ToString("yyyy-MM-dd");

                    }
                    db.SaveChanges();
                    return Request.CreateResponse<CarsTable>(HttpStatusCode.OK, currentCar);

                }
                else
                {
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Count find that current car");
                }



            }
        }


        // ******************************************************************************************************************************************** 
        // POST: api/orders/admin/add/
        // function that get 1 parameter from OrdersTable type and adds it to the table 
        [Validate]
        public IHttpActionResult Post([FromBody]OrdersTable order)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {

                db.OrdersTable.Add(order);
                db.SaveChanges();
                return Ok("the order has been added");


            }
        }

        // ********************************************************************************************************************************************
        // PUT: api/orders/admin/edit/
        // function that get one parameter from orderstable type seach if this id is already exists
        // if true it changes the property value to the ordertable type object
        // and return ok and the current user
        // else return bad request
        [Validate]
        public HttpResponseMessage Put([FromBody]OrdersTable value)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentOrder = db.OrdersTable.FirstOrDefault(o => o.OrderID == value.OrderID);
                if(currentOrder != null)
                {
                    currentOrder.CarLicenseNumber = value.CarLicenseNumber;
                    currentOrder.EstimatedReturnDate = value.EstimatedReturnDate;
                    currentOrder.OrderID = value.OrderID;
                    currentOrder.ReturnDate = value.ReturnDate;
                    currentOrder.StartDate = value.StartDate;
                    currentOrder.UserID = value.UserID;
                    db.SaveChanges();
                    return Request.CreateResponse<OrdersTable>(HttpStatusCode.OK, currentOrder);
                }
                else
                {
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Couldnt find the current order");
                }
            }
        }

        // ******************************************************************************************************************************************** 
        // DELETE: api/orders/admin/delete/{orderid}
        // function that get one parameter - orderid searching if there is object with the same orderid
        // if true it deletes this object from the table and return success
        // else return bad request
        [Validate]
        public IHttpActionResult Delete(int orderid)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentOrder = db.OrdersTable.FirstOrDefault(o => o.OrderID == orderid);
                if(currentOrder != null)
                {
                    db.OrdersTable.Remove(currentOrder);
                    db.SaveChanges();
                    return Ok("the order #" + orderid + " has been removed");

                }
                return BadRequest("couldnt find the order #" + orderid);


            }
        }
    }
}
