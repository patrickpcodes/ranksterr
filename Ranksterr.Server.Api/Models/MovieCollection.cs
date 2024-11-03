using Newtonsoft.Json;

namespace Ranksterr.Server.Api.Models;

public class MovieCollection
{
    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("overview")]
    public string Overview { get; set; }

    [JsonProperty("poster_path")]
    public string PosterPath { get; set; }

    [JsonProperty("backdrop_path")]
    public string BackdropPath { get; set; }

    [JsonProperty("parts")]
    public List<Movie> Movies { get; set; }
}