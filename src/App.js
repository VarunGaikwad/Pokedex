import { useEffect, useState } from "react";
import "./App.css";
import PokemonInfoCard from "./PokemonInfoCard";

function App() {
  const pokemon_baseurl = "https://pokeapi.co",
    url_suffix = "/api/v2/pokemon/";

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function pokemonAPI() {
      for (let i = 1; i <= 151; i++) {
        try {
          const response = await fetch(`${pokemon_baseurl}${url_suffix}${i}`);
          const pokemon = await response.json();
          
          setPokemons((prev) => [...prev, pokemon]);
        } catch (error) {
          break;
        }
      }
    }
    pokemonAPI();
  }, []);

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

export default App;
