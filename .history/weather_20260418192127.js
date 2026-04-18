// --- CONFIGURATION ---
const API_KEY = '34205cb2e9edd108ca113701a84b0c7f'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// --- DOM ELEMENTS ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorMsg = document.getElementById('errorMsg');
const appBody = document.getElementById('appBody');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for a previously searched city
    const savedCity = localStorage.getItem('lastSearchedCity');
    if (savedCity) {
        fetchWeather(savedCity);
    }
});

// --- EVENT LISTENERS ---
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    }
});

// --- CORE LOGIC: API FETCH ---
async function fetchWeather(city) {
    try {
        // Hide error and show loading state (optional: add spinner here)
        errorMsg.classList.add('hidden');
        
        // Fetch data using Metric system for Celsius
        const response = await fetch(`${API_KEY}?q=${city}&appid=${API_KEY}&units=metric`);
        
        // Robust Error Handling for 404 (City Not Found)
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        
        // Save to Persistence layer (localStorage)
        localStorage.setItem('lastSearchedCity', city);
        
        // Pass data to UI Module
        updateUI(data);

    } catch (error) {
        showError();
    }
}

// --- UI UPDATE MODULE ---
function updateUI(data) {
    // 1. Update Text Content
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('condition').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    
    // Convert m/s to km/h for Wind Speed
    const windSpeedKmH = Math.round(data.wind.speed * 3.6);
    document.getElementById('windSpeed').textContent = `${windSpeedKmH} km/h`;

    // 2. Update Icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // 3. Format Local Time (Accounting for timezone shift from UTC)
    updateLocalTime(data.timezone);

    // 4. Update Dynamic Background
    updateBackground(data.weather[0].main);

    // 5. Reveal Card
    weatherCard.classList.remove('hidden');
}

// --- UTILITY: FORMAT TIME ---
function updateLocalTime(timezoneOffsetSeconds) {
    // Calculate current time at the target location using UTC offset
    const utcDate = new Date();
    const localTimestamp = utcDate.getTime() + (utcDate.getTimezoneOffset() * 60000) + (timezoneOffsetSeconds * 1000);
    const localDate = new Date(localTimestamp);

    const options = { weekday: 'short', hour: '2-digit', minute: '2-digit' };
    document.getElementById('localTime').textContent = localDate.toLocaleTimeString('en-US', options);
}

// --- UTILITY: DYNAMIC BACKGROUND ---
function updateBackground(weatherMain) {
    appBody.className = 'app-body'; // Reset classes
    
    const condition = weatherMain.toLowerCase();
    
    if (condition.includes('clear')) {
        appBody.classList.add('bg-clear');
    } else if (condition.includes('cloud')) {
        appBody.classList.add('bg-clouds');
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
        appBody.classList.add('bg-rain');
    } else {
        appBody.classList.add('bg-default');
    }
}

// --- UTILITY: ERROR HANDLING ---
function showError() {
    weatherCard.classList.add('hidden');
    errorMsg.classList.remove('hidden');
}