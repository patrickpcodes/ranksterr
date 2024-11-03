using Microsoft.AspNetCore.Mvc;
using Ranksterr.Server.Api.Models;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Ranksterr.Server.Api.Repositories;

namespace Ranksterr.Server.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MovieCollectionsController : ControllerBase
{
    private readonly MovieCollectionRepository _repository;
    private readonly JsonSerializerSettings _jsonSettings;
    public MovieCollectionsController(MovieCollectionRepository repository)
    {
        _repository = repository;
        _jsonSettings = new JsonSerializerSettings
        {
            ContractResolver = new CamelCasePropertyNamesContractResolver()
        };
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var collections = await _repository.GetAllAsync();
        var serializedCollection = JsonConvert.SerializeObject(collections, _jsonSettings);
        return Content(serializedCollection, "application/json");
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var collection = await _repository.GetMovieByIdAsync( id);
        if (collection == null)
            return NotFound();
        var serializedCollection = JsonConvert.SerializeObject(collection, _jsonSettings);
         return Content(serializedCollection, "application/json");

    }
    // private readonly IWebHostEnvironment _environment;
    // private readonly string _dataPath;
    //
    // public MovieCollectionsController(IWebHostEnvironment environment)
    // {
    //     _environment = environment;
    //     _dataPath = Path.Combine(_environment.ContentRootPath, "Data");
    //     _jsonSettings = new JsonSerializerSettings
    //     {
    //         ContractResolver = new CamelCasePropertyNamesContractResolver()
    //     };
    // }

    // [HttpGet]
    // public ActionResult<IEnumerable<MovieCollection>> GetAllCollections()
    // {
    //     var jsonFiles = Directory.GetFiles(_dataPath, "*.json");
    //     var movieCollections = new List<MovieCollection>();
    //
    //     foreach (var file in jsonFiles)
    //     {
    //         var jsonContent = System.IO.File.ReadAllText(file);
    //         var fullCollection = JsonConvert.DeserializeObject<MovieCollection>(jsonContent);
    //
    //         if (fullCollection != null)
    //         {
    //             movieCollections.Add(new MovieCollection
    //             {
    //                 Id = fullCollection.Id,
    //                 Name = fullCollection.Name,
    //                 PosterPath = fullCollection.PosterPath
    //                 // Parts is intentionally omitted
    //             });
    //         }
    //     }
    //     
    //     var serializedCollections = JsonConvert.SerializeObject(movieCollections, _jsonSettings);
    //     return Content(serializedCollections, "application/json");
    // }
    //
    // [HttpGet("{id}")]
    // public ActionResult<MovieCollection> GetCollectionById(int id)
    // {
    //     var filePath = Path.Combine(_dataPath, $"{id}.json");
    //     if (!System.IO.File.Exists(filePath))
    //     {
    //         return NotFound();
    //     }
    //
    //     var jsonContent = System.IO.File.ReadAllText(filePath);
    //     var movieCollection = JsonConvert.DeserializeObject<MovieCollection>(jsonContent);
    //
    //     if (movieCollection == null)
    //     {
    //         return NotFound();
    //     }
    //
    //     var serializedCollection = JsonConvert.SerializeObject(movieCollection, _jsonSettings);
    //     return Content(serializedCollection, "application/json");
    // }
}