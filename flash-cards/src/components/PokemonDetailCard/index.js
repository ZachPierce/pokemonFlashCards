import './styles.css';
import React from 'react';

function PokemonDetailCard ( {pokeName, setDetailView}) {
    return (
        <div className='card-box'>
            
            <div className='pokemon-name'>
                {pokeName ? pokeName : "Something went wrong"}
            </div>

            <footer onClick={setDetailView} className='card-footer'>
                Test My Knowledge!
            </footer>
            
        </div>
    );
}

export default PokemonDetailCard;