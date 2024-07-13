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
      </main>
    </div>
  );
};

export default App;
