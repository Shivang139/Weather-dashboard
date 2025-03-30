export default function Forecast({ forecast }) {
  // Process forecast data to get one entry per day (excluding today)
  const dailyForecasts = {};

  // Group forecast by day and keep the entry closest to noon for each day
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toISOString().split("T")[0];

    // Skip today's forecast
    const today = new Date().toISOString().split("T")[0];
    if (day === today) return;

    // If we don't have this day yet, or if this entry is closer to noon than what we have
    const hour = date.getHours();
    const distanceFromNoon = Math.abs(12 - hour);

    if (
      !dailyForecasts[day] ||
      distanceFromNoon <
        Math.abs(12 - new Date(dailyForecasts[day].dt * 1000).getHours())
    ) {
      dailyForecasts[day] = item;
    }
  });

  // Convert to array and limit to 5 days
  const dailyForecastArray = Object.values(dailyForecasts).slice(0, 5);

  // Check if we have forecast data
  if (dailyForecastArray.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-blue-500"
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
          5-Day Forecast
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x dark:divide-gray-700">
        {dailyForecastArray.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString(undefined, { weekday: "short" });
          const dayNum = date.getDate();
          const month = date.toLocaleDateString(undefined, { month: "short" });

          return (
            <div
              key={index}
              className="p-4 flex flex-col items-center justify-center"
            >
              <p className="font-semibold text-gray-800 dark:text-white">
                {day}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {dayNum} {month}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="w-12 h-12 my-2"
              />

              <p className="font-medium text-gray-900 dark:text-white">
                {Math.round(item.main.temp)}°C
              </p>

              <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
                {item.weather[0].description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
