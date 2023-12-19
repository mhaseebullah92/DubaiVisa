using DubaiVisa;
using DubaiVisa.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Stripe;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseSqlServer(builder.Configuration
    .GetConnectionString("AppDBConnectionString")));


// For Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDBContext>()
    .AddDefaultTokenProviders();

StripeConfiguration.ApiKey = builder.Configuration["Strip:SecretKey"];

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});


//builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddRoles<IdentityRole>()
//    .AddEntityFrameworkStores<AppDBContext>();
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddRoles<IdentityRole>()
//    .AddEntityFrameworkStores<AppDBContext>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();

   // app.UseSwagger();
   // app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
//app.MapIdentityApi<IdentityUser>();

app.MapFallbackToFile("index.html");

CreateAdminOnStartup(app.Services).GetAwaiter().GetResult();

// This middleware serves generated Swagger document as a JSON endpoint
app.UseSwagger();

// This middleware serves the Swagger documentation UI
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee API V1");
});
//SeedingDB.ReferenceEquals(app,);
app.Run();

async Task CreateAdminOnStartup(IServiceProvider serviceProvider)
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

        Console.WriteLine("Initialization code is running...");
        SeedingDB seedclass = new SeedingDB(builder.Configuration);
        await seedclass.InitializeRolesAsync(roleManager);
        await seedclass.InitializeAdminAsync(userManager);
    }
}