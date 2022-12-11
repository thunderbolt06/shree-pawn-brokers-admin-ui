import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";
import { Card } from "@mui/material";
import {CardContent} from "@mui/material";
import {Typography} from "@mui/material";
import BasicTable from "./BasicTable";

export default function StockPage() {

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3)
  ];
  return (
    <div >

      <div className="App">

      <Card>
        <CardContent>
              Welcome To Shree Traders
        </CardContent>
      </Card>
    </div>
    <div className="App">
    <BasicTable rows={[1,2,3]} />
    </div>
    </div>
    
  );
}

