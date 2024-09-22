import apiKey from "./apiKey.js";

let cityWeatherInfo = {};
// let cityDropdown = document.querySelector("#cityDropdown");

const cityEl = document.querySelector(".cityName");
const cityWeatherDescEl = document.querySelector(".cityWeatherDescription");
const cityTemperatureEl = document.querySelector(".cityWeatherTemperature");

// Function to get city latitude and longitude
async function getCityLatAndLon (city="London") {
    const latAndLonApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(latAndLonApi);
        const weatherData = await response.json();
        const cityLat = weatherData[0].lat;
        const cityLon = weatherData[0].lon;

        getCityWeatherData(cityLat, cityLon, city);
    }
    catch (error) {
        console.log("There was an error.", error.message);
    }
}

// Function to get city weather data
async function getCityWeatherData (lat, lon, city) {
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

    try {
        const response = await fetch(weatherApi);
        const weatherData = await response.json();
    
        // Assing the data to the city object
        cityWeatherInfo.city = city;
        cityWeatherInfo.description = weatherData.weather[0].description;
        cityWeatherInfo.icon = weatherData.weather[0].icon;
        cityWeatherInfo.temp = weatherData.main.temp;
    
        
        // Display the data on the frontend
        cityEl.innerHTML = cityWeatherInfo.city;
        cityWeatherDescEl.innerHTML = cityWeatherInfo.description;
        cityTemperatureEl.innerHTML = cityWeatherInfo.temp;
    }
    catch (error) {
        console.log("There was an error.", error.message);
    }
}


$(document).ready(function() {
    // Initialise dropdown
    $('.ui.dropdown').dropdown();

    // On application load simulate a click on the first item on the list which is London
    $('.item')[0].click();
  });


// Setup an event listener to fetch the selected city's weather data
$('.ui.dropdown').change((e) => {
    let selectedCity = e.target.value;
    getCityLatAndLon(selectedCity);
});


// $('.stuck.example .ui.dropdown')
//   .dropdown({
//     allowAdditions: true,
//     hideAdditions: false,
//     className: {
//       addition: 'stuck addition'
//     }
//   })
// ;