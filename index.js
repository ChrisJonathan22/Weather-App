import apiKey from "./apiKey.js";

let cityWeatherInfo = {};
let searchKeyword;
let errorMessage = $('.search .emptySearchError');
let cityNotFoundErrorMessage = $('.search .cityNotFoundError');
// let cityDropdown = document.querySelector("#cityDropdown");

const cityEl = $('.cityName');
const cityWeatherDescEl = $('.cityWeatherDescription');
const cityTemperatureEl = $('.cityWeatherTemperature');
const cityWeatherIconEl = $('.cityWeatherIcon');

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
        // Show error if there's no match for the city queried
        cityNotFoundErrorMessage.addClass('show');
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
        cityEl.html(cityWeatherInfo.city);
        cityWeatherDescEl.html(cityWeatherInfo.description);
        cityTemperatureEl.html(cityWeatherInfo.temp);
        cityWeatherIconEl.attr('src', `https://openweathermap.org/img/w/${cityWeatherInfo.icon}.png`);
        cityWeatherIconEl.addClass('show');
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

$('.ui.button').click((e) => {
    // Capture the content of the search box
    searchKeyword = $('.search .prompt')[0].value;

    // Check if the search box is empty
    if (searchKeyword.length === 0) {
        // Show error if the search box is empty
        errorMessage.addClass('show');
        return;
    }
    
    getCityLatAndLon(searchKeyword);
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