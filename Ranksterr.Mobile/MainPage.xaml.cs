namespace Ranksterr.Mobile;

public partial class MainPage : ContentPage
{
	int count = 0;

	public MainPage()
	{
		InitializeComponent();
		Console.WriteLine("MainPage initialized.");
	}

	private void OnCounterClicked(object sender, EventArgs e)
	{
		count++;

		if (count == 1)
			CounterBtn.Text = $"Clicked {count} time";
		else
			CounterBtn.Text = $"Clicked {count} times";

		Console.WriteLine($"CounterBtn clicked {count} times");
		SemanticScreenReader.Announce(CounterBtn.Text);
	}

	private async void OnMovieComparisonClicked(object sender, EventArgs e)
	{
		// Navigate to MovieComparisonPage
		await Navigation.PushAsync(new MovieComparisonPage());
	}
}

