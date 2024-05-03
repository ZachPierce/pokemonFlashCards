import './styles.css';
import React from 'react';

//this simply takes in some text and makes a nice panel displaying that message
function InfoPanel({text}) {

    return (
        <div className="panel-info">
           {text}
        </div>
        )
}

export default InfoPanel;