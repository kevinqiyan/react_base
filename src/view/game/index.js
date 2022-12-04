import React, {useState}from "react";
import './index.css'

const Square = (props) => {
    return (
        <button className="square">
            {props.value}
        </button>
    )
}

const Game = (props) => {
    return (
        <div id="game">
            <div className="item">
                <Square value="0"></Square>
                <Square value="1"></Square>
                <Square value="2"></Square>
            </div>
            <div className="item">
                <Square value="3"></Square>
                <Square value="4"></Square>
                <Square value="5"></Square>
            </div>
            <div className="item">
                <Square value="6"></Square>
                <Square value="7"></Square>
                <Square value="8"></Square>
            </div>
        </div>
    )
}

export default Game