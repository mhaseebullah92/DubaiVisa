using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DubaiVisa.Migrations
{
    /// <inheritdoc />
    public partial class AddingApplicationComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "applicationComments",
                table: "UserApplications",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "applicationComments",
                table: "UserApplications");
        }
    }
}
