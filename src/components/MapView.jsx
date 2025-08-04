import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapView = ({ cities }) => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {cities?.map(
          ({ name, lat, lon, temperature, description, icon }, idx) => {
            const iconCode =
              icon && typeof icon === "string" ? icon.trim() : null;

            const weatherIconUrl = iconCode
              ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
              : "https://via.placeholder.com/50";

            return (
              <Marker key={idx} position={[lat, lon]}>
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    {iconCode ? (
                      <img
                        src={weatherIconUrl}
                        alt={description || "Weather icon"}
                        width="50"
                        height="50"
                        style={{ marginBottom: "5px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/50";
                        }}
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/50"
                        alt="No weather icon"
                        width="50"
                        height="50"
                        style={{ marginBottom: "5px" }}
                      />
                    )}
                    <h3 style={{ margin: 0 }}>{name}</h3>
                    <p style={{ margin: 0 }}>
                      {temperature !== undefined ? `${temperature}°C` : "–"}{" "}
                      {description ? `– ${description}` : ""}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          }
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
