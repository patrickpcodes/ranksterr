using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using MongoDB.Driver;
using Newtonsoft.Json;
using Ranksterr.Server.Api.Models;
using Ranksterr.Server.Api.Repositories;

namespace Ranksterr.Server.Api;

public static class Testing
{

    public static async Task ImportMovieCollectionsToMongoDB(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var repo = scope.ServiceProvider.GetRequiredService<MovieCollectionRepository>();
        await repo.CheckDatabaseConnectionAsync();
        var mongoClient = scope.ServiceProvider.GetRequiredService<IMongoClient>();
        var database = mongoClient.GetDatabase("RanksterrMongoDB");
        var collection = database.GetCollection<MovieCollection>("MovieCollections");
        var dataPath = Path.Combine(app.Environment.ContentRootPath, "DataFiles");
        var jsonFiles = Directory.GetFiles(dataPath, "*.json");

        foreach (var file in jsonFiles)
        {
            var jsonContent = await File.ReadAllTextAsync(file);
            var movieCollection = JsonConvert.DeserializeObject<MovieCollection>(jsonContent);

            if (movieCollection != null)
            {
                foreach (var movie in movieCollection.Movies)
                {
                    await repo.CreateMovieAsync(movie);
                }

                var filter = Builders<MovieCollection>.Filter.Eq(mc => mc.Id, movieCollection.Id);
                var options = new ReplaceOptions { IsUpsert = true };
                await collection.ReplaceOneAsync(filter, movieCollection, options);
            }
        }

        // Create a war with specified movie IDs
        var movieIds = new List<int> { 10138, 68721, 253, 714, 671, 675, 12445, 755679, 9615 };
        var movies = new List<Movie>();
        foreach (var id in movieIds)
        {
            var movie = await repo.GetMovieByIdAsync(id);
            if (movie != null)
            {
                movies.Add(movie);
            }
        }
        var gid = Guid.Parse( "47ae3e0d-1e08-4126-b328-8fd522f88b22" );
        var war = new War
        {
            Id = gid,
            Movies = movies
        };
        war.GenerateBattles();
        Console.WriteLine( "Created war with Guid " + gid );
        var warFromDb = await repo.GetWarByIdAsync( gid );
        if(warFromDb == null)
            await repo.CreateWarAsync(war);
    }

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
                    throw new Exception(
                        $"Failed to create test user {testUser.UserName}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                }
            }
        }
    }
}