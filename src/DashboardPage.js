import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import DashboardToggleButtons from "./DashboardToggleButtons";
import GetAllPawns from "./activities/GetAllPawns";
import GetTotalPrincipal from "./activities/GetTotalPrincipal";

export default function DashboardPage() {
  const [chooseAggre, setChooseAggre] = useState("");


    let activity;

    if(chooseAggre == "getAllPawns"){
        activity = <GetAllPawns/>;
    }
    else if(chooseAggre == "getTotalPrincipal"){
        activity = <GetTotalPrincipal />;
    }
  return (
    <div>
      <div className="App">

      <DashboardToggleButtons 
        alignment={chooseAggre}
        setAlignment={setChooseAggre}
        />
      </div>
      {activity}

    </div>
    
  );
}
