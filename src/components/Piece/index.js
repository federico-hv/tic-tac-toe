import React from 'react';
import './styles.css';

const Piece = ({symbol, onSelect}) => <div onClick={symbol === '' ? ()=>onSelect(symbol) : null} className="piece">{symbol}</div>


export default Piece;