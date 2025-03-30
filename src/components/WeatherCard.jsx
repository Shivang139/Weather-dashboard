export default function WeatherCard({ weather, refreshWeather }) {
  const { name, sys, main, weather: weatherDetails, wind } = weather;

  // Format date using local time
  const date = new Date();
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              {name}, {sys.country}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{formattedDate}</p>
          </div>

          <button
            onClick={refreshWeather}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Refresh weather data"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center mt-6">
          <div className="flex-1">
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`}
                alt={weatherDetails[0].description}
                className="w-16 h-16"
              />
              <div className="ml-2">
                <p className="capitalize text-lg font-medium text-gray-700 dark:text-gray-300">
                  {weatherDetails[0].description}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {Math.round(main.temp)}°C
              </div>
              <div className="flex text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>Feels like {Math.round(main.feels_like)}°C</span>
                <span className="mx-2">•</span>
                <span>Min: {Math.round(main.temp_min)}°C</span>
                <span className="mx-2">•</span>
                <span>Max: {Math.round(main.temp_max)}°C</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <div className="ml-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Humidity
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {main.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
            <div className="ml-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Wind Speed
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {wind.speed} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="ml-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pressure
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {main.pressure} hPa
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <div className="ml-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Visibility
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {(weather.visibility / 1000).toFixed(1)} km
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
