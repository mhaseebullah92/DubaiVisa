using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DubaiVisa.Migrations
{
    /// <inheritdoc />
    public partial class updatingVisaplanfields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CurrencyId",
                table: "VisaPlans",
                newName: "Index");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "VisaPlans",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "VisaPlans");

            migrationBuilder.RenameColumn(
                name: "Index",
                table: "VisaPlans",
                newName: "CurrencyId");
        }
    }
}
