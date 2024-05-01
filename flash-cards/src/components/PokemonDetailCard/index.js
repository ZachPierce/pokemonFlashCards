import './styles.css';
import React from 'react';

function PokemonDetailCard ( {pokeName, pokeType}) {
    return (
        <div className='pokemon-detail-container'>
            {pokeName ? pokeName : "shit"}
        </div>
    );
}

export default PokemonDetailCard;