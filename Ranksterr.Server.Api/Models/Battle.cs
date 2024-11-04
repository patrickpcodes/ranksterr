using System;

namespace Ranksterr.Server.Api.Models
{
    public class Battle
    {
        public Guid Id { get; set; }
        public Movie Movie1 { get; set; }
        public Movie Movie2 { get; set; }
        public int WinnerId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Battle()
        {
        }
    }
}