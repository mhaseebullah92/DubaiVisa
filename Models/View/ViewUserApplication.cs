using DubaiVisa.Models.Domain;
using DubaiVisa.Models.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DubaiVisa.Models.View
{
    public class ViewUserApplication
    {

        [FromForm(Name = "PassportPicture")]
        public IFormFile PassportPicture { get; set; }
        [FromForm(Name = "ProfilePicture")]
        public IFormFile ProfilePicture { get; set; }
        [FromForm(Name = "IdPicture")]
        public IFormFile IdPicture { get; set; }
        
        internal string PassportPictureUrl { get; set; }
        internal string ProfilePictureUrl { get; set; }
        internal string IdPictureUrl { get; set; }
        [FromForm(Name = "Number")]
        public long Number { get; set; }
        [FromForm(Name = "Email")]
        public string Email { get; set; }
        [FromForm(Name = "FirstName")]
        public string FirstName { get; set; }
        [FromForm(Name = "LastName")]
        public string LastName { get; set; }
        [FromForm(Name = "Nationality")]
        public string Nationality { get; set; }
        [FromForm(Name = "Destination")]
        public string Destination { get; set; }
        public string PassportNumber { get; set; }
        public string Profession { get; set; }
        public DateTime TravelDate { get; set; }
        public string Purpose { get; set; }
        public bool VisitedBefore { get; set; }
        public Guid VisaPlanId { get; set; }
        [FromForm(Name = "AddOnIds")]
        public List<Guid>? AddOnIds { get; set; } = new List<Guid>();
        public ApplicationStatus ApplicationStatus { get; set; }
        public string ?TransactionId { get; set; }
        public string applicationComments { get; set; } = "";


        //public ViewUserApplication()
        //{
        //  AddOnIds = new List<Guid>();
        //}
    }


    public class UpdateUserApplication
    {
        public Guid Id { get; set; }
        public ApplicationStatus ApplicationStatus { get; set; }
        public string applicationComments { get; set; } = "";
    }
    public class UpdateTransactionUserApplication
    {

        [JsonProperty("Id")]
        public Guid Id { get; set; }

        [JsonProperty("TransactionId")]
        public string TransactionId { get; set; }
    }
    public class PendingApplication
    {

        [JsonProperty("Id")]
        public Guid Id { get; set; }
    }
}
