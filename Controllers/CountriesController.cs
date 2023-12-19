using DubaiVisa.Data;
using DubaiVisa.Models.Auth;
using DubaiVisa.Models.Domain;
using DubaiVisa.Models.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DubaiVisa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : Controller
    {
        private readonly AppDBContext appDBContext;

        public CountriesController(AppDBContext appDBContext)
        {
            this.appDBContext = appDBContext;
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("allcountry")]
        public IActionResult Index()
        {
            List<Country> allRecords = appDBContext.Countries.ToList();
            return Ok(allRecords);
        }
        [HttpGet("all-active-countryname")]
        public IActionResult getCoutryForUsers()
        {
            List<string> allRecords = appDBContext.Countries.Where(c=>c.Active==true).Select(c => c.Name).ToList();
            return Ok(allRecords);
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("country-pagination")]
        public IActionResult paginationCountry(int page = 1, int pageSize = 10)
        {
            int totalItems = appDBContext.Countries.Count();
            List<Country> allRecords = appDBContext.Countries.Skip((page - 1) * pageSize)
                                 .Take(pageSize).ToList();
            return Ok(new
            {
                TotalItems = totalItems,
                PageSize = pageSize,
                Page = page,
                Data = allRecords
            });
        }
        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("add-county")]
        public async Task<IActionResult> CountryAddingUpdating(ViewCountry viewCountry)
        {
            if (viewCountry.Id == null)
            {
                var data= new Country()
                {
                    Id = Guid.NewGuid(),
                    Name=viewCountry.Name,
                    Active=viewCountry.Active,
                };
                await appDBContext.Countries.AddAsync(data);
                await appDBContext.SaveChangesAsync();

                return Ok(data);
            }
            else
            {

                var ccid = viewCountry.Id ?? Guid.NewGuid();
                var country = new Country()
                {
                    Id = ccid,
                    Name = viewCountry.Name,
                    Active = viewCountry.Active
                };
                appDBContext.Countries.Update(country);
                appDBContext.SaveChanges();
                //return View();
                return Ok(country);
            }
        }

        
    }
}
