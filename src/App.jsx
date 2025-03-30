import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import ThemeToggle from "./components/ThemeToggle";
import History from "./components/History";
import Forecast from "./components/Forecast";

// API key from environment variables
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory") || "[]")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }, [history]);

  const fetchWeather = async (searchCity) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastResponse.data);

      // Update search history
      setHistory((prev) => [
        searchCity,
        ...prev
          .filter((c) => c.toLowerCase() !== searchCity.toLowerCase())
          .slice(0, 4),
      ]);
    } catch (err) {
      setError(
        "City not found or API error. Please check the city name and try again."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = () => {
    if (weather) {
      fetchWeather(weather.name);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center transition-colors duration-300 dark:bg-gray-900 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl px-4 sm:px-6 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Weather Dashboard
          </h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>

        <main className="flex flex-col gap-6">
          <SearchBar
            city={city}
            setCity={setCity}
            fetchWeather={fetchWeather}
          />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              {loading && (
                <div className="flex justify-center items-center min-h-[200px]">
                  <Loader />
                </div>
              )}

              {error && <ErrorMessage message={error} />}

              {weather && !loading && (
                <>
                  <WeatherCard
                    weather={weather}
                    refreshWeather={refreshWeather}
                  />

                  {forecast && (
                    <div className="mt-6">
                      <Forecast forecast={forecast} />
                    </div>
                  )}
                </>
              )}
            </div>

            {history.length > 0 && (
              <div className="md:w-1/3">
                <History history={history} fetchWeather={fetchWeather} />
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Weather data provided by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}
