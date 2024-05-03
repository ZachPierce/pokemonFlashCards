import './styles.css';
import React from 'react';

function InfoPanel({text}) {

    return (
        <div className="panel-info">
            This tool is designed to help you identify the weaknesses and resistances of the pokemon that you are currently 
            battling in the Go Battle League. All of the relavant meta pokemon are on the top so you can easily find them and 
            see what their weaknesses and resistances so you know what charge moves to throw!
        </div>
        )
}

export default InfoPanel;