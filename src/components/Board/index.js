import React from 'react';
import Piece from '../Piece';
import ResetButton from '../ResetButton';
import './styles.css';

const Board = ({data, onMove, player, onReset, result} ) => (
  <div className="board">
    {result !== '' ? 
      <h1 className="result">{result}</h1> :
      <h1 className={`player-turn-${player}`}>{`Player's ${player} turn`}</h1>
    }
    <div className="squares-container">
      {data.map((row, i) => row.map((el, j) => <Piece key={j} squareIndex={`${i}-${j}`} player={player} onSelect={result === '' ? (s)=>onMove([i,j]) : ()=>{}} symbol={el} />))}
    </div>
    <ResetButton onAction={onReset} />
  </div>
);

export default Board;