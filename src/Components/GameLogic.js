import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios"

const GameLogic = () => {
    const [arrayOfCharacters, setArrayOfCharacters] = useState([]);
    const [gameOver, setGameOver] = useState(false)
    const [word, setWord] = useState("")
    const [revealedCharacters, setRevealedCharacters] = useState(0)
    const url = "https://random-word-form.herokuapp.com/random/noun"
    const getWord = useCallback(async () => {
        await axios.get(`${url}`).then(response => {
            setWord(response.data[0])
            const array = [];
            for (let i = 0; i < response.data[0].length; i++) {
                array.push(response.data[0].charAt(i));
            }
            setArrayOfCharacters(array)
        })
    }, [])

    const [goodCharacter, setGoodCharacter] = useState([])
    const [badTrys, setBadTrys] = useState([])
    useEffect(() => {
        getWord();
        document.getElementById('gameLogic').focus();
    }, [getWord])

    const pressingKey = (e) => {

        let goodCharacter2 = goodCharacter.slice()
        let badTrys2 = badTrys.slice();
        if (!chackIfCharWasUsed(e.key)) {
            for (let i in arrayOfCharacters) {
                if (arrayOfCharacters[i] === e.key) {
                    goodCharacter2.push(e.key)
                    chackWinner(e.key);
                    return setGoodCharacter(goodCharacter2)
                }
            }
            for (let i in arrayOfCharacters) {
                if (arrayOfCharacters[i] !== e.key) {
                    badTrys2.push(e.key);
                    if (badTrys2.length < 6) {
                        setBadTrys(badTrys2)
                        showParts(badTrys2);
                    } if (badTrys2.length === 6) {
                        setBadTrys(badTrys2)
                        showParts(badTrys2);
                        setGameOver(true)
                    }
                    return
                }
            }
        }

    }
    const showCharacter = (character) => {
        for (let i in goodCharacter) {
            if (goodCharacter[i] === arrayOfCharacters[character]) {
                return true;
            }
        }
    }

    const chackIfCharWasUsed = (char) => {
        for (let i in goodCharacter) {
            if (goodCharacter[i] === char) {
                return true;
            }
        }
        for (let i in badTrys) {
            if (badTrys[i] === char) {
                return true;
            }
        }
        return false;
    }

    const showParts = (badTrys) => {
        let parts = document.getElementsByClassName("part");
        for (let i = 0; i < badTrys.length; i++) {
            let part = parts[i]
            part.style.visibility = "visible"
        }
    }

    const chackWinner = (key) => {
        let integer = revealedCharacters;
        if (!chackIfCharWasUsed(key)) {
            for (let i in arrayOfCharacters) {
                if (arrayOfCharacters[i] === key) {
                    integer++
                }
            }
            if (integer === arrayOfCharacters.length) {
                setGameOver(true)
            }
            setRevealedCharacters(integer)
        }
    }

    const newGame = () => {
        getWord();
        let parts = document.getElementsByClassName("part");
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i]
            part.style.visibility = "hidden"
        }
        setGameOver(false)
        setGoodCharacter([]);
        setBadTrys([]);
        setRevealedCharacters(0)
        document.getElementById('gameLogic').focus();

    }
    console.log(word)
    return (<div className="wrapper">
        {gameOver && (<div className="gameOver">
            <div className="textButtonWrapper">
                {badTrys.length === 6 ? <div className="text">Unforunately you lost.<br />The word was: <p style={{ color: "red" }}>{word}</p></div>
                    : <div className="text">Congratulations! You won!</div>}
                <div className="button" onClick={newGame}>Play again?</div>
            </div>
        </div>)
        }
        <div className="gameLogic" id="gameLogic" onKeyPress={pressingKey} tabIndex="0">
            <div className="tries">Wrong tries: {badTrys.toString()}</div>
            <div className="characters">
                {arrayOfCharacters.map((characterText, index) => {
                    return <div className="character" id="character" key={index}>{showCharacter(index) ? characterText : "_"}</div>
                })}
            </div>

        </div>
    </div >

    );
};

export default GameLogic;