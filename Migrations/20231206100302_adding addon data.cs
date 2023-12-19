using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DubaiVisa.Migrations
{
    /// <inheritdoc />
    public partial class addingaddondata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserApplicationId",
                table: "AddOns",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AddOns_UserApplicationId",
                table: "AddOns",
                column: "UserApplicationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AddOns_UserApplications_UserApplicationId",
                table: "AddOns",
                column: "UserApplicationId",
                principalTable: "UserApplications",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddOns_UserApplications_UserApplicationId",
                table: "AddOns");

            migrationBuilder.DropIndex(
                name: "IX_AddOns_UserApplicationId",
                table: "AddOns");

            migrationBuilder.DropColumn(
                name: "UserApplicationId",
                table: "AddOns");
        }
    }
}
