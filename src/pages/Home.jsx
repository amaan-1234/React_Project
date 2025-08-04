import React from "react";
import CityDashboard from "../components/CityDashboard";

const Home = () => {
  const cities = [
    "New York",
    "London",
    "Tokyo",
    "Delhi",
    "Chennai",
    "Reykjavík",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => (
        <CityDashboard key={city} city={city} />
      ))}
    </div>
  );
};

export default Home;
