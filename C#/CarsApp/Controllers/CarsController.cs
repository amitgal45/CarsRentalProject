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
        public class CarsController : ApiController
        {

        // GET: api/cars/getavaliablecars
        //Function who get all the cars that avaliable for rent and not damaged and returns a list of Object who contains values from 3 tables
        // CarModelTable,CarsTable,BranchTable.
        //Im using this function in CarSearchComponent to get all the car that avaliable to rent.
        [HttpGet]
        public IHttpActionResult GetAllAvaliableCars()
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var innerJoinQuery =
                 from carmodel in db.CarModelTable
                 join cars in db.CarsTable on carmodel.carmodelID equals cars.carmodelID
                 where cars.isRentable == true && cars.isDamaged == false
                 join branch in db.BranchTable on cars.BranchId equals branch.BranchId
                 orderby carmodel.manufacturer
                 select new
                 {
                     carmodel.carmodelID,
                     carmodel.dailyLateFee,
                     carmodel.dailyPrice,
                     carmodel.gearbox,
                     carmodel.manufacturer,
                     carmodel.model,
                     carmodel.year,
                     cars.Image,
                     cars.CarLicenseNumber,
                     cars.CarID,
                     branch.BranchName
                 };
                return Ok(innerJoinQuery.ToList());
            }
        }

        // ***************************************************************************************************************************************
        // GET : api/cars/cardetails/{carid}
        // function that get 1 parameter car id and returns the first car with this carid including information from carmodeltable and branchtable
        // i used this function for rent calculation to bring all the information the employee/customer is needed,
        // i used it twice, at the employee rent calculate before return the car, and in the customer rent calculation
        // it includes Information about the model from CarModelTable, carlicense number, carid and car image from cars table and branch name
        public IHttpActionResult GetAvaliableCar(int carid)
             {
            using (CarsDBEntities db = new CarsDBEntities())
            {

                var innerJoinQuery =
                                    (from carmodel in db.CarModelTable
                                     join cars in db.CarsTable on carmodel.carmodelID equals cars.carmodelID
                                     where cars.CarID == carid && cars.isRentable == true
                                     join branchs in db.BranchTable on cars.BranchId equals branchs.BranchId

                                     select new
                                     {
                                         carmodel.carmodelID,
                                         carmodel.dailyLateFee,
                                         carmodel.dailyPrice,
                                         carmodel.gearbox,
                                         carmodel.manufacturer,
                                         carmodel.model,
                                         carmodel.year,
                                         cars.Image,
                                         cars.CarLicenseNumber,
                                         cars.CarID,
                                         branchs.BranchName,

                                     })
                                    ;

                //produces flat sequence
                return Ok(innerJoinQuery.FirstOrDefault());
            }
        }


        //
        // GET: api/cars/admin/get
        // function that return all the cars in CarsTable
        [HttpGet]
        public IHttpActionResult GetAllCars()
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                return Ok(db.CarsTable.ToList());
            }
        }

        // *******************************************************************************************************************************************
        // GET: api/cars/admin/get/{carlicenseid} -- admin using
        // function that gets one parameter carlicenseid and searching for the object in the CarsTable
        // if true it returns ok and the car object 
        // else return badrequest 
        public IHttpActionResult GetCar(int carlicenseid)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var car = db.CarsTable.FirstOrDefault(u => carlicenseid == u.CarLicenseNumber);
                if (car != null) {
                    return Ok(car);
                }
                return BadRequest("Couldnt find the current car");
            }
        }


        // *******************************************************************************************************************************************
        // POST: api/cars/admin/add/ -- admin using
        // function that get 1 parameter from CarsTable type 
        // looking if this carLicenseNumber is already exists 
        // if null and carlicense number != from 0 it adds it to the table and return success
        // else returns badrequest
        [Validate]
        public IHttpActionResult Post([FromBody]CarsTable car)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCar = db.CarsTable.FirstOrDefault(c => c.CarLicenseNumber == car.CarLicenseNumber);
                if (currentCar == null && car.CarLicenseNumber!=0)
                {
                    db.CarsTable.Add(car);
                    db.SaveChanges();
                    return Ok("The Car Number " + car.CarLicenseNumber + " added to the table");
                }
                    return BadRequest("Cannot Add This Car The Car Id Number" + car.CarLicenseNumber + "is already exists");
            }
        }

        // *********************************************************************************************************************************************
        // PUT: api/Cars/5
        // Function that edits values in CarsTable by getting 1 parameter from CarsTable type
        // if this car.CarLicenseNumber is found to check the values are true and edits the currentcar values and return success
        // else return bad request
        [Validate]
        public HttpResponseMessage Put([FromBody]CarsTable car)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCar = db.CarsTable.FirstOrDefault(tmpcar => tmpcar.CarLicenseNumber == car.CarLicenseNumber);
                if (currentCar != null)
                {

                    currentCar.carmodelID = car.carmodelID;
                    currentCar.CarLicenseNumber = car.CarLicenseNumber;
                    currentCar.currentKm = car.currentKm;
                    currentCar.Image = car.Image;
                    currentCar.isDamaged = car.isDamaged;
                    currentCar.isRentable = car.isRentable;
                    db.SaveChanges();
                    return Request.CreateResponse<CarsTable>(HttpStatusCode.OK, currentCar);

                }
                else
                {
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Count find that current car");
                }
            }
        }


        // *******************************************************************************************************************************
        // DELETE: api/cars/admin/delete/{caridnumber}
        // function that get caridnumber and delete the car that found
        // if the car with the same car carID number has found the car will be removed and return success, else itll return badrequest
        [Validate]
        public IHttpActionResult Delete(int caridnumber)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var CurrentCar = db.CarsTable.FirstOrDefault(tmpcar => tmpcar.CarID == caridnumber);
                if (CurrentCar != null)
                {
                    db.CarsTable.Remove(CurrentCar);
                    db.SaveChanges();
                    return Ok("The User Has Been Removed");
                }
                else
                {
                    return BadRequest("Cannot Find The Current Car");
                }

            }
        }

    }
    }
