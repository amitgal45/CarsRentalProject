using CarsApp.Filter;
using CarsApp.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarsApp.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class CarModelController : ApiController
    {

        // ****************************************************************************************
        // function that all the data in carsmodel table -- admin using

        [HttpGet]
        public IHttpActionResult GetAllCarModels()
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {

                return Ok(db.CarModelTable.ToList());
            }
        }
        // ****************************************************************************************
        // get: api/carmodel/admin/get/{carmodelID} -- admin using
        //function that get one parameter CarModelId and return the car model with the same value
        [HttpGet]
        public IHttpActionResult GetCarModel(int carmodelID)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {

                var CarModel = db.CarModelTable.FirstOrDefault(car => carmodelID == car.carmodelID);
                return Ok(CarModel);
            }
        }




        // ****************************************************************************************
        // POST: api/CarModel/admin/add/ -- admin using
        // the function get an objects from carmodeltable type check if there is similar car
        //(if the values of manufacturer,model,year,and gearbox has found in the same object so it alerts for multiple object and alerts for failure)
        // if the object hadnt found so it adds the carmodel to the CarModelTable
        [Validate]
        [HttpPost]
        public IHttpActionResult Post([FromBody]CarModelTable carmodel)
        {
        using (CarsDBEntities db = new CarsDBEntities())
        {
            var currentCarModel = db.CarModelTable.FirstOrDefault(carmodelVal =>
            (carmodel.manufacturer == carmodelVal.manufacturer) && (carmodel.model == carmodelVal.model)&&(carmodel.year == carmodelVal.year)&& (carmodel.gearbox == carmodelVal.gearbox));
            if (currentCarModel == null)
            {
                db.CarModelTable.Add(carmodel);
                db.SaveChanges();
                return Ok("The Car Model " + carmodel.manufacturer + " " + carmodel.model + " added to the table");
            }
            else
            {
                return BadRequest("The Car Model " + carmodel.manufacturer + " " + carmodel.model + " cannot added to the table");
            }
            }
        }
        // ****************************************************************************************
        // PUT: api/CarModel/admin/edit -- admin using
        //function that get 1 parameter from carmodel type checks if this carmodel is exitsts by searching for the same carmodelID
        //if this carmodel found it edits the parameter and return success
        //else this carmodel returns badrequest
        [HttpPut]
        [Validate]
        public IHttpActionResult Put([FromBody]CarModelTable carmodel)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCarModel = db.CarModelTable.FirstOrDefault(carmodelVal => carmodel.carmodelID == carmodelVal.carmodelID);
                if (currentCarModel != null)
                {
                    currentCarModel.dailyLateFee = carmodel.dailyLateFee;
                    currentCarModel.dailyPrice = carmodel.dailyPrice;
                    currentCarModel.gearbox = carmodel.gearbox;
                    currentCarModel.manufacturer = carmodel.manufacturer;
                    currentCarModel.model = carmodel.model;
                    currentCarModel.year = carmodel.year;
                        
                    db.SaveChanges();
                    return Ok("The Car Model " + carmodel.carmodelID +  " has been edited");
                }
                else
                {
                    return BadRequest("Cannot find the Car Model With the Id" + carmodel.carmodelID );
                }
            }
        }
        // **********************************************************************************************************************************************
        // DELETE: api/CarModel/admin/delete/{carmodelID} -- admin using
        // function who get one parameter carmodelID, checks if the carmodelid exists and if it exists it deletes it from the table and return success
        //else returns bad requests
        [HttpDelete]
        [Validate]
        public IHttpActionResult Delete(int carmodelID)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentCarModel = db.CarModelTable.FirstOrDefault(carmodelVal => carmodelID == carmodelVal.carmodelID);
                if (currentCarModel != null)
                {
                    db.CarModelTable.Remove(currentCarModel);
                    db.SaveChanges();
                    return Ok("Deleted");

                }
                else
                {
                    return BadRequest();
                }
            }

        }
    }
}
