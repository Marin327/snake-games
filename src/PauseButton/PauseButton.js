import React from 'react';

const PauseButton = ({ isPaused, togglePause }) => {
    return (
        <button
            onClick={togglePause}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: isPaused ? '#ff0000' : '#00ff00',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
            }}
        >
            {isPaused ? 'Resume' : 'Pause'}
        </button>
    );
};

export default PauseButton;