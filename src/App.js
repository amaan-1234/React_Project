import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import Trends from "./pages/Trends";
import Planner from "./pages/Planner";
import Settings from "./pages/Settings";
import MapPage from "./pages/MapPage";
import "./styles.css";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-800">
        <header className="bg-white shadow p-6 flex flex-col items-center sm:flex-row sm:justify-between sm:items-center">
          <h1 className="app-title">
            <span className="icon">☀️</span>
            <span className="text">Weatherly</span>
            <span className="icon">☁️</span>
          </h1>

          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-lg">
            <NavLink
              to="/"
              className="hover:text-indigo-600 font-medium transition duration-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/trends"
              className="hover:text-indigo-600 font-medium transition duration-200"
            >
              Trends
            </NavLink>
            <NavLink
              to="/planner"
              className="hover:text-indigo-600 font-medium transition duration-200"
            >
              Planner
            </NavLink>
            <NavLink
              to="/map"
              className="hover:text-indigo-600 font-medium transition duration-200"
            >
              Map
            </NavLink>
            <NavLink
              to="/settings"
              className="hover:text-indigo-600 font-medium transition duration-200"
            >
              Settings
            </NavLink>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        <footer className="text-center text-sm text-gray-600 p-4">
          © {new Date().getFullYear()} Weatherly · Built in React
        </footer>
      </div>
    </Router>
  );
}
