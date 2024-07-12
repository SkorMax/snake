import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GRID_SIZE = 20; // размер сетки
const CELL_SIZE = 20; // размер клетки в пикселях

// Генерация случайного числа в заданном диапазоне
const randomCoordinate = () => Math.floor(Math.random() * GRID_SIZE);

const Game = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({
    x: randomCoordinate(),
    y: randomCoordinate(),
  });
  const [direction, setDirection] = useState("RIGHT");

  // Логика перемещения змейки
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

      // Проверка на столкновение с собственным телом
      const tail = [...snake];
      if (
        tail.find((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        alert("Game Over!");
        setSnake([{ x: 10, y: 10 }]);
        setDirection("RIGHT");
        return;
      }

      // Проверка на съедание еды
      if (head.x === food.x && head.y === food.y) {
        setFood({ x: randomCoordinate(), y: randomCoordinate() });
        tail.push(snake[snake.length - 1]);
      } else {
        tail.pop();
      }

      tail.unshift(head);
      setSnake(tail);
    };

    const interval = setInterval(moveSnake, 100); // Интервал перемещения змейки

    return () => clearInterval(interval);
  }, [snake, direction, food]);

  // Обработка нажатия клавиш для управления змейкой
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
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  return (
    <Grid>
      {snake.map((segment, index) => (
        <Cell key={index} x={segment.x} y={segment.y} />
      ))}
      <FoodCell x={food.x} y={food.y} />
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
  grid-template-rows: repeat(${GRID_SIZE}, ${CELL_SIZE}px);
`;

const Cell = styled.div`
  grid-column: ${(props) => props.x + 1};
  grid-row: ${(props) => props.y + 1};
  background-color: #333;
  border: 1px solid #555;
`;

const FoodCell = styled(Cell)`
  background-color: red;
`;

export default Game;
