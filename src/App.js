import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";
import React, { Component }  from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes
} from 'react-router-dom';
import LandingPage from "./LandingPage";
// import ControlPage from "./ControlPage";
// import DashboardPage from "./DashboardPage";
import StockPage from "./StockPage";
import ChangelogPage from "./ChangelogPage";
function App() {

  return (
    // <div>
    //   App
    // </div>
    // <ControlPage />
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        {/* <Route path="/dash" element={<DashboardPage />} /> */}
        {/* <Route path="/control" element={<ControlPage />} /> */}
        <Route path="/stock" element={<StockPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />

      </Routes>
    </Router>
  );
}

export default App;