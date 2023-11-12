import React from "react";
import "../App.css";
import PokemonInfoCard from "../component/PokemonInfoCard";
import pokemons from "../api/gen-1";

export default function PokedexLandingPage() {
    return (
        <div className="app">
            <header>
                <h2>Pokémon Database</h2>
                <h4>List of Pokémon</h4>
            </header>
            <main>
                {pokemons.map((element, idx) => (
                    <PokemonInfoCard key={idx} item={element} />
                ))}
            </main>
        </div>
    );
}
