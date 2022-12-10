import "./App.css";
import { useState } from "react";
import { useHttpClient } from "./http-hook";

function App() {
  const [id, setId] = useState("");
  const [weight, setWeight] = useState("");
  const [principal, setPrincipal] = useState("");
  const [insertDate, setInsertDate] = useState("");
  const [message, setMessage] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(JSON.stringify({
        id: id,
        principal: principal,
        insertDate: insertDate,
        weight: weight
      }));
      
      let res = await sendRequest(
        `http://localhost:5000/api/pawns/add`,
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
      // let res = await fetch("http://localhost:5000/api/pawns/add", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     id: id,
      //     principal: principal,
      //     insertDate: insertDate,
      //     weight: weight
      //   }),
      // });
      console.log(res);
      // let resJson = await res.json();
      setId("");
      setPrincipal("");
      setInsertDate("");
      setMessage("Pawn added successfully");
    } catch (err) {
      
      setMessage("Some error occured");
      console.log(err);
    }
  };

  return (
    <div className="App">
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

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
