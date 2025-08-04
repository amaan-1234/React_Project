import React from "react";

const Recommendations = ({ temp, wind, uv = 4 }) => {
  const clothing =
    temp > 30
      ? "Light T-shirt and shorts"
      : temp > 20
      ? "T-shirt and jeans"
      : temp > 10
      ? "Sweater or light jacket"
      : "Coat and warm layers";

  const activity =
    uv > 7
      ? "Indoor activities recommended (high UV)"
      : wind > 20
      ? "Avoid biking or running (windy)"
      : temp > 15
      ? "Perfect for jogging or a walk"
      : "Try a museum or cafe visit";

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-2">🧥 Recommendations</h2>
      <p>
        <strong>Clothing:</strong> {clothing}
      </p>
      <p>
        <strong>Activity:</strong> {activity}
      </p>
    </div>
  );
};

export default Recommendations;
