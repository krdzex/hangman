import React from 'react';
import GameLogic from './GameLogic';
import Hangman from './Hangman';

const Game = () => {
    return (
        <div>
            <Hangman />
            <GameLogic />
        </div>
    );
};

export default Game;