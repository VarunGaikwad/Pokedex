import React from "react";
import "./PokedexLandingPage.css";
import PokemonInfoCard from "../component/PokemonInfoCard";
import pokemons from "../api/pokemon-list";

export default function PokedexLandingPage() {

    return (
        <div className="pokedex">
            <header className="pokedex__header">
                <h2>Pokémon Database</h2>
                <h4>List of Pokémon</h4>
            </header>
            <main className="pokedex__main">
                {pokemons.map((element, idx) => (
                    <PokemonInfoCard key={idx} item={element} />
                ))}
            </main>
        </div>
    );
}
