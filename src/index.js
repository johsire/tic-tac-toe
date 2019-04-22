// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square Component
class Square extends React.Component {
  /* We use constroctor to initialize state in our Components.
     Add 'this.state' in our 'constractor method'.
     this.state is private to the component its defined in. */

  // constructor(props){

    /*In JS classes, you need to always call super when defining
     the constructor of a subclass. All React component classes that have
     a constructor should start it with a super(props) call.*/

    // super(props);

    /* Components use state to 'remember' things.
       In our case we want our component to rem it was clicked on. */

    /* this.state = {
      value: null,
    };
  } */

  render() {
    return (
     /* if we forget to write pass the arrow fn () => it will result in the alert being
      each time the components re-renders.This is a common mistake.*/

      <button
        className="square"
        /* By calling 'this.setState' from an onClick handler in the Square's render mthd,
          we tell React to re-render that Square everytime its '<button>' is clicked.
         After the update, the Square's this.state.value will be set to 'X' */

        onClick={() => this.props.onClick({ value: 'X' })}
        /* When you call setState in a component, React automatically updates the child
         components inside of it too. */
      >
      {/* Now we’re passing down two props from Board to Square: 'value' & 'onClick'.
      The onClick prop is a fn that Square can call when clicked. */}

        {this.props.value}
      </button>
    );
  };
};

// Board Component
class Board extends React.Component {
  /*Currently, each Square component maintains the game’s state. To check for a winner, we’ll
    maintain the value of each of the 9 squares in one location - Lifting State Up to parent
    Board Comp instead of in each Sqare- child. Board(parent) will then tell each Sqare(Child)
    what to display by passing a prop.*/
  constructor(props) {
    super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
  }
  /*To collect data from multiple children, or to have two child components communicate with each other,
  you need to declare the shared state in their parent component instead. The parent component can pass
  the state back down to the children by using props; this keeps the child components in sync with each
  other and with the parent component. */

  renderSquare(i) {
    /*Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.*/
    return (
      // added parentheses so that JS doesn’t insert a semicolon after return and break our code.

      /* We need to change what happens when a Square is clicked. The Board component now maintains which squares
      are filled. We need to create a way for the Square to update the Board’s state. Since state is considered to
      be private to a component that defines it, we cannot update the Board’s state directly from Square. */
      <Square
        value={this.state.squares[i]}
        /* we’ll pass down a fn from the Board to the Square, have Square call that fn when a square is clicked.*/
        onClick={() => this.handleClick(i)}
        />
    );
  };

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  };
};

// Game Component
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  };
};

// ===========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// =============================================
