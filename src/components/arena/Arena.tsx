import React, { useState, useEffect } from "react";
import selection from "../../assets/selection.png";
import { Pokemon } from "../../api/getPokemon";
import "../../css/arena.css";
import _ from "lodash";

const Arena: React.FC<{
  firstPokemon: Pokemon | undefined;
  setFirstPokemon: Function;
  secondPokemon: Pokemon | undefined;
  setSecondPokemon: Function;
}> = ({ firstPokemon, setFirstPokemon, secondPokemon, setSecondPokemon }) => {
  const [battleLogState, setBattleLogState] = useState<string[]>([]);

  const pokemonBattle = () => {
    let battleLog = [];
    let firstPokemonCpy = _.cloneDeep(firstPokemon);
    let secondPokemonCpy = _.cloneDeep(secondPokemon);
    if (
      secondPokemonCpy &&
      secondPokemonCpy?.stats &&
      firstPokemonCpy &&
      firstPokemonCpy?.stats &&
      firstPokemonCpy.stats.HP > 0 &&
      secondPokemonCpy.stats.HP > 0
    ) {
      if (
        firstPokemonCpy?.stats.attack <= secondPokemonCpy?.stats.defense &&
        secondPokemonCpy?.stats.attack <= firstPokemonCpy?.stats.defense
      ) {
        setBattleLogState(["It's a draw"]);
        return;
      }

      let whoPlay =
        firstPokemonCpy?.stats.speed > secondPokemonCpy?.stats.speed ? 1 : 2;
      while (
        firstPokemonCpy?.stats?.HP > 0 &&
        secondPokemonCpy?.stats?.HP > 0
      ) {
        if (whoPlay === 1) {
          secondPokemonCpy.stats.HP -=
            firstPokemonCpy.stats.attack - secondPokemonCpy.stats.defense;
          whoPlay = 2;
          battleLog.push(
            `${firstPokemonCpy.name} hit ${secondPokemonCpy.name} for ${
              firstPokemonCpy.stats.attack - secondPokemonCpy.stats.defense
            } of his HP and left him with ${secondPokemonCpy.stats.HP} HP`
          );
        } else {
          firstPokemonCpy.stats.HP -=
            secondPokemonCpy.stats.attack - firstPokemonCpy.stats.defense;
          battleLog.push(
            `${secondPokemonCpy.name} hit ${firstPokemonCpy.name} for ${
              secondPokemonCpy.stats.attack - firstPokemonCpy.stats.defense
            } of his HP and left him with ${firstPokemonCpy.stats.HP} HP`
          );
          whoPlay = 1;
        }
      }
      if (firstPokemonCpy.stats.HP <= 0)
        battleLog.push(`${secondPokemonCpy.name} won the fight`);
      else battleLog.push(`${firstPokemonCpy.name} won the fight`);
      setBattleLogState(battleLog);
    }
  };

  useEffect(() => {
    pokemonBattle();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <img
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          width: "100px",
          cursor: "pointer",
        }}
        alt={"selection"}
        onClick={() => {
          setFirstPokemon(undefined);
          setSecondPokemon(undefined);
        }}
        src={selection}
      />
      <div className="arena">
        <img
          style={{
            position: "absolute",
            top: "50px",
            width: "250px",
            right: "10%",
          }}
          alt={"secondPokemon"}
          src={secondPokemon?.image}
        />
        <img
          style={{
            position: "absolute",
            bottom: "40px",
            width: "250px",
            left: "10%",
          }}
          alt={"firstPokemon"}
          src={firstPokemon?.image}
        />
        <div className="battle-box">
          {battleLogState.map((text, id) => {
            return (
              <p key={id} className="battle-text">
                {text}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Arena;
