import React from "react";
import TrendsChart from "../components/TrendsChart";

export default function Trends() {
  return (
    <div className="trends-page">
      <div className="trends-container">
        <h2 className="trends-title">📊 Weather Trends</h2>
        <div style={{ height: "350px" }}>
          <TrendsChart city="Lisbon" />
        </div>
      </div>
    </div>
  );
}
