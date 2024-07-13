import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Game from "./Game";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Snake</h1>
      </header>
      <main>
        <Game />
        <aside>
          <List>
            <li>Гравець</li>
            <li>Гравець</li>
            <li>Гравець</li>
            <li>Гравець</li>
            <li>Гравець</li>
          </List>
        </aside>
      </main>
    </div>
  );
};

const List = styled.ol`
  border: 1px solid black;
  background-color: #282c34;
  color: white;
  margin: 20px;
`;

export default App;
