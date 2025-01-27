import React from 'react';

const Settings = ({ speed, gridSize, updateSettings }) => {
    return (
        <div style={{ marginTop: '20px', color: 'white', textAlign: 'center' }}>
            <label>
                Speed:
                <input
                    type="range"
                    min="50"
                    max="500"
                    value={speed}
                    onChange={(e) => updateSettings('speed', e.target.value)}
                    style={{ marginLeft: '10px' }}
                />
            </label>
            <br />
            <label>
                Grid Size:
                <input
                    type="number"
                    min="10"
                    max="30"
                    value={gridSize}
                    onChange={(e) => updateSettings('gridSize', e.target.value)}
                    style={{ marginLeft: '10px', width: '50px' }}
                />
            </label>
        </div>
    );
};

export default Settings;