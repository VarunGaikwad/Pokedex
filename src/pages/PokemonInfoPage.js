import React from "react";
import { useLocation } from "react-router-dom";
import "./PokemonInfoPage.css";

export default function PokemonInfoPage() {
  const { state } = useLocation(),
    { name } = state;

  return (
    <div className="infopage">
      <header className="infopage__header">
        <h2>{capitalization(name)}</h2>
      </header>
      <main className="infopage__main">Varun</main>
    </div>
  );
}

function capitalization(value) {
  return `${value[0].toUpperCase()}${value.substring(1)}`;
}
