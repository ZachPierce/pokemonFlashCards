import './styles.css';
import React from 'react';

function PokemonQuizCard ( {pokeName, pokeType, setDetailView}) {
    return (
        <div className='card-box'>
            
            <div className='pokemon-name'>
                {pokeName ? pokeName : null}
            </div>

            <footer onClick={setDetailView} className='card-footer'>
                Test My Knowledge!
            </footer>
            
        </div>
    );
}

export default PokemonQuizCard;