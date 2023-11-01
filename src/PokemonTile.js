import React from 'react'

export default function PokemonTile({ name, url }) {
    const number = createDexNumber(url.split("/").at(-2)),
        pokename = capitalization(name);

    return (
        <div className="PokemonTile">
            <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${number}.png`} alt={pokename} />
            <span>#{number}</span>
            <span>{pokename}</span>
        </div>
    );
}

function createDexNumber(num) {
    while (num.length < 3) {
        num = "0" + num;
    }
    return num;
}

function capitalization(value) {
    return `${value[0].toUpperCase()}${value.substring(1)}`
}
