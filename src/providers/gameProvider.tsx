import React, { useState, createContext, useEffect } from "react";
import Game from "../models/game";

interface GameContextType {
    game: Game;
}

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [game] = useState<Game>(new Game());
    const [frame, setFrame] = useState<number>(0);

    // フレームを進める(再レンダリングのため)
    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setFrame(frame + 1);
        });
        return () => cancelAnimationFrame(handle);
    }, [frame]);


    useEffect(() => {
        console.log("GameProvider: useEffect: game.start()");
        game.start();
    }, [game]);

    return (
        <GameContext.Provider value={{game}}>
            {children}
        </GameContext.Provider>
    );
};
