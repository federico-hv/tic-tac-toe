import React from 'react';
import './styles.css';

const Piece = ({symbol, onSelect, squareIndex, player, highLight}) => (
	<div className={`piece square-${squareIndex} border-${player} symbol-${symbol}`} onClick={symbol === '' ? ()=>onSelect(symbol) : null}>
		<span className={highLight ? `spancito blink` : "spancito"}>{symbol}</span>
	</div>
);


export default Piece;