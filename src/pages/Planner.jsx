import React, { useEffect, useState } from "react";

const cities = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5072, lon: -0.1276 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Reykjavik", lat: 64.1355, lon: -21.8954 },
];

const getRecommendations = (temp, condition, wind) => {
  let clothing = "";
  let activity = "";

  if (temp >= 30) clothing = "T-shirt and shorts";
  else if (temp >= 20) clothing = "T-shirt and jeans";
  else if (temp >= 10) clothing = "Sweater or light jacket";
  else clothing = "Warm coat and thermal wear";

  if (condition.includes("rain"))
    activity = "Stay indoors or carry an umbrella";
  else if (wind > 15) activity = "Avoid biking or running (windy)";
  else if (temp >= 30)
    activity = "Avoid strenuous outdoor activities (too hot)";
  else activity = "Perfect for jogging or a walk";

  return { clothing, activity };
};

export default function Planner() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const promises = cities.map(async (city) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weathercode,windspeed_10m&timezone=auto`;

        const res = await fetch(url);
        const data = await res.json();

        const temp = data.current.temperature_2m;
        const wind = data.current.windspeed_10m;
        const weatherCode = data.current.weathercode;

        const condition = weatherCodeToText(weatherCode); // Translate weather code to text

        return {
          city: city.name,
          country: "", // Add country if needed
          temp,
          wind,
          condition,
        };
      });

      const results = await Promise.all(promises);
      setWeatherData(results);
    };

    fetchWeatherData();
  }, []);

  const weatherCodeToText = (code) => {
    const codes = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing Rime Fog",
      51: "Light Drizzle",
      61: "Light Rain",
      71: "Light Snow",
      80: "Rain Showers",
      95: "Thunderstorm",
      // Add more as needed
    };
    return codes[code] || "Unknown";
  };

  return (
    <div className="page">
      <h2>🌤️ Real-Time Activity Planner</h2>
      {weatherData.length === 0 ? (
        <p>Loading weather data...</p>
      ) : (
        weatherData.map((city, index) => {
          const { clothing, activity } = getRecommendations(
            city.temp,
            city.condition,
            city.wind
          );

          return (
            <div key={index} className="recommendation-card">
              <h3>{city.city}</h3>
              <p>
                <strong>Temperature:</strong> {city.temp}°C
              </p>
              <p>
                <strong>Condition:</strong> {city.condition}
              </p>
              <p>
                <strong>Wind:</strong> {city.wind} km/h
              </p>
              <p>
                🧥 <strong>Clothing:</strong> {clothing}
              </p>
              <p>
                🏃 <strong>Activity:</strong> {activity}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
