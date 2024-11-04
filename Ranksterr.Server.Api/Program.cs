using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Ranksterr.Server.Api.Models;
using System.Text;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Ranksterr.Server.Api;
using Ranksterr.Server.Api.Repositories;
using TMDbLib.Client;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors( options =>
{
    options.AddPolicy( "AllowNextJsApp",
        builder => builder.WithOrigins( "http://localhost:3005" ) // Adjust this to match your Next.js app's URL
                          .WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader() );
} );
// Register TMDbClient with the DI container
builder.Services.AddSingleton<TMDbClient>(sp => 
{
    string apiKey = builder.Configuration["TMDB:ApiKey"]; // Ensure this is configured in appsettings.json
    return new TMDbClient(apiKey);
});
// Configure DbContext
builder.Services.AddDbContext<ApplicationDbContext>( options =>
    options.UseSqlServer( builder.Configuration.GetConnectionString( "DefaultConnection" ) ) );

// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
       .AddEntityFrameworkStores<ApplicationDbContext>()
       .AddDefaultTokenProviders();

// Configure JWT
builder.Services.AddAuthentication( options =>
       {
           options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
           options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
       } )
       .AddJwtBearer( options =>
       {
           options.TokenValidationParameters = new TokenValidationParameters
           {
               ValidateIssuer = true,
               ValidateAudience = true,
               ValidateLifetime = true,
               ValidateIssuerSigningKey = true,
               ValidIssuer = builder.Configuration["Jwt:Issuer"],
               ValidAudience = builder.Configuration["Jwt:Audience"],
               IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( builder.Configuration["Jwt:Key"] ) )
           };
       } );

// Add these lines after your existing configuration
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));

builder.Services.AddSingleton<MongoDbSettings>(sp =>
    sp.GetRequiredService<IOptions<MongoDbSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(sp.GetRequiredService<MongoDbSettings>().ConnectionString));

builder.Services.AddSingleton<MovieCollectionRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors( "AllowNextJsApp" );

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Testing.ImportMovieCollectionsToMongoDB( app ).Wait();
Testing.ApplyMigrations( app );
Testing.CreateTestUsers( app.Services, app.Configuration ).Wait();

app.Run();

record WeatherForecast( DateOnly Date, int TemperatureC, string? Summary )
{
    public int TemperatureF => 32 + (int)( TemperatureC / 0.5556 );
}