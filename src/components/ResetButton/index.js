import React from 'react';
import './styles.css';

const ResetButton = ({onAction}) => (
	<button className="reset-button" onClick={onAction}>Restart Game</button>
);

export default ResetButton;