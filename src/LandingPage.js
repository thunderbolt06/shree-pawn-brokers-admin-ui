import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function LandingPage() {
    
	return <div className="App">
        <Link to="/stock">
					<Button variant="contained" onClick={true} color="secondary">
                    Welcome To Shree Traders
					</Button>
				</Link>
    </div>;
}
