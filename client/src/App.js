import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmployees = () => {
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setEmployeeList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEmployees();
  });

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>

        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></input>

        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        ></input>

        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        ></input>

        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        ></input>

        <button onClick={addEmployee}>Add Employee</button>

        {/* <button onClick={getEmployees}> Show Employees</button> */}
      </div>

      <div className="employee-list">
        {employeeList.map((val, key) => {
          return (
            <div className="list">
              <h4 id="name">{val.name} </h4>
              <h4 id="age">{val.age}</h4>
              <h4 id="country">{val.country}</h4>
              <h4 id="position">{val.position}</h4>
              <h4 id="wage">{val.wage}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
