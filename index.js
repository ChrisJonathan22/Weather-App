import apiKey from "./apiKey.js";

let cityWeatherInfo = {};

const cityEl = document.querySelector(".cityName");
const cityWeatherDescEl = document.querySelector(".cityWeatherDescription");
const cityTemperatureEl = document.querySelector(".cityWeatherTemperature");

// Function to get city latitude and longitude
async function getCityLatAndLon (city) {
    const latAndLonApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    const response = await fetch(latAndLonApi);
    const weatherData = await response.json();
    const cityLat = weatherData[0].lat;
    const cityLon = weatherData[0].lon;

    getCityWeatherData(cityLat, cityLon, city);
}

// Function to get city weather data
async function getCityWeatherData (lat, lon, city) {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const response = await fetch(weatherApi);
    const weatherData = await response.json();


    // Assing the data to the city object
    cityWeatherInfo.city = city;
    cityWeatherInfo.description = weatherData.weather[0].description;
    cityWeatherInfo.icon = weatherData.weather[0].icon;
    cityWeatherInfo.temp = weatherData.main.temp;

    console.log("Final data: ", cityWeatherInfo);

    
    // Display the data on the frontend
    cityEl.innerHTML = cityWeatherInfo.city;
    cityWeatherDescEl.innerHTML = cityWeatherInfo.description;
    cityTemperatureEl.innerHTML = cityWeatherInfo.temp;
}


getCityLatAndLon("Paris");