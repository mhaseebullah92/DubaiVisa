using DubaiVisa.Data;
using DubaiVisa.Models.Domain.Enums;
using DubaiVisa.Models.Domain;
using DubaiVisa.Models.View;
using Microsoft.AspNetCore.Mvc;
using DubaiVisa.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Stripe;

namespace DubaiVisa.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserApplicationController : Controller
    {
        private readonly AppDBContext appDBContext;
        public UserApplicationController(AppDBContext appDBContext)
        {
            this.appDBContext = appDBContext;
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("paginated-filtered")]
        public IActionResult paginatedFilteredApplications(int page = 1, int pageSize = 10, ApplicationStatus visaTypeFilter = ApplicationStatus.Submitted)
        {

            int totalItems = appDBContext.UserApplications.Where(v => v.ApplicationStatus == visaTypeFilter).Count();
            List<UserApplication> allRecords = appDBContext.UserApplications.Where(v => v.ApplicationStatus == visaTypeFilter).Skip((page - 1) * pageSize)
                                 .Take(pageSize).ToList();
            return Ok(new
            {
                TotalItems = totalItems,
                PageSize = pageSize,
                Page = page,
                Data = allRecords
            });
        }

        [HttpGet("track-application")]
        public IActionResult tracking(Guid Trackid )
        {

            var record = appDBContext.UserApplications
                .Where(entity => entity.Id == Trackid) // Replace "yourId" with the actual value you're looking for
                .Select(entity => new
                {
                    entity.Id,
                    entity.ApplicationStatus,
                    entity.applicationComments
                })
                .FirstOrDefault();
            return Ok(record);
        }


        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost("update-Application")]
        public IActionResult Putapplication(UpdateUserApplication updatedata)
        {

            var application = appDBContext.UserApplications.Find(updatedata.Id);
            if(application == null)
            {
                return BadRequest();
            }
            application.ApplicationStatus=updatedata.ApplicationStatus;
            application.applicationComments=updatedata.applicationComments;
            appDBContext.UserApplications.Update(application);
            appDBContext.SaveChanges();

            return Ok(application);
        }

        [HttpPost("update-application-ps")]
        public IActionResult applicationtransaction(UpdateTransactionUserApplication updatedata)
        {

            var service = new PaymentIntentService();
            var stripeResponse = service.Get(updatedata.TransactionId);
            if (stripeResponse.Status == "succeeded")
            {

                var application = appDBContext.UserApplications.Find(updatedata.Id);
                if (application == null)
                {
                    return BadRequest("Application Not Found");
                }
                application.TransactionId = updatedata.TransactionId;
                appDBContext.UserApplications.Update(application);
                appDBContext.SaveChanges();

                return Ok(application);
            }
            else
            {
                return BadRequest(stripeResponse.LastPaymentError?.Message ?? "Unknown error");
            }
        }


        [HttpPost("pending-application-ps")]
        public IActionResult Applicationpending(PendingApplication payload)
        {
            try
            {

                var application = appDBContext.UserApplications.Find(payload.Id);
                if (application == null)
                {
                    return BadRequest("Application Not Found");
                }
                application.ApplicationStatus = ApplicationStatus.Pending;
                appDBContext.UserApplications.Update(application);
                appDBContext.SaveChanges();

                return Ok(application);
            }
            catch (Exception ex) {
                    return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("delete-Application")]
        public IActionResult DelPackage(Guid Id)
        {
            var data = appDBContext.UserApplications.Find(Id);

            if (data == null)
            {
                return NotFound(); // Return 404 if the record with the specified ID is not found
            }
            DeleteImage(data.PassportPicture);
            DeleteImage(data.ProfilePicture);
            DeleteImage(data.IdPicture);
            appDBContext.UserApplications.Remove(data);
            appDBContext.SaveChanges();
            return NoContent();
        }




        [HttpPost("add-application")]
        public async Task<IActionResult> AddUserApplication([FromForm] ViewUserApplication viewUserApplication)
        {
            try
            {
                // Console.WriteLine("passthis");

                // Console.WriteLine(JsonSerializer.Serialize(viewUserApplication));
                viewUserApplication.PassportPictureUrl = await this.UploadImage(viewUserApplication.PassportPicture, "passportpic");
                viewUserApplication.ProfilePictureUrl = await this.UploadImage(viewUserApplication.ProfilePicture, "profilepic");
                viewUserApplication.IdPictureUrl = await this.UploadImage(viewUserApplication.IdPicture, "idpic");
                
                var userApplication = new UserApplication
                {
                    Id = Guid.NewGuid(),
                    PassportPicture = viewUserApplication.PassportPictureUrl,
                    ProfilePicture = viewUserApplication.ProfilePictureUrl,
                    IdPicture = viewUserApplication.IdPictureUrl,
                    Number = viewUserApplication.Number,
                    Email = viewUserApplication.Email,
                    FirstName = viewUserApplication.FirstName,
                    LastName = viewUserApplication.LastName,
                    Nationality = viewUserApplication.Nationality,
                    Destination = viewUserApplication.Destination,
                    PassportNumber = viewUserApplication.PassportNumber,
                    Profession = viewUserApplication.Profession,
                    TravelDate = viewUserApplication.TravelDate,
                    Purpose = viewUserApplication.Purpose,
                    VisitedBefore = viewUserApplication.VisitedBefore,
                    VisaPlanId = viewUserApplication.VisaPlanId,
                    AddOnIds = viewUserApplication.AddOnIds, // Assuming an application can have multiple add-ons
                    ApplicationStatus = ApplicationStatus.Submitted,
                    TransactionId = "",
                };
                await appDBContext.UserApplications.AddAsync(userApplication);
                await appDBContext.SaveChangesAsync();
                //return View();
                return Ok(userApplication);
            }
            catch (Exception ex)
            {
                Console
                    .WriteLine("Internal server error: ");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        private async Task<String> UploadImage(IFormFile image,String filetype)
        {
                if (image == null || image.Length == 0)
                    return "";

                // Create a unique file name
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);

            // Define the server path to save the file
                var filePatsh = Path.Combine("Storage","uploads", filetype);
                if (!Directory.Exists(filePatsh))
                {
                    Directory.CreateDirectory(filePatsh);
                }
                var filePath = Path.Combine("Storage","uploads", filetype, fileName);

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                // Return the file path to be displayed on the frontend
                return filePath;
        }

        private void DeleteImage(string filePath)
        {
            //string filePath = "path/to/your/file.txt";

            try
            {
                // Check if the file exists before attempting to delete
                if (System.IO.File.Exists(filePath))
                {
                    // Delete the file
                    System.IO.File.Delete(filePath);
                    Console.WriteLine("File deleted successfully.");
                }
                else
                {
                    Console.WriteLine("File does not exist.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting the file: {ex.Message}");
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("get-user-application")]
        public IActionResult GetfullApplication(Guid userid)
        {
            var result = appDBContext.UserApplications
                    .Where(u => u.Id == userid)
                    .Select(user => new
                    {
                        User = user,
                        VisaPlandata = user.VisaPlan,
                        Addons = appDBContext.AddOns
                          .Where(addon => user.AddOnIds.Contains(addon.Id))
                            .ToList(),
                    })
                    .FirstOrDefault();
            return Ok(result);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet("getimg")]
        public IActionResult GetImage(string path)
        {
            // Retrieve image path from the database based on id (you need to implement this)

            //var imagePath = "path_from_database"; // Replace with actual path
            //var physicalPath = Path.Combine(_configuration.GetValue<string>("ImageStorage:Path"), imagePath);

            if (!System.IO.File.Exists(path))
                return NotFound();

            var stream = System.IO.File.OpenRead(path);
            return File(stream, "image/jpeg"); // Adjust content type as needed
        }
    }
}
