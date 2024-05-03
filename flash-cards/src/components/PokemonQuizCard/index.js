import './styles.css';
import React, { useState } from 'react';

import Arrow from '@mui/icons-material/ArrowForwardIos';

function PokemonQuizCard ({pokeName, pokeType, weakness, resistances }) {

    var [quizStage, setQuizStage] = useState(0); 

    //this funtion is used to step the user through our 3 stage quiz depending
    const renderQuizQuestions = () => {

        //question one is the typing of the pokemon
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
                    Typing: {pokeType.map(pType => {
                        return <strong>{pType}, </strong>
                    })}
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
                    {Object.keys(weakness).map(weakTo => {
                        return <span>{weakness[weakTo].toFixed(2)}x <strong>{weakTo}</strong>, </span>
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
                    {Object.keys(resistances).map(resistantTo => {
                        return <span>{resistances[resistantTo].toFixed(2)}x <strong>{resistantTo}</strong>, </span>
                    })}
                </div>
            )
        }

        if (quizStage === 6) {
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
        
        if (quizStage <= 5 && amt === 1) setQuizStage(quizStage + amt)
        if (quizStage > 0 && amt === -1) setQuizStage(quizStage + amt)
        
    }
    
    
    
    return (
        <div className='quiz-card-box'>
            <div className='left-button' onClick={() => stepQuiz(-1)}>
                <Arrow/>
            </div>

            <div className='quiz-info'>
                <div className='poke-name' >
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