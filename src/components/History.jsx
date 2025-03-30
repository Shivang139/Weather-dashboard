export default function History({ history, fetchWeather }) {
  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Recent Searches
      </h3>

      <ul className="space-y-2">
        {history.map((city, index) => (
          <li
            key={index}
            className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-2 last:pb-0"
          >
            <button
              onClick={() => fetchWeather(city)}
              className="w-full text-left py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {city}
            </button>
          </li>
        ))}
      </ul>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        Click on a city to view its current weather
      </div>
    </div>
  );
}
