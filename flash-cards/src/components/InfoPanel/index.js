import './styles.css';
import React from 'react';

import CloseIcon from '@mui/icons-material/HighlightOff';

//this simply takes in some text and makes a nice panel displaying that message 
function InfoPanel({text, closeInfo}) {

    return (
        <div className="panel-info">
            {/* this is a little x icon to close the info message if the user finds it distracting */}
            <span className='icon-container' onClick={closeInfo} role='button'>
                <CloseIcon />
            </span>

            <p>
                {text}
            </p>
           
        </div>
        )
}

export default InfoPanel;