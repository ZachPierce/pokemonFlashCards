import './styles.css';
import React from 'react';

//this is a basic component that shows a little data about the given pokemon
//it also has the ability to pass a flag back to the parent that this card
//has been clicked to start the quiz
function PokemonDetailCard ( {pokeName, setDetailView, completedQuiz}) {
    return (
        <div className={completedQuiz ? 'card-box completed' : "card-box"}>
            
            <div className='pokemon-name'>
                {pokeName ? pokeName : null}
            </div>

            <footer onClick={setDetailView} className='card-footer'>
                Test My Knowledge!
            </footer>
            
        </div>
    );
}

export default PokemonDetailCard;