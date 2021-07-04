import React, { useCallback, useEffect } from 'react';

const Hangman = () => {

    const makeHangingPlatform = useCallback(() => {
        makeDownLine()
        makeRod()
        makeRod2()
        makeRope()
    }, [])
    const makeBody = useCallback(() => {
        makeHead();
        makeBodyLine();
        makeRightHand();
        makeLeftHand();
        makeLeftLeg();
        makeRightLeg();
    }, [])


    const makeRope = () => {

        let rope = document.createElement('div');
        rope.className = "rope";
        rope.id = "rope"
        rope.style.position = "relative";
        document.getElementById("rod2").appendChild(rope)
    }
    const makeRod = () => {
        let rod = document.createElement('div');
        rod.className = "rod";
        rod.id = "rod"
        rod.style.position = "relative";
        document.getElementById("downLine").appendChild(rod)
    }
    const makeRod2 = () => {
        let rod2 = document.createElement('div');
        rod2.className = "rod2";
        rod2.id = "rod2"
        rod2.style.position = "relative";
        document.getElementById("rod").appendChild(rod2)
    }
    const makeDownLine = () => {
        let downLine = document.createElement('div');
        downLine.className = "downLine";
        downLine.id = "downLine"
        document.getElementById("hangmanFigureAndPlatform").appendChild(downLine)
    }

    const makeHead = () => {
        let head = document.createElement('div');
        head.className = "part";
        head.id = "head"
        document.getElementById("rope").appendChild(head)
    }

    const makeBodyLine = () => {
        let body = document.createElement('div');
        body.className = "part";
        body.id = "body"
        body.style.position = "relative";
        document.getElementById("head").appendChild(body)
    }

    const makeRightHand = () => {
        let hand1 = document.createElement('div');
        hand1.className = "part";
        hand1.id = "hand1"
        hand1.style.position = "relative";

        document.getElementById("body").appendChild(hand1)
    }

    const makeLeftHand = () => {
        let hand2 = document.createElement('div');
        hand2.className = "part";
        hand2.id = "hand2"
        hand2.style.position = "relative";
        document.getElementById("body").appendChild(hand2)
    }

    const makeRightLeg = () => {
        let leg2 = document.createElement('div');
        leg2.className = "part";
        leg2.id = "leg2"
        leg2.style.position = "relative";
        document.getElementById("body").appendChild(leg2)
    }

    const makeLeftLeg = () => {
        let leg1 = document.createElement('div');
        leg1.className = "part";
        leg1.id = "leg1"
        leg1.style.position = "relative";
        document.getElementById("body").appendChild(leg1)
    }

    useEffect(() => {
        makeHangingPlatform();
        makeBody();
    }, [makeBody, makeHangingPlatform])

    return (
        <div className="hangmanFigureAndPlatform" id="hangmanFigureAndPlatform">

        </div>
    );
};

export default Hangman;