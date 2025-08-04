import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const CityDashboard = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
        const geoRes = await axios.get(geoUrl);
        const location = geoRes.data.results?.[0];

        if (!location) throw new Error("City not found");

        const { latitude, longitude } = location;
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&timezone=auto`;
        const weatherRes = await axios.get(weatherUrl);

        setWeather({
          city: location.name,
          country: location.country,
          temp: weatherRes.data.current.temperature_2m,
          wind: weatherRes.data.current.wind_speed_10m,
          code: weatherRes.data.current.weather_code,
        });
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const weatherDescriptions = {
    0: "☀️ Clear Sky",
    1: "🌤️ Mostly Clear",
    2: "⛅ Partly Cloudy",
    3: "☁️ Overcast",
    45: "🌫️ Fog",
    51: "🌦️ Light Drizzle",
    61: "🌧️ Rain",
    71: "❄️ Snow",
    95: "⛈️ Thunderstorm",
  };

  if (loading) return <div className="weather-card">Loading {city}...</div>;
  if (error) return <div className="weather-card">{error}</div>;

  return (
    <div className="weather-card">
      <h3>
        {weather.city}, <span className="country">{weather.country}</span>
      </h3>
      <div className="temp">{weather.temp.toFixed(1)}°C</div>
      <div className="condition">
        {weatherDescriptions[weather.code] || "🌡️ Unknown"}
      </div>
      <div className="wind">💨 {weather.wind} km/h wind</div>
    </div>
  );
};

export default CityDashboard;
