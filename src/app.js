function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours =`0${hours}`
        }
    let minutes = date.getMinutes();
    if (minutes < 10){
    minutes =`0${minutes}`
    }
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}
function displayForecast(){
    let foreastElement = document.querySelector('#forecast');
    let forecastHTML = `<div class="row">`;
    let days = ['Thu', 'Fri','Sat','Sun','Mon','Tue',];
    days.forEach(function(day){
        forecastHTML +=`
        <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"  alt="" width="50
            ">
            <span class="weather-forecast-temperature-max">18°</span>
            <span class="weather-forecast-temperature-min">12°</span>
        </div>
    `;
    })
   
forecastHTML =forecastHTML + `</div>`;
    foreastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}
function displayTemperature(response)
{
    let temperatureElement = document.querySelector('#temperature');
    let cityElement = document.querySelector('#city');
    let descriptionElement = document.querySelector('#description');
    let humidityElement = document.querySelector('#humidity');
    let windElement = document.querySelector('#wind');
    let dateElement = document.querySelector('#date');
    let iconElement = document.querySelector('#icon');

    celciusTemperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconElement.setAttribute('src',`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
    iconElement.setAttribute('alt',response.data.condition.description)
    
    
}
function search(city){
let apiKey ='9b83e8ad2ddeet40240oc805fd6709a7';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event){
event.preventDefault();
let inputCityElement = document.querySelector('#city-input');
search(inputCityElement.value);
}
function displayFahrenheitTemperature(event){
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 9 )/5 + 32;
    let temperatureElement=document.querySelector('#temperature');
    celciusElement.classList.remove('active');
    fahrenheitElement.classList.add('active');   
    temperatureElement.innerHTML =Math.round(fahrenheitTemperature);   
}
function displayCelciusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector('#temperature');
    temperatureElement.innerHTML =Math.round(celciusTemperature);
    fahrenheitElement.classList.remove('active');
    celciusElement.classList.add('active');   
}
celciusTemperature = null;


let form = document.querySelector('#search-form');
form.addEventListener("submit",handleSubmit);

let fahrenheitElement = document.querySelector('#fahrenheit-link');
fahrenheitElement.addEventListener('click',displayFahrenheitTemperature);

let celciusElement = document.querySelector('#celcius-link');
celciusElement.addEventListener('click',displayCelciusTemperature);

search('Paris');
displayForecast();