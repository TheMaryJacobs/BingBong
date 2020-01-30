import React, { useEffect, useState } from "react";
import "./BlackHole.css";

export default function BlackHole() {
  const [pos, setPos] = useState({ x: 1, y: 1 });
  const [delta, setDelta] = useState({ x: 8, y: 8 });
  useEffect(() => {
    const handle = setTimeout(() => {
      let dx = delta.x;
      let dy = delta.y;
      if (pos.x + delta.x > 800 - 50 || pos.x + delta.x < 0) {
        dx = -dx;
      }
      if (pos.y + delta.y > 400 - 50 || pos.y + delta.y < 0) {
        dy = -dy;
      }
      setDelta({ x: dx, y: dy });
      setPos({ x: pos.x + delta.x, y: pos.y + delta.y });
    }, 50);
    return () => clearTimeout(handle);
  }, [pos, delta]);

  return (
    <div
      className="blackhole"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }}
    />
  );
}
