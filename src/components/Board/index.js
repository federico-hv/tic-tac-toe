import React from 'react';
import Piece from '../Piece';
import './styles.css';

const Board = ({data, onMove} ) => (
  <div className="board">
    {data.map((row, i) => row.map((el, j) => <Piece key={j} onSelect={(s)=>onMove([i,j])} symbol={el} />))}
  </div>
);

export default Board;