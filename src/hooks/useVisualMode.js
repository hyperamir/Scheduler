import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      setMode(mode)
    } else {
      setMode(mode);
      history.push(mode);
    }
  }
  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }

  return {
    mode,
    transition,
    back,
    // history
  };
}
