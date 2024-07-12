import React, { useState, useEffect } from "react";
import Game from "./Game";

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
