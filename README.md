# weather-app
A sleek, dark-themed dashboard built with Vanilla JavaScript and the OpenWeatherMap API. It features a signature purple and crimson UI to deliver real-time temperature, weather conditions, and icons. Designed for speed and responsiveness, it uses asynchronous fetch logic to provide instant global weather updates.
Weather API Project
 Overview
This is a JavaScript-based application that connects to the OpenWeatherMap API to pull real-time weather data. It uses modern async/await syntax to handle the data request and update the UI dynamically.


 API Setup
Source: OpenWeatherMap

API Key: Use the 32-character hexadecimal key found in your account dashboard.

Activation Note: If you get a 401 Unauthorized error, the key is likely still activating. This usually takes 30 to 120 minutes for new accounts.

🚀 How to Run
Save your code as index.html.

Open the file in any modern web browser (Chrome, Edge, etc.).

Enter a city name (e.g., "Nairobi") and click the search button.

 Technical Breakdown
The URL: Uses units=metric to ensure temperature is in Celsius.

The Fetch: Uses the Fetch API to send a GET request.

The UI: Configured with a Dark Mode theme using:

Primary Color: Deep Purple (#800080)

Accent Color: Crimson (#ff0033)

Error Handling: Includes a try...catch block to manage "City Not Found" or "Invalid Key" errors without crashing the script.