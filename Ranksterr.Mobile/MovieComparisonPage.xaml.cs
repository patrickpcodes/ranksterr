using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Windows.Input;
using Microsoft.Maui.Controls;

namespace Ranksterr.Mobile
{
    public partial class MovieComparisonPage : ContentPage
    {
        public List<Movie> Movies { get; set; }
        public Movie LeftMovie1 { get; set; } // First movie for comparison
        public Movie LeftMovie2 { get; set; } // Second movie for comparison

        public ICommand MovieSelectedCommand { get; }
        public ICommand Movie1ClickedCommand { get; }
        public ICommand Movie2ClickedCommand { get; }

        private Dictionary<string, string> imageCache = new Dictionary<string, string>();

        public MovieComparisonPage()
        {
            InitializeComponent();
            LoadMovies();
            BindingContext = this; // Set the BindingContext

            // Initialize the command
            MovieSelectedCommand = new Command<Movie>(OnMovieSelected);
            Movie1ClickedCommand = new Command(() => OnMovie1Clicked() );
            Movie2ClickedCommand = new Command( () => OnMovie2Clicked() );
        }

        private async void LoadMovies()
        {
            try
            {
                var assembly = typeof(MovieComparisonPage).Assembly;
                using Stream stream = assembly.GetManifestResourceStream("Ranksterr.Mobile.Data.movies.json");
                using StreamReader reader = new StreamReader(stream);
                string json = await reader.ReadToEndAsync();

                var movieData = JsonSerializer.Deserialize<MovieCollection>(json);
                Movies = movieData?.Parts.OrderBy(c => c.ReleaseDate).ToList();

                // Set the LeftMovies to the first two movies for display
                if (Movies != null && Movies.Count > 1)
                {
                    LeftMovie1 = Movies[0]; // First movie
                    LeftMovie2 = Movies[1]; // Second movie
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading movies: {ex.Message}");
            }
        }

        private string GetCachedImage(string posterPath)
        {
            if (!imageCache.ContainsKey(posterPath))
            {
                var imageUrl = $"https://image.tmdb.org/t/p/original{posterPath}";
                imageCache[posterPath] = imageUrl; // Cache the image URL
            }
            return imageCache[posterPath];
        }
        private void OnImage1Tapped( object sender, EventArgs e )
        {
            // Handle the tap
            Console.WriteLine( "Image Tapped" );
            OnMovie1Clicked();
        }
        private void OnImage2Tapped( object sender, EventArgs e )
        {
            // Handle the tap
            Console.WriteLine( "Image Tapped" );
            OnMovie2Clicked();
        }
        private void OnMovie1Clicked()
        {
            OnMovieSelected(LeftMovie1);
        }

        private void OnMovie2Clicked()
        {
            OnMovieSelected(LeftMovie2);
        }

        private void OnMovieSelected(Movie selectedMovie)
        {
            // Update the points for the selected movie
            var movie = Movies.Find(m => m.Id == selectedMovie.Id);
            if (movie != null)
            {
                movie.Points++;
            }

            Movies = Movies.OrderByDescending(c => c.Points).ThenBy(d => d.ReleaseDate).ToList();
            OnPropertyChanged(nameof(Movies));

            // Get a new random pair of movies for comparison
            GetRandomPair();
        }

        private void GetRandomPair()
        {
            if (Movies.Count < 2) return;

            var shuffled = Movies.OrderBy(m => Guid.NewGuid()).ToList();
            LeftMovie1 = shuffled[0];
            LeftMovie2 = shuffled[1];

            // Refresh the UI
            OnPropertyChanged(nameof(LeftMovie1));
            OnPropertyChanged(nameof(LeftMovie2));
        }
    }
}
