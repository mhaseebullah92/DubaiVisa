using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DubaiVisa.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AddOns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsdPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AedPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UsdDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AedDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddOns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VisaPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VisaType = table.Column<int>(type: "int", nullable: false),
                    StayDuration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UsdPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AedPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UsdDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AedDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisaPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserApplications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PassportPicture = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProfilePicture = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdPicture = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassportNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Profession = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TravelDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VisitedBefore = table.Column<bool>(type: "bit", nullable: false),
                    VisaPlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AddOnIds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApplicationStatus = table.Column<int>(type: "int", nullable: false),
                    TransactionId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserApplications_VisaPlans_VisaPlanId",
                        column: x => x.VisaPlanId,
                        principalTable: "VisaPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserApplications_VisaPlanId",
                table: "UserApplications",
                column: "VisaPlanId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddOns");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "UserApplications");

            migrationBuilder.DropTable(
                name: "VisaPlans");
        }
    }
}
