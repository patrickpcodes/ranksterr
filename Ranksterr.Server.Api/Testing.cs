using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Ranksterr.Server.Api.Data;
using Ranksterr.Server.Api.Models;

namespace Ranksterr.Server.Api;

public static class Testing
{
    public static void ApplyMigrations(IHost app)
{
    int retries = 0;
    const int maxRetries = 5;
    const int delayBetweenRetries = 5000; // milliseconds

    while (retries < maxRetries)
    {
        try
        {
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                dbContext.Database.Migrate();
                Console.WriteLine("Database migrations applied successfully.");
                break;
            }
        }
        catch (SqlException ex)
        {
            retries++;
            Console.WriteLine($"Database connection failed. Retry {retries}/{maxRetries}.");
            Console.WriteLine($"Error: {ex.Message}");
            Thread.Sleep(delayBetweenRetries);
        }
    }

    if (retries == maxRetries)
    {
        Console.WriteLine("Could not connect to the database after multiple retries.");
        // Optionally, exit the application or handle accordingly
        // Environment.Exit(-1);
    }
}
    public static async Task CreateTestUsers(IServiceProvider serviceProvider, IConfiguration configuration)
    {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var testUsers = configuration.GetSection("TestUsers").Get<List<TestUser>>();

        foreach (var testUser in testUsers)
        {
            var user = await userManager.FindByEmailAsync(testUser.Email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = testUser.UserName,
                    Email = testUser.Email,
                    FirstName = testUser.FirstName,
                    LastName = testUser.LastName
                };
                var result = await userManager.CreateAsync(user, testUser.Password);
                if (!result.Succeeded)
                {
                    throw new Exception($"Failed to create test user {testUser.UserName}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
        }
    }
}