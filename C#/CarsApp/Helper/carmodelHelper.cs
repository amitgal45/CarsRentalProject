using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarsApp.Models
{
    [MetadataType(typeof(carmodelHelper))]
    partial class CarModelTable
    {

    }
    public class carmodelHelper
    {
       
        public int carmodelID { get; set; }

        [Required(ErrorMessage = "Manufacturer is required"), RegularExpression("^[A-Za-z]*$", ErrorMessage = "Model can only contain letters ")]
        public string manufacturer { get; set; }
        
        [Required(ErrorMessage = "Model is required"), RegularExpression("^[A-Za-z0-9]*$", ErrorMessage = "Model can only contain letters and numbers ")]

        public string model { get; set; }
        [Required(ErrorMessage = "Daily price is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Daily price can be only number")]
        public double dailyPrice { get; set; }
        [Required(ErrorMessage = "daily Late Fee is required"), RegularExpression("^[0-9]*$", ErrorMessage = "daily Late Fee can be only number")]
        public double dailyLateFee { get; set; }
        [Required(ErrorMessage = "Year is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Year can be only number")]
        public string year { get; set; }
        [Required(ErrorMessage = "Gearbox is required"), RegularExpression(@"^auto$|^manual$", ErrorMessage = "Gearbox Isnt Valid")]
        public string gearbox { get; set; }
    }
}