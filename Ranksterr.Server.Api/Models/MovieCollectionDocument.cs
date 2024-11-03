using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Ranksterr.Server.Api.Models
{
    public class MovieCollectionDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int CollectionId { get; set; }
        public string Name { get; set; }
        public string Overview { get; set; }
        public string PosterPath { get; set; }
        public string BackdropPath { get; set; }
        public List<Movie> Movies { get; set; }
    }
}