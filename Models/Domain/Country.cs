namespace DubaiVisa.Models.Domain
{
    public class Country
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Boolean Active { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
