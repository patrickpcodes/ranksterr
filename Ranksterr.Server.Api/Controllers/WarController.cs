// Full file: Ranksterr.Server.Api/Controllers/WarController.cs
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using Ranksterr.Server.Api.Models;
using Ranksterr.Server.Api.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ranksterr.Server.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WarController : ControllerBase
    {
        private readonly MovieCollectionRepository _repository;
        private readonly JsonSerializerSettings _jsonSettings;

        public WarController(MovieCollectionRepository repository)
        {
            _repository = repository;
            _jsonSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateWar([FromBody] List<int> movieIds)
        {
            var movies = new List<Movie>();
            foreach (var id in movieIds)
            {
                var movie = await _repository.GetMovieByIdAsync(id);
                if (movie != null)
                {
                    movies.Add(movie);
                }
            }

            var war = new War
            {
                Id = Guid.NewGuid(),
                Movies = movies
            };
            war.GenerateBattles();

            await _repository.CreateWarAsync(war);
            var serializedWar = JsonConvert.SerializeObject( war, _jsonSettings );
            return Content( serializedWar, "application/json" );
        }

        [HttpPost("save-battle")]
        public async Task<IActionResult> SaveBattle([FromBody] SaveBattleRequest request)
        {
            var war = await _repository.GetWarByIdAsync(request.Id);
            if (war == null)
            {
                return NotFound();
            }

            var battle = war.Battles.Find(b => b.Id == request.BattleId);
            if (battle == null)
            {
                return NotFound();
            }

            battle.WinnerId = request.WinnerId;

            await _repository.SaveBattleAsync(battle);
            var serializedWar = JsonConvert.SerializeObject( war, _jsonSettings );
            return Content( serializedWar, "application/json" );
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWarById(Guid id)
        {
            var war = await _repository.GetWarByIdAsync(id);
            if (war == null)
            {
                return NotFound();
            }
            var serializedWar = JsonConvert.SerializeObject(war, _jsonSettings);
            return Content(serializedWar, "application/json");
        }
        [HttpGet("next-battle/{warId}")]
        public async Task<IActionResult> GetNextBattle(Guid warId)
        {
            var war = await _repository.GetWarByIdAsync(warId);
            var serializedWar = JsonConvert.SerializeObject( war, _jsonSettings );
            return Content( serializedWar, "application/json" );
        }
    }
    public class SaveBattleRequest
    {
        public Guid Id { get; set; }
        public Guid BattleId { get; set; }
        public int WinnerId { get; set; }
    }
}