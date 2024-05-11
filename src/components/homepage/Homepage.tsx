import React, { useState, useEffect } from "react";
import getPokemon, { Pokemon } from "../../api/getPokemon";
import "../../css/homepage.css";
import selectYourPokemon from "../../assets/selectYourPokemon.png";
import FilterByType from "./FilterByType";

const Homepage: React.FC<{
  firstPokemon: Pokemon | undefined;
  setFirstPokemon: Function;
  secondPokemon: Pokemon | undefined;
  setSecondPokemon: Function;
}> = ({ firstPokemon, setFirstPokemon, secondPokemon, setSecondPokemon }) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonData = await getPokemon();
      setPokemons(pokemonData);
    };
    fetchPokemons();
  }, []);

  return (
    <>
      <img
        style={{ maxWidth: "50%" }}
        alt={"selectPokemon"}
        src={selectYourPokemon}
      />
      <div>
        <input
          placeholder="Search by name"
          onChange={(event) => setNameFilter(event.target.value)}
        />
        <FilterByType
          typeFilters={typeFilters}
          setTypeFilters={setTypeFilters}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {pokemons &&
          pokemons.map((pokemon: Pokemon, id) => {
            if (pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()))
              if (
                typeFilters.length === 0 ||
                (typeFilters &&
                  pokemon.apiTypes.some((item: { name: string }) =>
                    typeFilters.includes(item.name)
                  ))
              )
                return (
                  <div
                    key={id}
                    className="pokemon-grid-card"
                    onClick={() => {
                      if (!firstPokemon) setFirstPokemon(pokemon);
                      else if (pokemon.name === firstPokemon.name)
                        setFirstPokemon(undefined);
                      else setSecondPokemon(pokemon);
                    }}
                    style={{
                      borderColor:
                        pokemon.name === firstPokemon?.name
                          ? "#f6c908"
                          : "#356abc",
                    }}
                  >
                    <img
                      style={{
                        width: "60px",
                      }}
                      alt={"pokemon"}
                      src={pokemon.image}
                    />
                    <p className="text-stats">
                      HP: {pokemon.stats.HP} ATK: {pokemon.stats.attack}
                    </p>
                    <p className="text-stats">
                      DEF: {pokemon.stats.defense} SPD: {pokemon.stats.speed}
                    </p>
                  </div>
                );
            return null;
          })}
      </div>
    </>
  );
};

export default Homepage;
