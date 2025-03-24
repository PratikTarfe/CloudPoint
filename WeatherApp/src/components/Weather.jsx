import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const Weather = () => {

  const inputRef=useRef()

  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,



  }

  const search = async (city) => {
    if (city==="") {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2a633fc6c72e0292d46cd78a4c184190`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }

  }
  useEffect(() => {
    search("London");
  }, [])

  return (
    <div className="weather">
      {/* Search bar */}
      <div className="Search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="Search Icon" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<> {/* Weather Icon */}
      <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />

      {/* Temperature */}
      <p className="temperature" style={{ color: 'white' }}>{weatherData.temperature}°C</p>

      {/* Location */}
      <p className="location">{weatherData.location}</p>

      {/* Weather Data */}
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Icon" />
          <div>
            <p>{weatherData.windSpeed}km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div></>:<></>}
     
    </div>
  );
};

export default Weather;
