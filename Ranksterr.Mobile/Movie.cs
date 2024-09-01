using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json.Serialization;

namespace Ranksterr.Mobile
{
    public class Movie : INotifyPropertyChanged
    {
        private int _points;

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("original_title")]
        public string OriginalTitle { get; set; }

        [JsonPropertyName("overview")]
        public string Overview { get; set; }

        [JsonPropertyName("poster_path")]
        public string PosterPath { get; set; }

        [JsonPropertyName("backdrop_path")]
        public string BackdropPath { get; set; }

        [JsonPropertyName("original_language")]
        public string OriginalLanguage { get; set; }

        [JsonPropertyName("genre_ids")]
        public List<int> GenreIds { get; set; }

        [JsonPropertyName("popularity")]
        public double Popularity { get; set; }

        [JsonPropertyName("release_date")]
        public string ReleaseDate { get; set; }

        [JsonPropertyName("vote_average")]
        public double VoteAverage { get; set; }

        [JsonPropertyName("vote_count")]
        public int VoteCount { get; set; }

        // Points property with change notification
        [JsonPropertyName("points")]
        public int Points
        {
            get => _points;
            set
            {
                if (_points != value)
                {
                    _points = value;
                    OnPropertyChanged(nameof(Points));
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public class MovieCollection
    {
        [JsonPropertyName("parts")]
        public List<Movie> Parts { get; set; }
    }
}