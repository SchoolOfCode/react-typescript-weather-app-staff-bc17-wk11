import React, { useState } from 'react';
import myImage1 from './images/Dileep1.jpg';
import myImage2 from './images/Dileep2.jpg';
import myImage3 from './images/Dileep3.jpg';

interface WeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const apiKey = '49b4d2b86819a6ff4445750c90771072';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState('');

  const getWeather = async (city: string) => {
    try {
      const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
      const data: WeatherResponse = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setError('City not found! Please enter a valid city.');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      getWeather(city);
    }
  };

  return (
    <div>
      <h1>🕺B-tec Faisal's Weather App😎</h1>
      <p>Sawubona my friend...👀</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        <img src={myImage1} alt="Weather Icon" className='image'/>
        <img src={myImage2} alt="Weather Icon" className='image'/>
        <img src={myImage3} alt="Weather Icon" className='image'/>
      </form>

      {weatherData && (
        <div>
          <h2>Current weather in {weatherData.name}</h2>
          <p>{weatherData.main.temp}°C, {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Weather;
