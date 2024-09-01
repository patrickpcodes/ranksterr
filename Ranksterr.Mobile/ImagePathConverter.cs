using System;
using System.Globalization;
using Microsoft.Maui.Controls;

namespace Ranksterr.Mobile
{
    public class ImagePathConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is string posterPath)
            {
                return $"https://image.tmdb.org/t/p/original{posterPath}";
            }
            return null;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
