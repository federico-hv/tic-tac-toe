import React, { Component } from 'react';
import './styles.css';

const Piece = ({symbol, onSelect}) => typeof symbol === 'undefined' ? <div onClick={onSelect} className="piece"></div> : <div onClick={onSelect} className="piece">{symbol.value}</div> 

const Board = ({data, onMove}) => (
  <div className="board">
    {data.map((row, i) => row.map((el, j) => <Piece key={j} onSelect={()=>onMove([i,j])} symbol={el} />))}
  </div>
);

class Game extends Component {

  state = {
    data: (new Array(3)).fill().map(row => new Array(3).fill()),
    starterPiece: null,
    turn: null
  };

  selectPiece = (p) => this.setState({starterPiece: p, turn: p})

  onPlayerMove = (pos) => {
    console.log('PLAYER CLICKED: ', pos);
  }

  render() {
    return (
      <div>
        {this.state.turn === 0 ? 'First player' : 'Second Player'}
        {this.state.starterPiece !== null ? <Board onMove={this.onPlayerMove} data={this.state.data} /> : 
          (
            <div className="piece-selector">
              Select 
              <button id="btnX" onClick={()=>this.selectPiece(0)}>x</button>
              <button id="btnO" onClick={()=>this.selectPiece(1)}>o</button>
            </div>
          )
        }
      </div>
    );
  }
}

export default Game;

export {
  Board,
  Piece
};
