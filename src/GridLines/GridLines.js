import React from 'react';

const GridLines = ({ gridSize }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                pointerEvents: 'none',
            }}
        >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        border: '1px solid #444',
                        boxSizing: 'border-box',
                    }}
                ></div>
            ))}
        </div>
    );
};

export default GridLines;