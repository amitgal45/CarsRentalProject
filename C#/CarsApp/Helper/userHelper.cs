using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarsApp.Models
{
    [MetadataType(typeof(userHelper))]
    public partial class UsersTable
    {

    }
    public class userHelper
    {
        //[Required(ErrorMessage = "User ID Number is required"), RegularExpression("^[0-9]*$", ErrorMessage = "User ID can be only number")]
        public int UserID { get; set; }
        [Required(ErrorMessage = "Full Name is required"), RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Full Name Can only contain Letters")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "Passport ID Number is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Passport ID can be only number")]

        public Nullable<int> PassportID { get; set; }

        [Required(ErrorMessage = "Username is required"), RegularExpression(@"^(?=.{3,15}$)([A-Za-z0-9][._()\[\]-]?)*$", ErrorMessage = "Username Isnt Valid")]
        public string UserName { get; set; }

        
        public string BirthDate { get; set; }

        [Required(ErrorMessage = "Gender is required"), RegularExpression(@"^male$|^female$", ErrorMessage = "Gender Isnt Valid")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "Email is required"), RegularExpression(@"^\w+@\w+.(com|co.[a-zA-Z]{2})$", ErrorMessage = "Email Adress Isnt Valid")]
         public string Email { get; set; }
        public string Image { get; set; }
        [Required(ErrorMessage = "Member Level is required"), RegularExpression(@"^[0-2]$", ErrorMessage = "Member Level Isnt Valid")]
        public int MemberLevel { get; set; }
        [Required]
        public string Password { get; set; }
    }
}