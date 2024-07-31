document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '06318bc5095b069287b1a040dd168011';
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const cityName = document.getElementById('cityName');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weatherIcon');
    const forecastIcon1 = document.getElementById('forecastIcon1');
    const forecastTemp1 = document.getElementById('forecastTemp1');
    const forecastIcon2 = document.getElementById('forecastIcon2');
    const forecastTemp2 = document.getElementById('forecastTemp2');
  
    const setBackground = (weatherId) => {
      document.body.className = ''; // Reset previous classes
  
      if (weatherId >= 200 && weatherId < 300) {
        // Thunderstorm
        document.body.classList.add('stormy');
      } else if (weatherId >= 300 && weatherId < 500) {
        // Drizzle
        document.body.classList.add('rainy');
      } else if (weatherId >= 500 && weatherId < 600) {
        // Rain
        document.body.classList.add('rainy');
      } else if (weatherId >= 600 && weatherId < 700) {
        // Snow
        document.body.classList.add('snowy');
      } else if (weatherId >= 700 && weatherId < 800) {
        // Atmosphere (fog, mist, etc.)
        document.body.classList.add('foggy');
      } else if (weatherId === 800) {
        // Clear
        document.body.classList.add('sunny');
      } else if (weatherId > 800) {
        // Clouds
        document.body.classList.add('cloudy');
      }
    };
  
    const getWeather = async (city) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
          cityName.textContent = data.name;
          description.textContent = data.weather[0].description;
          temperature.textContent = `${Math.round(data.main.temp)}°C`;
          weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">`;
  
          // Set background according to the weather
          setBackground(data.weather[0].id);
  
          // Get forecast
          getForecast(data.coord.lat, data.coord.lon);
        } else {
          alert('City not found. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
      }
    };
  
    const getForecast = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
  
        if (data.cod === '200') {
          // Tomorrow's forecast
          const tomorrow = data.list[8]; // 24 hours later (3-hourly forecasts)
          forecastTemp1.textContent = `${Math.round(tomorrow.main.temp)}°C`;
          forecastIcon1.innerHTML = `<img src="http://openweathermap.org/img/wn/${tomorrow.weather[0].icon}.png" alt="Weather icon">`;
  
          // Day after tomorrow's forecast
          const dayAfterTomorrow = data.list[16]; // 48 hours later
          forecastTemp2.textContent = `${Math.round(dayAfterTomorrow.main.temp)}°C`;
          forecastIcon2.innerHTML = `<img src="http://openweathermap.org/img/wn/${dayAfterTomorrow.weather[0].icon}.png" alt="Weather icon">`;
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };
  
    searchButton.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
        getWeather(city);
      }
    });
  
    // Example default city
    getWeather('Варна');
  });
  