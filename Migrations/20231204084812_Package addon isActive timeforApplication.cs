using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DubaiVisa.Migrations
{
    /// <inheritdoc />
    public partial class PackageaddonisActivetimeforApplication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "VisaPlans",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "UserApplications",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "AddOns",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "AddOns",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "VisaPlans");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "UserApplications");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "AddOns");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "AddOns");
        }
    }
}
