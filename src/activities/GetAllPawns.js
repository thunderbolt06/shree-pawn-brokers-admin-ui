
import { useState } from "react";
import { useAsyncValue } from "react-router-dom";
import { useHttpClient } from "../http-hook";
import "../App.css";
import BasicTable from "./BasicTable";

export default function GetAllPawns() {

    const [message, setMessage] = useState("");

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    let handleSubmit = async (e) => {

        try{
            let res = await sendRequest(
              process.env.REACT_APP_BACKEND_URL + "/api/pawns/getall",
              "GET",
              null,
              {
                "Content-Type": "application/json",
              }
            );
            console.log("Get all pawns");
            console.log(res.pawns[0]);
            console.log(typeof res.pawns);
            setMessage(res.pawns);    
        }catch (err) {
            
            setMessage("Some error occured");
            console.log(err);
          };
      
    };
  return (
    <div className="App">
        
      <button type="submit" onClick={handleSubmit}>Check total</button>

        {message ? <BasicTable row={message} />: null};
      {/* <div className="message">{message ? <p>{message}</p> : null}</div> */}
    </div>

    
  );
}
