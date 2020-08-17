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
    public class UsersController : ApiController
    {
        // **********************************************************************************************************************************************   
        // GET: api/users/getallusers
        // function that return all the UserTable parameters
        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                return Ok(db.UsersTable.ToList());
            }
        }

        // **********************************************************************************************************************************************
        // GET : login/{username}/{password}
        // Function that get 2 parameters username and password and checks if there is username and password that match any user
        // if true it returns the user that found 
        // else return bad request
        [HttpGet]
        public IHttpActionResult GetUserLogin(string username, string password)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentUser = db.UsersTable.FirstOrDefault(user => (user.UserName == username) && (user.Password == password));
                if (currentUser != null)
                {
                    return Ok(currentUser);
                }
                return BadRequest();
            
            }
        }

        // **********************************************************************************************************************************************
        // GET : api/users/getuser/{UserID}
        // function that get 1 parameter - user id and searching for the user that match to this UserID value in UsersTable
        // if the user has found it return ok and the user
        // else returns badrequest
        [HttpGet]
        public IHttpActionResult GetUser(int UserID)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {

                var currentUser = db.UsersTable.FirstOrDefault(u => UserID == u.UserID);

                if (currentUser != null)
                {
                    return Ok(currentUser);
                }
                return BadRequest("Couldnt find the current user");
            }
        }
        // **********************************************************************************************************************************************
        // POST: api/cars/admin/add/ -- using for register component and admin adduser component
        // function that get 1 parameter - user from usersTable type checking if there is any user match to his passportid and Username
        // if true return bad request
        // else add the user to the table and return ok
        [Validate]
        public IHttpActionResult Post([FromBody]UsersTable user)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentUser = db.UsersTable.FirstOrDefault(userVal => user.PassportID == userVal.PassportID||user.UserName == userVal.UserName);
                if (currentUser == null)
                {
                    db.UsersTable.Add(user);
                    db.SaveChanges();
                    return Ok("The User With The Passport Number " + user.PassportID + " added to the table");
                }
                else
                {
                    return BadRequest("The User With The Passport Number " + user.PassportID + " cannot added to the table");
                }
            }
        }
        // **********************************************************************************************************************************************
        // PUT: api/users/admin/edit -- using at admin and edit user components
        // function that get one parameter from UserTable type checks if this UserID is match in the UsersTable 
        // if true it edits the current user save changes and return ok
        // else return bad request
        [Validate]
        [HttpPut]
        public HttpResponseMessage EditUser([FromBody]UsersTable user)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var currentUser = db.UsersTable.Find(user.UserID);
                if (currentUser != null)
                {
                    currentUser.FullName = user.FullName;
                    currentUser.PassportID = user.PassportID;
                    currentUser.MemberLevel = user.MemberLevel;
                    currentUser.Image = user.Image;
                    currentUser.Gender = user.Gender;
                    currentUser.BirthDate = user.BirthDate;
                    currentUser.Email = user.Email;
                    currentUser.UserName = user.UserName;       
                    db.SaveChanges();
                    return Request.CreateResponse<UsersTable>(HttpStatusCode.OK, currentUser);

                }
                else
                {
                    return Request.CreateResponse<string>(HttpStatusCode.BadRequest, "Count find that current user");
                }



            }
        }
        // **********************************************************************************************************************************************
        // DELETE: api/user/deleteuser/{userid}
        // function that get 1 parameter, userid and search for match with object from userTable
        // if true it deletes the current user and return ok
        // else return bad request
        [Validate]
        [HttpDelete]
        public IHttpActionResult Delete(int userid)
        {
            using (CarsDBEntities db = new CarsDBEntities())
            {
                var CurrentUser = db.UsersTable.FirstOrDefault(tmpuser => tmpuser.UserID == userid);
                if (CurrentUser != null)
                {
                    db.UsersTable.Remove(CurrentUser);
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
