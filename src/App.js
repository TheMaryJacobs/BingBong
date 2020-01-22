import React from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";

export default function App() {
  return (
    <div className="App">
      <Paddle />
      <Ball />
    </div>
  );
}
