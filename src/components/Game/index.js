import React, { Component } from 'react';
import './styles.css';

const Piece = ({symbol, onSelect}) => <div onClick={symbol === '' ? ()=>onSelect(symbol) : null} className="piece">{symbol}</div>

const Board = ({data, onMove} ) => (
  <div className="board">
    {data.map((row, i) => row.map((el, j) => <Piece key={j} onSelect={(s)=>onMove([i,j])} symbol={el} />))}
  </div>
);


class Game extends Component {

  state = {
    data: (new Array(3)).fill().map(row => new Array(3).fill('')),
    starterPiece: null,
    player: 0,
    gameEnded: false
  };

  selectPiece = (p) => this.setState({starterPiece: p})

  /**
   * Adds a value to the matrix using the coordinates
   * and the player id 0 or 1
   *
   * @param {array} pos array with coordinates of recent play
   */
  onPlayerMove = (pos) => {
    const { data, player, starterPiece } = this.state;
    data[pos[0]][pos[1]] = player === starterPiece ? 'X' : '0';
    
    const newPlayer = this.state.player === 0 ? 1 : 0;

    this.setState({ player: newPlayer, data }, this.checkGameResult);
  }

  /**
   * Called after every player move to analize if the game
   * has ended either with a victory or a tie. When the game
   * ends a message with the result is displayed on the screen.
   */
  checkGameResult = () => {
    // console.log('CHECKING FINAL RESULT');
    // There is a victory if:
    // All indexes have same value
    // A row is complete
    // Cross [0][0] [1][1] [2][2] or [0][2] [1][1] [2][0] 
  }

  render() {
    return (
      <div>
        <h1 className="player-turn">{this.state.player === 0 ? 'First Player' : 'Second Player'}</h1>
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
