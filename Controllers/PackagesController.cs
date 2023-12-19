using DubaiVisa.Data;
using DubaiVisa.Models.Auth;
using DubaiVisa.Models.Domain;
using DubaiVisa.Models.Domain.Enums;
using DubaiVisa.Models.View;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DubaiVisa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : Controller
    {

        private readonly AppDBContext appDBContext;

        public PackagesController(AppDBContext appDBContext)
        {
            this.appDBContext = appDBContext;
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public IActionResult Index()
        {
            List<VisaPlan> allRecords= appDBContext.VisaPlans.ToList();
            return Ok(allRecords);
        }
        [HttpGet("seprate-plans")]
        public async Task<IActionResult> SapratePlans()
        {
            List<VisaPlan> allSingleRecords= await appDBContext.VisaPlans.Where(v => v.IsActive).Where(v => v.VisaType == VisaType.Single).ToListAsync();
            List<VisaPlan> allMultipleRecords= await appDBContext.VisaPlans.Where(v => v.IsActive).Where(v => v.VisaType == VisaType.Multiple).ToListAsync();
            return Ok(new
            {
                singleRecords=allSingleRecords,
                multipleRecords=allMultipleRecords
            });
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("paginated")]
        public IActionResult paginatedPackages(int page = 1, int pageSize = 10,VisaType visaTypeFilter=VisaType.Single)
        {

            int totalItems = appDBContext.VisaPlans.Where(v=>v.VisaType==visaTypeFilter).Count();
            List<VisaPlan> allRecords = appDBContext.VisaPlans.Where(v=>v.VisaType==visaTypeFilter).Skip((page - 1) * pageSize)
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
        [HttpPost("add-package")]
        public async Task<IActionResult> AddVisaPlan(ViewVisaPlan viewVisaPlan)
        {
            Console.WriteLine("in function");
            var visaPlan = new VisaPlan
            {
                Id=Guid.NewGuid(),
                VisaType= viewVisaPlan.VisaType,
                StayDuration=viewVisaPlan.StayDuration,
                UsdPrice= viewVisaPlan.UsdPrice,
                AedPrice= viewVisaPlan.AedPrice,
                UsdDescription= viewVisaPlan.UsdDescription,
                AedDescription= viewVisaPlan.AedDescription,
            };
            await appDBContext.VisaPlans.AddAsync(visaPlan);
            await appDBContext.SaveChangesAsync();
            //return View();
            return Ok(visaPlan);
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("update-package")]
        public IActionResult Put(VisaPlan visaPlan)
        {
            appDBContext.VisaPlans.Update(visaPlan);
            appDBContext.SaveChanges();

            return Ok(visaPlan);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("delete-package")]
        public IActionResult DelPackage(Guid Id)
        {
            var package = appDBContext.VisaPlans.Find(Id);
            Console.WriteLine(package);

            if (package == null)
            {
                return NotFound(); // Return 404 if the record with the specified ID is not found
            }

            appDBContext.VisaPlans.Remove(package);
            appDBContext.SaveChanges();

            return NoContent();
        }
    }
}
