import React from 'react';
const BackgroundMusicToggle = ({ isMusicOn, toggleMusic }) => {
    return (
        <button
            onClick={toggleMusic}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: isMusicOn ? '#00ff00' : '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
            }}
        >
            {isMusicOn ? 'Turn Music Off' : 'Turn Music On'}
        </button>
    );
};

export default BackgroundMusicToggle;