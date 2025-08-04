import React from "react";
import MapView from "../components/MapView";

export default function MapPage() {
  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.006 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🗺️ Weather Map</h2>
      <MapView cities={cities} />
    </div>
  );
}
