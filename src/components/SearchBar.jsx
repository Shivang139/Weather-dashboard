export default function SearchBar({ city, setCity, fetchWeather }) {
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2 w-full relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Search
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 justify-center text-xs">
        <span className="text-gray-500 dark:text-gray-400">Popular:</span>
        {["Gorakhpur", "Jalandhar", "New Delhi", "Mumbai", "Bengaluru"].map(
          (city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setCity(city);
                fetchWeather(city);
              }}
              className="px-2 py-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              {city}
            </button>
          )
        )}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Enter a city name to get current weather conditions
      </div>
    </form>
  );
}
