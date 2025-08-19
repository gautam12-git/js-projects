document.addEventListener("DOMContentLoaded", () => {
const cityInput = document.getElementById("city-input");
const getWeatherButton = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const tempDisplay = document.getElementById("temperataure");
const descriptionDisplay = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const API_key = "9d1305b13faaee58827c71f933aead98"



getWeatherButton.addEventListener("click", async () => {
   const city = cityInput.value.trim()
   if(!city) return;


   try {
    const weatherData = await fetchWeatherData(city)
    displayWeatherData(weatherData)
   } catch (error) {
    console.log(`fetch error : `, error)
     showError();
   
   
   }
})


async function fetchWeatherData(city) {

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_key}`;

const response = await fetch(url)

if(!response.ok){
    throw new Error("City not found")
}

const data = await response.json()
return data;
}
// console.log(`Fetched data :`, data)

function displayWeatherData(data) {
//    console.log(data)

   weatherInfo.classList.remove("hidden")
   errorMessage.classList.add("hidden")

   const {name, main, weather} = data;
cityName.textContent = name;
tempDisplay.textContent = `Temoerature: ${main.temp}°C`
descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    


}

function showError() {
    weatherInfo.classList.add("hidden")
    errorMessage.classList.remove("hidden")
    
}
});