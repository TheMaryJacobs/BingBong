import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Ball from "./components/Ball";
import BlackHole from "./components/BlackHole";

const initialState = {
  paddle1: {
    y: 0
  },
  paddle2: {
    y: 0
  },
  ball: {
    x: 50,
    y: 50,
    dx: 5,
    dy: 5
  },
  blackhole: {
    x: 100,
    y: 100,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE_2":
      return { ...state, paddle2: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKey(e) {
    const char = e.key.toLowerCase();
    if (char === "w" || char === "s") {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          y: state.paddle1.y + (char === "w" ? -15 : 15)
        }
      });
    }
    if (char === "o" || char === "l") {
      dispatch({
        type: "MOVE_PADDLE_2",
        payload: {
          y: state.paddle2.y + (char === "o" ? -15 : 15)
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state]);

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let p1y = state.paddle1.y;
      let p2y = state.paddle2.y;

      if (x + dx > 800 - 50 || x + dx < 0) {
        dx = -dx;
      }

      if (y + dy > 500 - 50 || y + dy < 0) {
        dy = -dy;
      }

      if (
        (p1y < y + dy && p1y + 100 > y + dy && x < 45) ||
        (p2y < y + dy && p2y + 100 > y + dy && x > 735)
      ) {
        dx = -dx;
      }

      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + dx,
          y: state.ball.y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="container">
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayerTwo paddleY={state.paddle2.y} />
      <BlackHole />
      <Ball pos={state.ball} />
    </div>
  );
}
