using DubaiVisa.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DubaiVisa.Data
{
    public class AppDBContext : IdentityDbContext<IdentityUser>
    {
        public AppDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }

        public DbSet<VisaPlan> VisaPlans { get; set; }

        public DbSet<AddOn> AddOns { get; set; }

        public DbSet<UserApplication> UserApplications { get; set; }

    }
}
