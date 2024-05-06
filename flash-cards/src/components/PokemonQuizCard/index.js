import './styles.css';
import React, { useState } from 'react';

import Arrow from '@mui/icons-material/ArrowForwardIos';

//this component is a basic card tile, it manages a counter via state to determine what
//questions or answers to display based on user input. 
function PokemonQuizCard ({pokeName, pokeType, weakness, resistances, updateQuizComplete }) {

    const [quizStage, setQuizStage] = useState(0); 

    //this function is used to step the user through our 3 stage quiz 
    const renderQuizQuestions = () => {

        //question one 
        if (quizStage === 0) {
            return (
                <p className='question'>
                    What is {pokeName}'s typing?
                </p>
            )
        }
        //answer to question one
        if (quizStage === 1) {
            return (
                <p className='answer'>
                    Typing: {pokeType.join(", ")}
                </p>
            )
        }
        //question 2 
        if (quizStage === 2) {
            return (
                <p className='question'>
                    What are {pokeName}'s weaknesses?
                </p>
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
                            <p className="weak-to" key={weakTo}>{weakTo}: {weakness[weakTo].toFixed(2)}x
                                {index !== array.length - 1 && ', '}
                            </p>
                        )
                    })}
                </div>
            )
        }
        //question 3
        if (quizStage === 4) {
            return (
                <p className='question'>
                    What are {pokeName}'s resistances?
                </p>
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
                            <p className="resistant-to" key={resistantTo}>{resistantTo}: {resistances[resistantTo].toFixed(2)}x 
                                {index !== array.length - 1 && ', '}
                            </p>
                        )
                    })}
                </div>
            )
        }
        //final stage
        if (quizStage === 6) {
            updateQuizComplete(pokeName);
            return (
                <p className='answer'>
                    Great Job!
                </p>
            )
        }
    }

    //increment or decrement the quizStage depending on what button they clicked
    //with some edge case handling if they are at the beginning or the end of the quiz
    const stepQuiz = (amt) => {
        
        //if we are at the end of the quiz done increase it
        if (quizStage <= 5 && amt === 1) setQuizStage(quizStage + amt);
        //if the quiz stage is 0 dont decrease it
        if (quizStage > 0 && amt === -1) setQuizStage(quizStage + amt);
        
    }
    
    
    
    return (
        <section className='quiz-card-box'>
            <span className='left-button' onClick={() => stepQuiz(-1)} role='button'>
                <Arrow/>
            </span>

            <div className='quiz-info'>
                <span className='poke-name'>
                    {pokeName ? pokeName : null}
                </span>
               
                <div className='quiz-details'>
                    {renderQuizQuestions()}
                </div>
            </div>

            <span className='right-button' onClick={() => stepQuiz(1)} role='button'>
                <Arrow/>
            </span>
            
        </section>
    );
}

export default PokemonQuizCard;