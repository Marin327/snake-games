import React from 'react';

const Instructions = () => {
    return (
        <div style={{ color: 'white', marginTop: '20px', textAlign: 'center' }}>
            <h3>How to Play</h3>
            <p>Use the arrow keys to control the snake.</p>
            <p>Eat the red food to grow your snake and score points.</p>
            <p>Avoid colliding with the walls or yourself!</p>
        </div>
    );
};

export default Instructions;