import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GRID_SIZE = 20;
const CELL_SIZE = 20;

// Генерація випавдкового числа
const randomCoordinate = () => Math.floor(Math.random() * GRID_SIZE);

const Game = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({
    x: randomCoordinate(),
    y: randomCoordinate(),
  });
  const [direction, setDirection] = useState("RIGHT");
  const [gameActive, setGameActive] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [userName, setUserName] = useState("");

  const startGame = () => {
    setGameActive(true);
  };

  // Логіка переміщення змійки
  useEffect(() => {
    const moveSnake = () => {
      const head = { ...snake[0] };
      switch (direction) {
        case "UP":
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "DOWN":
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case "LEFT":
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case "RIGHT":
          head.x = (head.x + 1) % GRID_SIZE;
          break;
        default:
          break;
      }
      // Перевірка на зіткнення із своїм тілом
      const tail = [...snake];
      if (
        tail.find((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        alert("Битва програна, але війна не закінчена");
        setCurrentPoints(0);
        setSnake([{ x: 10, y: 10 }]);
        setDirection("RIGHT");
        return;
      }

      // Перевірка на зіткнення з їжею
      if (head.x === food.x && head.y === food.y) {
        addPoints();
        setFood({ x: randomCoordinate(), y: randomCoordinate() });
        tail.push(snake[snake.length - 1]);
      } else {
        tail.pop();
      }

      tail.unshift(head);
      setSnake(tail);
    };

    const interval = setInterval(moveSnake, currentPoints < 50 ? 70 : 50); // Интервал переміщення змійки
    if (!gameActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [snake, direction, food, gameActive]);

  // Слухач подій натиску клавіш для направлення змійки
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          gameActive ? setGameActive(false) : setGameActive(true);
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  const addPoints = () => {
    setCurrentPoints(currentPoints + 10);
  };

  return (
    <Box>
      <br />
      {gameActive === true ? (
        <Grid>
          {snake.map((segment, index) => (
            <Cell key={index} x={segment.x} y={segment.y} />
          ))}
          <FoodCell x={food.x} y={food.y} />
        </Grid>
      ) : null}
      <Button onClick={startGame}>Start</Button>
      <Counter>{currentPoints}</Counter>
      <h1>Введи своє ім'я, воїне</h1>
      <form>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Введи своє ім'я"
        />
        <Button onClick={handleSubmit}>Записатись</Button>
      </form>
    </Box>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
  grid-template-rows: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
  border: 2px solid black;
`;

const Cell = styled.div`
  grid-column: ${(props) => props.x + 1};
  grid-row: ${(props) => props.y + 1};
  background-color: green;
`;

const FoodCell = styled(Cell)`
  background-color: blue;
`;

const Button = styled.button`
  max-width: 150px;
  height: 30px;
  background-color: gray;
  color: white;
  margin: 10px;
  font-size: large;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Counter = styled.div`
  min-width: 40px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  font-weight: bold;
`;

const Input = styled.input`
  min-width: 100px;
  height: 40px;
  font-size: xx-large;
  margin: 10px;
`;

export default Game;
