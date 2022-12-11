import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes
} from 'react-router-dom';
import LandingPage from "./LandingPage";
import ControlPage from "./ControlPage";
import DashboardPage from "./DashboardPage";
import StockPage from "./StockPage";
function App() {

  return (
    // <div>
    //   App
    // </div>
    // <ControlPage />
    <Router>
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/dash" element={<DashboardPage />} />
        <Route path="/control" element={<ControlPage />} />
        <Route path="/stock" element={<StockPage />} />

      </Routes>
    </Router>
  );
}

export default App;
