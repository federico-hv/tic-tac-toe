import React from 'react';
import './styles.css';

const Piece = ({symbol, onSelect, squareIndex, player}) => (
	<div className={`piece square-${squareIndex} border-${player} symbol-${symbol}`} onClick={symbol === '' ? ()=>onSelect(symbol) : null}>
		{symbol}
	</div>
);


export default Piece;