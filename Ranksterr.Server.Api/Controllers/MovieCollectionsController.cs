using Microsoft.AspNetCore.Mvc;
using Ranksterr.Server.Api.Models;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Ranksterr.Server.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovieCollectionsController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private readonly string _dataPath;

    public MovieCollectionsController(IWebHostEnvironment environment)
    {
        _environment = environment;
        _dataPath = Path.Combine(_environment.ContentRootPath, "Data");
    }

    [HttpGet]
    public ActionResult<IEnumerable<MovieCollection>> GetAllCollections()
    {
        var jsonFiles = Directory.GetFiles(_dataPath, "*.json");
        var movieCollections = new List<MovieCollection>();

        foreach (var file in jsonFiles)
        {
            var jsonContent = System.IO.File.ReadAllText(file);
            var fullCollection = JsonConvert.DeserializeObject<MovieCollection>(jsonContent);

            if (fullCollection != null)
            {
                movieCollections.Add(new MovieCollection
                {
                    Id = fullCollection.Id,
                    Name = fullCollection.Name,
                    PosterPath = fullCollection.PosterPath
                    // Parts is intentionally omitted
                });
            }
        }

        return Ok(movieCollections);
    }

    [HttpGet("{id}")]
    public ActionResult<MovieCollection> GetCollectionById(int id)
    {
        var filePath = Path.Combine(_dataPath, $"{id}.json");
        if (!System.IO.File.Exists(filePath))
        {
            return NotFound();
        }

        var jsonContent = System.IO.File.ReadAllText(filePath);
        var movieCollection = JsonConvert.DeserializeObject<MovieCollection>(jsonContent);

        if (movieCollection == null)
        {
            return NotFound();
        }

        return Ok(movieCollection);
    }
}
