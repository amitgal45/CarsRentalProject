using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CarsApp.Models
{
    [MetadataType(typeof(orderHelper))]
    public partial class OrdersTable
    {
    }

        public class orderHelper
    {
        public int OrderID { get; set; }
        [Required(ErrorMessage = "Order ID Number is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Order ID can be only number")]
        public int UserID { get; set; }
        [Required(ErrorMessage = "Car License Number is required"), RegularExpression("^[0-9]*$", ErrorMessage = "Car License Number")]
        public int CarLicenseNumber { get; set; }
        [Required(ErrorMessage = "Start Date is required"), RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "Date Isnt Valid")]
        public string StartDate { get; set; }
        [Required(ErrorMessage = "Estimated Date is required"), RegularExpression(@"^\d{4}-\d{2}-\d{2}$", ErrorMessage = "Date Isnt Valid")]
        public string EstimatedReturnDate { get; set; }
        
        public string ReturnDate { get; set; }
    }
}