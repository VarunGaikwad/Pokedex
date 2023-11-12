import React from "react";
import { useLocation } from "react-router-dom";
import "./PokemonInfoPage.css";

export default function PokemonInfoPage() {
    const { state } = useLocation();

    return (
        <div className="app">
            <header >
                <h2>{state.name}</h2>
            </header>
            <main >
                Varun
            </main>
        </div>
    );
}
