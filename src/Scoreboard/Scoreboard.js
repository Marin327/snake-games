import React from 'react';

const Scoreboard = ({ score, highScore }) => {
    return (
        <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
            <h3>Score: {score}</h3>
            <h4>High Score: {highScore}</h4>
        </div>
    );
};

export default Scoreboard;