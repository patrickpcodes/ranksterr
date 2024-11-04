using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Ranksterr.Server.Api.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ranksterr.Server.Api.Repositories
{
    public class MovieCollectionRepository
    {
        private readonly IMongoCollection<MovieCollection> _collection;
        private readonly IMongoCollection<Movie> _movies;
        private readonly IMongoCollection<War> _wars;

        public MovieCollectionRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var settings = mongoDbSettings.Value;
            var mongoClient = new MongoClient(settings.ConnectionString);
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _collection = database.GetCollection<MovieCollection>("MovieCollections");
            _movies = database.GetCollection<Movie>("Movies");
            _wars = database.GetCollection<War>("Wars");
        }

        // Check the database connection (optional)
        public async Task CheckDatabaseConnectionAsync()
        {
            await _collection.Database.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
        }

        // Get all movie collections
        public async Task<List<MovieCollection>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        // Get all movies
        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _movies.Find(_ => true).ToListAsync();
        }

        // Get a movie by ID
        public async Task<Movie> GetMovieByIdAsync(int id)
        {
            return await _movies.Find(m => m.Id == id).FirstOrDefaultAsync();
        }

        // Create a new movie
        public async Task CreateMovieAsync(Movie movie)
        {
            var existingMovie = await _movies.Find(m => m.Id == movie.Id).FirstOrDefaultAsync();
            if (existingMovie == null)
            {
                await _movies.InsertOneAsync(movie);
            }
        }

        // Create a new war
        public async Task CreateWarAsync(War war)
        {
            foreach (var movie in war.Movies)
            {
                await CreateMovieAsync(movie);
            }
            await _wars.InsertOneAsync(war);
        }

        // Get a war by ID
        public async Task<War> GetWarByIdAsync(Guid id)
        {
            return await _wars.Find(w => w.Id == id).FirstOrDefaultAsync();
        }

        // Save a battle with a winner and update the next battle
        public async Task SaveBattleAsync( Battle battleObj )
        {
            var battleId = battleObj.Id;
            var winnerId = battleObj.WinnerId;
            var filter = Builders<War>.Filter.ElemMatch( w => w.Battles, b => b.Id == battleId );
            var war = await _wars.Find( filter ).FirstOrDefaultAsync();
            if( war != null )
            {
                var battle = war.Battles.Find( b => b.Id == battleId );
                if( battle != null )
                {
                    battle.WinnerId = winnerId;
                    battle.UpdatedDate = DateTime.UtcNow;
                    war.UpdateNextBattle();
                    war.UpdatedDate = DateTime.UtcNow;
                    await _wars.ReplaceOneAsync( w => w.Id == war.Id, war );
                }
            }
        }
    }
}