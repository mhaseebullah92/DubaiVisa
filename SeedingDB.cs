using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DubaiVisa
{
    public class SeedingDB
    {
        private readonly IConfiguration configuration;
        public SeedingDB(IConfiguration iConfig)
        {
            configuration = iConfig;
        }
        [NonAction]
        public async Task InitializeRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            // Create roles if they don't exist
            string[] roleNames = { "Admin", "User" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);

                if (!roleExist)
                {
                    // Create the roles and seed them to the database
                    roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
        [NonAction]
        public async Task InitializeAdminAsync(UserManager<IdentityUser> userManager)
        {
            // Create an admin user if it doesn't exist
            var email = configuration.GetSection("AdminSetUp").GetSection("AdminEmail").Value;
            //("AdminSetUp:AdminEmail");
            var username = configuration.GetSection("AdminSetUp").GetSection("UserName").Value;
            var password = configuration.GetSection("AdminSetUp").GetSection("AdminPassword").Value;
            if(email == null || username == null || password==null) {
                return;
            }
            IdentityUser user = await userManager.FindByEmailAsync(email);

            if (user == null)
            {
                user = new IdentityUser()
                {
                    UserName = username,
                    Email = email,
                };

                // Provide a password for the admin user
                string adminPassword = password; // You should use a secure password

                IdentityResult result = await userManager.CreateAsync(user, adminPassword);

                if (result.Succeeded)
                {
                    // Assign the 'Admin' role to the admin user
                    await userManager.AddToRoleAsync(user, "Admin");
                }
            }
        }
    }
}
