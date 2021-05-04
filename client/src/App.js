import './App.css';
import {useState} from "react";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);


  return (
    <div className="App">

      <div className="information">

      <label>Name:</label>
      <input type="text" onChange={(e)=>{setName(e.target.value)}}></input>

      <label>Age:</label>
      <input type="number" onChange={(e)=>{setAge(e.target.value)}}></input>

      <label>Country:</label>
      <input type="text" onChange={(e)=>{setCountry(e.target.value)}}></input>

      <label>Position:</label>
      <input type="text" onChange={(e)=>{setPosition(e.target.value)}}></input>

      <label>Wage (year):</label>
      <input type="number" onChange={(e)=>{setWage(e.target.value)}}></input>

      <button>Add Employee</button>
      </div>


    </div>
  );
}

export default App;
