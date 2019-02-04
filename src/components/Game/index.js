import React, { Component } from 'react';

const Text = () => <p>Example text</p>

class Game extends Component {
  render() {
    return (
      <div>
        <h1>Game component</h1>
        <Text />
      </div>
    );
  }
}

export default Game;
