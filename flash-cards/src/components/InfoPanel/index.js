import './styles.css';
import React from 'react';

import CloseIcon from '@mui/icons-material/HighlightOff';

//this simply takes in some text and makes a nice panel displaying that message 
function InfoPanel({text, closeInfo}) {

    return (
        <div className="panel-info">
            <span className='icon-container' onClick={closeInfo}>
                <CloseIcon />
            </span>

            <p>
                {text}
            </p>
           
        </div>
        )
}

export default InfoPanel;