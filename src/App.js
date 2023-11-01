import { useEffect, useState } from 'react';
import './App.css';
import PokemonTile from './PokemonTile';

function App() {
  const pokemon_baseurl = 'https://pokeapi.co',
    url_suffix = '/api/v2/pokemon/';

  const [pokemons, setPokemons] = useState([]);

  function pokemonAPI(offset, limit) {
    fetch(`${pokemon_baseurl}${url_suffix}?offset=${offset}&limit=${limit}`).then(ele => ele.json()).then(ele => {
      setPokemons(prev => {
        return [...prev, ...ele.results];
      })
    });
  }

  useEffect(() => {
    pokemonAPI(0, 16);
  }, []);



  return (
    <div className="App">
      <div className="App__Body">
        <div className="App__Body__Header">
          Pokémon Pokédex
        </div>
        <div className="PokedexBody">
          {
            pokemons.map((element, idx) => <PokemonTile key={idx} name={element.name} url={element.url} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
