import React, { Component } from 'react';
import Board from '../Board';
import Piece from '../Piece';
import ResetButton from '../ResetButton';
import toe from '../../assets/toe.svg';
import './styles.css';


class Game extends Component {

  state = {
    data: (new Array(3)).fill().map(row => new Array(3).fill('')),
    starterPiece: null,
    player: 0,
    gameEnded: false,
    result: ''
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
    data[pos[0]][pos[1]] = player === starterPiece ? 'X' : 'O';
    
    this.setState({ data }, this.checkGameResult);
  }

  /**
   * Receives the data array and returns the final result
   * of the game.
   * 
   * 0 if game hasn't finished yet
   * 1 current player wins
   * 2 for tie
   *
   * @return  {number}  current status of the game
   */
  getGameResult = (data) => {
    let result = 0, missing = false, aux1 = [], aux2 = [], aux3 =[];

    data.every(row => {
      if (row.every(v => v === row[0] && v !== '')){
        result = 1;
        return false
      }

      if (row.some(v => v === '')) {
        missing = true;
      }

      aux1.push(row[0]);
      aux2.push(row[1]);
      aux3.push(row[2]);
      return true;
    })

    if (result === 1) return result;
    
    if (aux1.every( v => v === aux1[0] && v !== '') || 
        aux2.every( v => v === aux2[0] && v !== '') || 
        aux3.every( v => v === aux3[0] && v !== ''))
      return 1;

    if ((data[0][0] === data[1][1] && data[1][1] === data[2][2] && data[0][0] !== '') || 
        data[0][2] === data[1][1] &&  data[1][1] === data [2][0] && data[0][2] !== '') 
        return 1;

    if (!missing) return 2;

    return 0;
  }

  /**
   * Checks and updates the state of the game
   * after every move
   */
  checkGameResult = () => {

    const { data } = this.state;

    const result = this.getGameResult(data);
    const newPlayer = this.state.player === 0 ? 1 : 0;
    
    switch (result) {
      case 0:
        return this.setState({ player: newPlayer });
      case 1:
        return this.setState({ gameEnded: true, result: `Player ${this.state.player+1} wins!`});
      case 2:
        return this.setState({ gameEnded: true, result: `There's a tie`});
      default:
        return this.setState({ player: newPlayer });
    }
  }

  /**
   * Resets the game to its original state
   */
  onReset = () => {
    this.setState({
      data: (new Array(3)).fill().map(row => new Array(3).fill('')),
      starterPiece: null,
      player: 0,
      gameEnded: false,
      result: ''
    });
  }

  render() {
    const {
      player,
      data,
      starterPiece,
      gameEnded,
      result 
    } = this.state;
    const currentPlayer = player === 0 ? 1 : 2;

    return (
      <div className={starterPiece === null && result === '' ? 'game-container' : `game-container gc-${currentPlayer}`}>
        {
          (
            <div className="board-container">
              {
                starterPiece !== null ? <Board onMove={this.onPlayerMove} result={result} player={player === 0 ? 1 : 2} data={data} onReset={this.onReset} /> : 
                (
                  <div className="piece-selector">
                    <div className="piece-selector-title"><h1>React Tic Tac</h1><img className="toe" src={toe} alt="toe"/></div>
                    <div className="piece-selector-els">
                      <div>Player 1</div>
                      <div>Select Piece</div>
                    </div>
                    <div className="btns-container">
                      <button id="btnX" onClick={()=>this.selectPiece(0)}>x</button>
                      <button id="btnO" onClick={()=>this.selectPiece(1)}>o</button>
                    </div>
                  </div>
                )
              }
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
