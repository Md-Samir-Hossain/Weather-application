let searchValue = document.getElementById("searchValue");
let city = document.getElementById("city");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let humidity = document.getElementById("humidity");
let cloud = document.getElementById("cloud");
let wind = document.getElementById("wind");
let form = document.querySelector("form");
let main = document.querySelector('main');
const apiKey ="7eaa2db21e256be7b1bed30010ce00cc"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}   This is the original demo
// link to fetch weather data by city name.

form.addEventListener("submit",(e) => {
    e.preventDefault()
    if(searchValue != ''){
        checkWeather();
    }
})

async function checkWeather() {
    const response = await fetch(apiUrl + searchValue.value + `&appid=${apiKey}`);
    let data = await response.json()
    console.log(data);
    if(data.cod == 200){
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector("figcaption span").innerHTML = Math.round(data.main.temp);
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = data.main.humidity;
        cloud.innerHTML = data.clouds.all;
        wind.innerHTML = data.wind.speed;
    }else{
        main.classList.add('error');
        setTimeout(()=>{
            main.classList.remove('error');
        },1000)
    }
    searchValue.value = '';
}

const initialWeather = ()=>{
    searchValue.value = 'Malda';
    checkWeather();
}
initialWeather();