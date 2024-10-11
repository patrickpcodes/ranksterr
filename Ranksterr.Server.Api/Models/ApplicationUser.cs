using Microsoft.AspNetCore.Identity;

namespace Ranksterr.Server.Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        // Add any additional properties you want for your user
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
