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
  const [score, setScore] = useState(0); // Текущ резултат
  const [highScore, setHighScore] = useState(0); // Най-висок резултат
  const [isPaused, setIsPaused] = useState(false); // Състояние на пауза
  const [gridSize, setGridSize] = useState(20); // Размер на мрежата
  const [speed, setSpeed] = useState(200); // Скорост на змията
  const [isMusicOn, setIsMusicOn] = useState(false); // Състояние на музиката
  const [snake, setSnake] = useState([[10, 10]]); // Начална позиция на змията
  const [food, setFood] = useState([5, 5]); // Начална позиция на храната
  const [direction, setDirection] = useState('RIGHT'); // Начална посока

  // Промяна на посоката на змията
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

  // Движение на змията
  useEffect(() => {
    if (isPaused) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = newSnake[newSnake.length - 1];
      let newHead;

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

      newSnake.push(newHead);
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(score + 1);
        setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
      } else {
        newSnake.shift();
      }

      if (
        newHead[0] < 0 ||
        newHead[1] < 0 ||
        newHead[0] >= gridSize ||
        newHead[1] >= gridSize ||
        newSnake.some((segment, index) => {
          return (
            index !== newSnake.length - 1 &&
            segment[0] === newHead[0] &&
            segment[1] === newHead[1]
          );
        })
      ) {
        resetGame();
      } else {
        setSnake(newSnake);
      }
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, isPaused, speed, food, gridSize]);

  const resetGame = () => {
    if (score > highScore) setHighScore(score);
    setScore(0);
    setSnake([[10, 10]]);
    setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
    setDirection('RIGHT');
  };

  // Добавяне на слушател за клавиши
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const togglePause = () => setIsPaused(!isPaused);
  const toggleMusic = () => setIsMusicOn(!isMusicOn);

  const updateSettings = (key, value) => {
    if (key === 'speed') setSpeed(Number(value));
    if (key === 'gridSize') setGridSize(Number(value));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'white' }}>
      <h1 style={{ color: '#00ff00' }}>Snake Game</h1>

      {/* Табло за резултати */}
      <Scoreboard score={score} highScore={highScore} />

      {/* Бутон за пауза */}
      <PauseButton isPaused={isPaused} togglePause={togglePause} />

      {/* Бутон за включване/изключване на музиката */}
      <BackgroundMusicToggle isMusicOn={isMusicOn} toggleMusic={toggleMusic} />

      {/* Настройки за скорост и размер на мрежата */}
      <Settings speed={speed} gridSize={gridSize} updateSettings={updateSettings} />

      {/* Игрово поле */}
      <div style={{ position: 'relative', display: 'inline-block', marginTop: '20px' }}>
        <GameBoard gridSize={gridSize}>
          <Snake segments={snake} />
          <Food position={food} />
        </GameBoard>

        {/* Фонови линии на мрежата */}
        <GridLines gridSize={gridSize} />
      </div>

      {/* Инструкции */}
      <Instructions />
    </div>
  );
};

export default App;
