const apiKey = "4f315275c38e39722e4182777585d949";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const city = "Burgas";

function getWeather (){
    fetch(`${apiURL}?q=${city}&appid=${apiKey}&units=metric&lang=bg`)
    .then(res => res.json())
    .then(data=>{
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const weatherIconCode = data.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
        const weatherInfo = `${city}\n Температура в момента: ${temp}\n Информация: ${description}`;
        document.getElementById('weather-info').textContent=weatherInfo;
    
    const weatherIconImg = document.createElement('img');
    weatherIconImg.src = weatherIconUrl;
    weatherIconImg.ald=description;
    document.getElementById('weather-info').appendChild(weatherIconImg);
    })
    .catch (error => {
        document.getElementById('weather-info').textContent =
        "Няма актуална информация"
    });
}
document.addEventListener("DOMContentLoaded", getWeather);