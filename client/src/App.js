import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import ListBody from "antd/lib/transfer/ListBody";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedData, setSelectedData] = useState({
    name: "",
    age: 0,
    country: "",
    position: "",
    wage: 0,
  });

  const showModal = (val) => {
    setIsModalVisible(true);
    setSelectedData({
      name: val.name,
      age: val.age,
      country: val.country,
      position: val.position,
      wage: val.wage,
    });

    setNewName(val.name);
    setNewAge(val.age);
    setNewCountry(val.country);
    setNewPosition(val.position);
    setNewWage(val.wage);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const editEmployees = (id) => {
    axios
      .put("http://localhost:3001/edit", {
        name: newName,
        age: newAge,
        country: newCountry,
        position: newPosition,
        wage: newWage,
        id: id,
      })
      .then((response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: newName,
                  country: newCountry,
                  position: newPosition,
                  wage: newWage,
                }
              : val;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOk = (id) => {
    setIsModalVisible(false);
    editEmployees(id);
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
            <th></th>
          </tr>

          {employeeList.map((val, key) => {
            return (
              <tr className="employee-info">
                <td id="name">{val.name} </td>
                <td id="age">{val.age} </td>
                <td id="country">{val.country}</td>
                <td id="position">{val.position}</td>
                <td id="wage">{val.wage}</td>
                <td></td>
                <button
                  className="edit-employee"
                  id={key}
                  onClick={() => showModal(val)}
                >
                  Edit
                </button>

                <Modal
                  title="Basic Modal"
                  visible={isModalVisible}
                  onOk={() => handleOk(val.id)}
                  onCancel={handleCancel}
                  okText="Accept"
                >
                  <label>Name:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewName(e.target.value);
                    }}
                    defaultValue={selectedData.name}
                  ></input>

                  <label>Age:</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setNewAge(e.target.value);
                    }}
                    defaultValue={selectedData.age}
                  ></input>

                  <label>Country:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewCountry(e.target.value);
                    }}
                    defaultValue={selectedData.country}
                  ></input>

                  <label>Position:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewPosition(e.target.value);
                    }}
                    defaultValue={selectedData.position}
                  ></input>

                  <label>Wage (year):</label>
                  <input
                    type="number"
                    onChange={(e) => {
                      setNewWage(e.target.value);
                    }}
                    defaultValue={selectedData.wage}
                  ></input>
                </Modal>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default App;

{
}
