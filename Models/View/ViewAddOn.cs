namespace DubaiVisa.Models.View
{
    public class ViewAddOn
    {
        public string Title { get; set; }
        public decimal UsdPrice { get; set; }
        public decimal AedPrice { get; set; }
        public string UsdDescription { get; set; }
        public string AedDescription { get; set; }
        public int Index { get; set; } = 0;
        public Boolean IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
