import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";
import ColorToggleButton from "./ToggleButton";

export default function ControlPage() {
  const [id, setId] = useState("");
  const [weight, setWeight] = useState("");
  const [principal, setPrincipal] = useState("");
  const [insertDate, setInsertDate] = useState("");
  const [message, setMessage] = useState("");
  const [isAdd, setAdd] = useState("add");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let handleDelSubmit = async (e) => {
    
    e.preventDefault();
        try{
        let res = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/pawns/del",
          "POST",
          JSON.stringify({
            id: id
          }),
          {
            "Content-Type": "application/json",
          }
        );
        
        console.log(res);
        setId("");
        setPrincipal("");
        setInsertDate("");
        setMessage("Pawn Deleted successfully");
      } catch (err) {
        
        setMessage("Some error occured");
        console.log(err);
      }
  };


  let handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("hi");
      console.log(`${process.env.REACT_APP_BACKEND_URL}` + "/api/pawns/add");

      console.log(JSON.stringify({
        id: id,
        principal: principal,
        insertDate: insertDate,
        weight: weight
      }));
      
      let res = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/pawns/add",
        "POST",
        JSON.stringify({
          id: id,
          principal: principal,
          insertDate: insertDate,
          weight: weight
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setId("");
      setPrincipal("");
      setInsertDate("");
      setMessage("Pawn added successfully");
    } catch (err) {
      
      setMessage("Some error occured");
      console.log(err);
    }
  };

  let form;
  if(isAdd  == "add") {
    form = (
        <form onSubmit={handleSubmit} >
      <input
        type="text"
        value={id}
        placeholder="Id"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        value={principal}
        placeholder="Principal Amount"
        onChange={(e) => setPrincipal(e.target.value)}
      />
      <input
        type="text"
        value={insertDate}
        placeholder="Date Added"
        onChange={(e) => setInsertDate(e.target.value)}
      />
      <input
        type="text"
        value={weight}
        placeholder="weight"
        onChange={(e) => setWeight(e.target.value)}
      />

      <button type="submit">Add Pawn</button>

      <div className="message">{message ? <p>{message}</p> : null}</div>
    </form>);
  }
  else {
    form = (
      <form onSubmit={handleDelSubmit} >
    <input
      type="text"
      value={id}
      placeholder="Id"
      onChange={(e) => setId(e.target.value)}
    />
    

    <button type="submit">Delete Pawn</button>

    <div className="message">{message ? <p>{message}</p> : null}</div>
  </form>);
  }

  return (
    <div>
      <div className="App">

      <ColorToggleButton alignment={isAdd}
      setAlignment={setAdd}
      setMessage={setMessage}/>
      </div>
      <div className="App">
      {form}
    </div>
    </div>
    
  );
}

