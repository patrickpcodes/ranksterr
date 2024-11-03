// Full file: Ranksterr.Server.Api/Models/War.cs
using System;
using System.Collections.Generic;

namespace Ranksterr.Server.Api.Models
{
    public class War
    {
        public Guid Id { get; set; }
        public List<Movie> Movies { get; set; } = new List<Movie>();
        public List<Battle> Battles { get; set; } = new List<Battle>();
        public Battle NextBattle { get; set; }

        public void GenerateBattles()
        {
            for (int i = 0; i < Movies.Count; i++)
            {
                for (int j = i + 1; j < Movies.Count; j++)
                {
                    Battles.Add(new Battle
                    {
                        Id = Guid.NewGuid(),
                        Movie1 = Movies[i],
                        Movie2 = Movies[j]
                    });
                }
            }
            UpdateNextBattle();
        }

        public void UpdateNextBattle()
        {
            var battlesWithoutWinner = Battles.FindAll( b => b.WinnerId == 0 );
            if( battlesWithoutWinner.Count > 0 )
            {
                var random = new Random();
                NextBattle = battlesWithoutWinner[random.Next( battlesWithoutWinner.Count )];
            }
            else
            {
                NextBattle = null;
            }
        }
    }
}