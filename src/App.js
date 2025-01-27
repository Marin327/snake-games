import React, { useEffect, useState } from 'react';
import './App.css';
import BackgroundMusicToggle from './BackgroundMusicToggle/BackgroundMusicToggle';
import Food from './Food/Food';
import GameBoard from './GameBoard/GameBoard';
import GridLines from './GridLines/GridLines';
import Instructions from './Instructions/Instructions';
import PauseButton from './PauseButton/PauseButton';
import Scoreboard from './Scoreboard/Scoreboard';
import Settings from './Settings/Settings';
import Snake from './Snake/Snake';

const App = () => {
  const [score, setScore] = useState(0); // Current score
  const [highScore, setHighScore] = useState(0); // High score
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const [gridSize, setGridSize] = useState(20); // Grid size
  const [speed, setSpeed] = useState(200); // Snake speed
  const [isMusicOn, setIsMusicOn] = useState(false); // Music state
  const [snake, setSnake] = useState([[10, 10]]); // Snake initial position
  const [food, setFood] = useState([5, 5]); // Food initial position
  const [direction, setDirection] = useState('RIGHT'); // Snake initial direction

  // Change snake direction
  const handleKeyDown = (e) => {
    const directions = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
    };
    if (directions[e.key] && !isPaused) {
      setDirection(directions[e.key]);
    }
  };

  // Snake movement logic
  useEffect(() => {
    if (isPaused) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = newSnake[newSnake.length - 1];
      let newHead;

      // Moving the snake based on the direction
      switch (direction) {
        case 'UP':
          newHead = [head[0] - 1, head[1]];
          break;
        case 'DOWN':
          newHead = [head[0] + 1, head[1]];
          break;
        case 'LEFT':
          newHead = [head[0], head[1] - 1];
          break;
        case 'RIGHT':
          newHead = [head[0], head[1] + 1];
          break;
        default:
          return;
      }

      // Add new head to the snake
      newSnake.push(newHead);

      // Check if snake eats food
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(score + 1);
        setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
      } else {
        newSnake.shift(); // Remove the tail if no food is eaten
      }

      // Check for collisions with walls or the snake itself
      if (
        newHead[0] < 0 ||
        newHead[1] < 0 ||
        newHead[0] >= gridSize ||
        newHead[1] >= gridSize ||
        newSnake.some((segment, index) => {
          return index !== newSnake.length - 1 && segment[0] === newHead[0] && segment[1] === newHead[1];
        })
      ) {
        resetGame();
      } else {
        setSnake(newSnake);
      }
    };

    // Move the snake at the defined speed
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, isPaused, speed, food, gridSize]);

  // Reset the game
  const resetGame = () => {
    if (score > highScore) setHighScore(score);
    setScore(0);
    setSnake([[10, 10]]);
    setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
    setDirection('RIGHT');
  };

  // Add event listener for keydown events
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Toggle pause state
  const togglePause = () => setIsPaused(!isPaused);

  // Toggle music state
  const toggleMusic = () => setIsMusicOn(!isMusicOn);

  // Update settings (speed and grid size)
  const updateSettings = (key, value) => {
    if (key === 'speed') setSpeed(Number(value));
    if (key === 'gridSize') setGridSize(Number(value));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
      <h1 style={{ color: '#00ff00' }}>Snake Game</h1>

      {/* Scoreboard */}
      <Scoreboard score={score} highScore={highScore} />

      {/* Pause Button */}
      <PauseButton isPaused={isPaused} togglePause={togglePause} />

      {/* Background Music Toggle */}
      <BackgroundMusicToggle isMusicOn={isMusicOn} toggleMusic={toggleMusic} />

      {/* Settings */}
      <Settings speed={speed} gridSize={gridSize} updateSettings={updateSettings} />

      {/* Game Board */}
      <div style={{ position: 'relative', display: 'inline-block', marginTop: '20px' }}>
        <GameBoard gridSize={gridSize}>
          <Snake segments={snake} />
          <Food position={food} />
        </GameBoard>

        {/* Grid Lines */}
        <GridLines gridSize={gridSize} />
      </div>

      {/* Instructions */}
      <Instructions />
    </div>
  );
};

export default App;
