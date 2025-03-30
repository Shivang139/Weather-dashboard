export default function Loader() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <svg
            className="h-6 w-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Loading weather data...
      </p>
    </div>
  );
}
