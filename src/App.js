import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [munros, setMunros] = useState();
  const [munro, setMunro] = useState();
  const [id, setId] = useState();
  const [weather, setWeather] = useState();
  const [name, setName] = useState();
  const [height, setHeight] = useState();

  const clearMunro = () => {
    setMunro("");
  };

  const getMunros = async () => {
    try {
      const response = await axios.get(
        "http://ec2-13-50-109-239.eu-north-1.compute.amazonaws.com:8080/api/v1/munros"
      );
      {
        console.log(response);
      }

      setMunros(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleMurno = async (e) => {
    e.preventDefault();
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/munros/${id}`
      );

      const singleMunro = response.data;

      setMunro(singleMunro);
      console.log(singleMunro);
    } catch (error) {
      console.error(error);
    }
  };

  const getByWeather = async (e) => {
    e.preventDefault();
    console.log(weather);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/munros/weather/${weather}`
      );

      const singleMunro = response.data;

      setMunro(singleMunro);
      console.log(singleMunro);
    } catch (error) {
      console.error(error);
    }
  };

  const addMunro = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/munros/add",
        { name, height, weather }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <table>
        <tr>
          <th>Munro Name</th>
          <th>Weather</th>
          <th>Height</th>
        </tr>
        {munros ? (
          munros.map((munro) => (
            <tr key={munro.id}>
              <td>{munro.name}</td>
              <td>{munro.weather}</td>
              <td>{munro.height}</td>
            </tr>
          ))
        ) : (
          <p>No Munros found</p>
        )}
      </table>
      <button onClick={getMunros}>Get Munros</button>

      <form>
        <label>
          Id: <input type="text" onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="submit" onClick={(e) => getSingleMurno(e)}>
          {" "}
          Get by Id{" "}
        </button>
      </form>
      <form>
        <label>
          weather:{" "}
          <input type="text" onChange={(e) => setWeather(e.target.value)} />
        </label>
        <button type="submit" onClick={(e) => getByWeather(e)}>
          {" "}
          Get by weather{" "}
        </button>
      </form>
      <table>
        <tr>
          <th>Munro Name</th>
          <th>Weather</th>
          <th>Height</th>
        </tr>
        {munro &&
          munro.map((munro) => (
            <tr>
              <td>{munro.name}</td>
              <td>{munro.weather}</td>
              <td>{munro.height}</td>
            </tr>
          ))}
      </table>
      <button onClick={clearMunro}>Clear Munro</button>

      <form>
        <h2>add Munro</h2>
        <label>
          name: <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          height:{" "}
          <input type="number" onChange={(e) => setHeight(e.target.value)} />
        </label>
        <label>
          weather:{" "}
          <input type="text" onChange={(e) => setWeather(e.target.value)} />
        </label>
        <button type="submit" onClick={(e) => addMunro(e)}>
          {" "}
          Create Munro
        </button>
      </form>
    </div>
  );
}

export default App;
