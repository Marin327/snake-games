import React from 'react';

const GameBoard = ({ gridSize, snake, food }) => {
    return (
        <div
            className="game-board"
            style={{
                gridTemplateRows: `repeat(${gridSize}, 20px)`,
                gridTemplateColumns: `repeat(${gridSize}, 20px)`,
            }}
        >
            {Array.from({ length: gridSize }).map((_, row) =>
                Array.from({ length: gridSize }).map((_, col) => {
                    const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
                    const isFood = food[0] === row && food[1] === col;
                    return (
                        <div
                            key={`${row}-${col}`}
                            className={isSnake ? 'snake-segment' : isFood ? 'food' : ''}
                        ></div>
                    );
                })
            )}
        </div>
    );
};

export default GameBoard;