using DubaiVisa.Data;
using DubaiVisa.Models.Auth;
using DubaiVisa.Models.Domain;
using DubaiVisa.Models.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DubaiVisa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddOnController : Controller
    {
        private readonly AppDBContext appDBContext;

        public AddOnController(AppDBContext appDBContext)
        {
            this.appDBContext = appDBContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<AddOn> allRecords = appDBContext.AddOns.Where(a=> a.IsActive).ToList();
            return Ok(allRecords);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("pagination")]
        public IActionResult paginationCountry(int page = 1, int pageSize = 10)
        {
            int totalItems = appDBContext.AddOns.Count();
            List<AddOn> allRecords = appDBContext.AddOns.Skip((page - 1) * pageSize)
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
        [HttpPost("add-addon")]
        public async Task<IActionResult> AddVisaPlan(ViewAddOn viewAddOn)
        {
            Console.WriteLine("in function");
            var addOn = new AddOn
            {
                Id = Guid.NewGuid(),
                Title = viewAddOn.Title,
                UsdPrice = viewAddOn.UsdPrice,
                AedPrice = viewAddOn.AedPrice,
                UsdDescription = viewAddOn.UsdDescription,
                AedDescription = viewAddOn.AedDescription,
                IsActive = viewAddOn.IsActive,
            };
            await appDBContext.AddOns.AddAsync(addOn);
            await appDBContext.SaveChangesAsync();
            //return View();
            return Ok(addOn);
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("update-addon")]
        public IActionResult Putdata(AddOn addOn)
        {
            Console.WriteLine("infunction");
            appDBContext.AddOns.Update(addOn);
            appDBContext.SaveChanges();

            return Ok(addOn);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("delete-addon")]
        public IActionResult DelAddOn(Guid Id)
        {
            var addOn = appDBContext.AddOns.Find(Id);
            Console.WriteLine(addOn);

            if (addOn == null)
            {
                return NotFound(); // Return 404 if the record with the specified ID is not found
            }

            appDBContext.AddOns.Remove(addOn);
            appDBContext.SaveChanges();

            return NoContent();
        }
    }
}
