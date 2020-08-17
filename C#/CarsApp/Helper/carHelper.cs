using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarsApp.Models
{

    [MetadataType(typeof(carHelper))]
    public partial class CarsTable
    {

    }
    public class carHelper { 
        [Required(ErrorMessage = "Car License Number is required"),RegularExpression("^[0-9]*$",ErrorMessage = "Car License Number can be only number")]
        public int CarLicenseNumber { get; set; }

        [Required(ErrorMessage = "Current Km is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Current Km can be only number")]
        public int currentKm { get; set; }
        [Required]
        public string Image { get; set; }
        [Required(ErrorMessage = "is Rentable is required")]
        public bool isRentable { get; set; }
        [Required(ErrorMessage = "is Rentable is required")]
        public bool isDamaged { get; set; }
        [Required(ErrorMessage = "Car Model ID is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Car License Number can be only number")]
        public int carmodelID { get; set; }
        [Required(ErrorMessage = "Car Model ID is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Car License Number can be only number")]
        public int BranchId { get; set; }
        
        public int CarID { get; set; }

    }


}