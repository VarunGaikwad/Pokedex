import React from "react";
import "../App.css";

export default function PokemonInfoCard({ item }) {
  const { name, id, types } = item,
    pokemon = capitalization(name);

  return (
    <div className="pokemon__tile">
      <span>
        <a href={`/pokemon/${name}`}>
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/2x/${name}.jpg`}
            alt={pokemon}
            loading="lazy"
          />
        </a>
      </span>
      <span className="pokemon__tile__info">
        <small>#{createDexNumber(String(id))}</small>
        <span className="pokemon__tile__info__name">
          <a href={`/pokemon/${name}`}>
            {pokemon}
          </a>
        </span>
        <small className="pokemon__tile__info__type">
          {types.map((ele, idx) => (
            <span className={`${ele.type.name}`} key={idx}>
              {capitalization(ele.type.name)}
            </span>
          ))}
        </small>
      </span>
    </div>
  );
}

function createDexNumber(num) {
  while (num.length < 4) {
    num = "0" + num;
  }
  return num;
}

function capitalization(value) {
  return `${value[0].toUpperCase()}${value.substring(1)}`;
}
