using DubaiVisa.Models.Domain.Enums;

namespace DubaiVisa.Models.View
{
    public class ViewVisaPlan
    {
        internal Guid id;

        public VisaType VisaType { get; set; }
        public string StayDuration { get; set; }
        public decimal UsdPrice { get; set; }
        public decimal AedPrice { get; set; }
        public string UsdDescription { get; set; }
        public string AedDescription { get; set; }
    }
}
