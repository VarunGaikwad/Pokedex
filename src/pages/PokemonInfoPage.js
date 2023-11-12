import React from 'react'
import { useParams } from 'react-router-dom';

export default function PokemonInfoPage() {
    const { name } = useParams();
    console.log(name);
    return (
        <div>PokemonInfoPage</div>
    );
}
