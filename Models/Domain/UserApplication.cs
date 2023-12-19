using DubaiVisa.Models.Domain.Enums;

namespace DubaiVisa.Models.Domain
{
    public class UserApplication
    {
        public Guid Id { get; set; }
        public string PassportPicture { get; set; }
        public string ProfilePicture { get; set; }
        public string IdPicture { get; set; }
        public long Number { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nationality { get; set; }
        public string Destination { get; set; }
        public string PassportNumber { get; set; }
        public string Profession { get; set; }
        public DateTime TravelDate { get; set; }
        public string Purpose { get; set; }
        public bool VisitedBefore { get; set; }
        public Guid VisaPlanId { get; set; }
        public VisaPlan VisaPlan { get; set; }
        public List<Guid> AddOnIds { get; set; } // Assuming an application can have multiple add-ons
        public List<AddOn> AddOns { get; set; } // Assuming an application can have multiple add-ons
        public ApplicationStatus ApplicationStatus { get; set; }
        public string TransactionId { get; set; }
        public string applicationComments { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
