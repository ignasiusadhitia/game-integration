import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [gameUrl, setGameUrl] = useState(null);

  return (
    <GameContext.Provider value={{ gameUrl, setGameUrl }}>
      {children}
    </GameContext.Provider>
  );
};
