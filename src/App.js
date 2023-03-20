import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [munros, setMunros] = useState();
  const [munro, setMunro] = useState();
  const [id, setId] = useState();

  const getMunros = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/munros");
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
      {munro && (
        <div>
          <h1>{munro.name}</h1>
          <p>{munro.weather}</p>
          <p>{munro.height}</p>
        </div>
      )}
    </div>
  );
}

export default App;
