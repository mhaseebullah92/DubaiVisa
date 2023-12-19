using DubaiVisa.Models.Domain.Enums;

namespace DubaiVisa.Models.Domain
{
    public class VisaPlan
    {
        public Guid Id { get; set; }
        public VisaType VisaType { get; set; }
        public string StayDuration { get; set; }
        public decimal UsdPrice { get; set; }
        public decimal AedPrice { get; set; }
        public string UsdDescription { get; set; }
        public string AedDescription { get; set; }
        public int Index { get; set; } = 0;
        public Boolean IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
