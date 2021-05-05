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
      <div className="divider"></div>
      <div className="information">
        <h2>Add Employee</h2>
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

      <div className="list">
        <h2>Employee List</h2>
        <table className="employee-table">
          <tr className="row-title">
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Position</th>
            <th>Wage</th>
          </tr>
          {employeeList.map((val, key) => {
            return (
              <tr className="employee-info">
                <td id="name">{val.name}</td>
                <td id="age">{val.age}</td>
                <td id="country">{val.country}</td>
                <td id="position">{val.position}</td>
                <td id="wage">{val.wage}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default App;
