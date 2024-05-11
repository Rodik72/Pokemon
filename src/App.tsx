import React, { useState } from "react";
import "./App.css";
import { Pokemon } from "./api/getPokemon";
import Homepage from "./components/homepage/Homepage";
import Arena from "./components/arena/Arena";

function App() {
  const [firstPokemon, setFirstPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  const [secondPokemon, setSecondPokemon] = useState<Pokemon | undefined>(
    undefined
  );
  return (
    <div className="App">
      {firstPokemon === undefined || secondPokemon === undefined ? (
        <Homepage
          firstPokemon={firstPokemon}
          setFirstPokemon={setFirstPokemon}
          secondPokemon={secondPokemon}
          setSecondPokemon={setSecondPokemon}
        />
      ) : (
        <Arena
          firstPokemon={firstPokemon}
          setFirstPokemon={setFirstPokemon}
          secondPokemon={secondPokemon}
          setSecondPokemon={setSecondPokemon}
        />
      )}
    </div>
  );
}

export default App;
