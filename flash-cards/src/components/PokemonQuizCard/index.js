import './styles.css';
import React, { useState } from 'react';

import Arrow from '@mui/icons-material/ArrowForwardIos';

//this component is a basic card tile, it manages a counter to determine what
//questions to display based on user input. 
function PokemonQuizCard ({pokeName, pokeType, weakness, resistances, updateQuizComplete }) {

    var [quizStage, setQuizStage] = useState(0); 

    //this function is used to step the user through our 3 stage quiz 
    const renderQuizQuestions = () => {

        //question one 
        if (quizStage === 0) {
            return (
                <div className='question'>
                    What is {pokeName}'s typing?
                </div>
            )
        }
        //answer to question one
        if (quizStage === 1) {
            return (
                <div className='answer'>
                    Typing: <strong>{pokeType.join(", ")}</strong>
                </div>
            )
        }
        //question 2 
        if (quizStage === 2) {
            return (
                <div className='question'>
                    What are {pokeName}'s weaknesses?
                </div>
            )
        }
        //answer to question 2
        if (quizStage === 3) {
            //we have to loop through the map here so we can show the weakness along with
            //how weak they are to the given type
            return (
                <div className='answer'>
                    {Object.keys(weakness).map((weakTo, index, array) => {
                        return (
                            <span key={weakTo}><strong>{weakTo}</strong>:{weakness[weakTo].toFixed(2)}x
                                {index !== array.length - 1 && ', '}
                            </span>
                        )
                    })}
                </div>
            )
        }
        //question 3
        if (quizStage === 4) {
            return (
                <div className='question'>
                    What are {pokeName}'s resistances?
                </div>
            )
        }
        //answer to question 3
        if (quizStage === 5) {
            //we have to loop through the map here so we can show the resistance along with
            //how resistant they are to the given type
            return (
                <div className='answer'>
                    {Object.keys(resistances).map((resistantTo, index, array) => {
                        return (
                            <span key={resistantTo}><strong>{resistantTo}</strong>:{resistances[resistantTo].toFixed(2)}x 
                                {index !== array.length - 1 && ', '}
                            </span>
                        )
                    })}
                </div>
            )
        }
        //final stage
        if (quizStage === 6) {
            updateQuizComplete(pokeName)
            return (
                <div className='answer'>
                    Great Job!
                </div>
            )
        }
    }

    //increment or decrement the quizStage depending on what button they clicked
    //with some edge case handling if they are at the beginning or the end of the quiz
    const stepQuiz = (amt) => {
        
        //if we are at the end of the quiz done increase it
        if (quizStage <= 5 && amt === 1) setQuizStage(quizStage + amt)
        //if the quiz stage is 0 dont decrease it
        if (quizStage > 0 && amt === -1) setQuizStage(quizStage + amt)
        
    }
    
    
    
    return (
        <div className='quiz-card-box'>
            <div className='left-button' onClick={() => stepQuiz(-1)}>
                <Arrow/>
            </div>

            <div className='quiz-info'>
                <div className='poke-name'>
                    {pokeName ? pokeName : null}
                </div>
               
                <div className='quiz-details'>
                    {renderQuizQuestions()}
                </div>
            </div>

            <div className='right-button' onClick={() => stepQuiz(1)}>
                <Arrow/>
            </div>
            
        </div>
    );
}

export default PokemonQuizCard;