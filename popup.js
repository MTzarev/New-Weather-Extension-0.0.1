const apiKey = "4f315275c38e39722e4182777585d949";
const apiURL = "https://api.openweathermap.org/data/2.5/weather";

function getWeather(city) {
    fetch(`${apiURL}?q=${city}&appid=${apiKey}&units=metric&lang=bg`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message); // Проверяваме дали API връща грешка
            }
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const weatherIconCode = data.weather[0].icon;
            const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

            const weatherInfo = `${city}<br>Температура в момента: ${temp}°C<br>Информация: ${description}`;

            document.getElementById("weather-info").innerHTML = weatherInfo;

            // Създаваме и добавяме иконата
            const image = document.createElement("img");
            image.src = weatherIconUrl;
            image.alt = description;
            document.getElementById("weather-info").appendChild(image);
        })
        .catch(error => {
            document.getElementById("weather-info").textContent = "Грешка: " + error.message;
            console.error("Грешка при зареждане на данните:", error);
        });
}

// Функция за обработка на натискане на бутона
document.getElementById("get-weather-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    if (city) {
        getWeather(city);
    } else {
        document.getElementById("weather-info").textContent = "Моля, въведете град!";
    }
});

// Зареждане на прогнозата за последно търсения град (ако има)
document.addEventListener("DOMContentLoaded", () => {
    getWeather("Sofia"); // По подразбиране - София
});
