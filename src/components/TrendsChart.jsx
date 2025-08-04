import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendsChart = ({ city }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geoRes = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const location = geoRes.data.results?.[0];
        if (!location) throw new Error("Location not found");

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 7);

        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${
          location.latitude
        }&longitude=${location.longitude}&start_date=${
          start.toISOString().split("T")[0]
        }&end_date=${
          end.toISOString().split("T")[0]
        }&daily=temperature_2m_max&timezone=auto`;

        const res = await axios.get(url);
        const labels = res.data.daily.time;
        const temps = res.data.daily.temperature_2m_max;
        setData({ labels, temps });
      } catch (error) {
        console.error("Failed to fetch trend data:", error);
      }
    };

    fetchData();
  }, [city]);

  if (!data)
    return (
      <div className="text-center text-sm text-gray-500">Loading chart...</div>
    );

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: `Max Temp (°C) in ${city}`,
        data: data.temps,
        fill: true,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 12,
          font: {
            size: 13,
            weight: "bold",
          },
          color: "#374151", // slate-700
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "#374151",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
          maxRotation: 45,
          minRotation: 0,
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Temperature (°C)",
          color: "#374151",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-inner border border-gray-100">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        📈 7-Day Temperature Trend - {city}
      </h2>
      <div style={{ height: "250px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default TrendsChart;
