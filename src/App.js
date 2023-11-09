import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const pokemon_baseurl = "https://pokeapi.co",
    url_suffix = "/api/v2/pokemon/";

  const [pokemons, setPokemons] = useState([]);

  function pokemonAPI(offset, limit) {
    fetch(`${pokemon_baseurl}${url_suffix}?offset=${offset}&limit=${limit}`)
      .then((ele) => ele.json())
      .then((ele) => {
        setPokemons((prev) => {
          return [...prev, ...ele.results];
        });
      });
  }

  useEffect(() => {
    pokemonAPI(0, 16);
  }, []);

  return (
    <div className="app">
      <header>
        <h2>Pokémon Database</h2>
      </header>
      <main>Varun</main>
    </div>
  );
}

export default App;
