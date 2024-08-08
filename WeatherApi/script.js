const apiKey = "82e3945cd6feaf59a2e74eb27389b037"; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      weatherInfo.innerHTML = "City not found";
      return;
    }

    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const cityName = data.name;

    weatherInfo.innerHTML = `
            <h2>Weather in ${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;
  } catch (error) {
    weatherInfo.innerHTML = "Error fetching weather data";
    console.error(error);
  }
}
