// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square Component
//class Square extends React.Component {

  /*  We use constructor to initialize state in our Components.
      Add 'this.state' in our 'constructor method'.
     this.state is private to the component its defined in. */

  // constructor(props){

    /*In JS classes, you need to always call super when defining
      the constructor of a subclass. All React component classes that have
      a constructor should start it with a super(props) call.*/

    // super(props);

    /* Components use state to 'remember' things.
       In our case we want our component to remember it was clicked on. */

    /* this.state = {
      value: null,
    };
  } */


  // When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

  // 1) The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
  // 2) When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
  // 3) This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
  // 4) Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.

  /* Note
    The DOM <button> element’s onClick attribute has a special meaning to React bcz it's a built-in component. For custom
    components like Square, the naming is up to you. We could give any name to the Square’s onClick prop or Board’s handleClick
    method, & the code would work the same. In React, it’s conventional to use on[Event] names for props which represent events
    & handle[Event] for the methods which handle the events. */

  // render() {
  //   return (
     /**
      * !if we forget to write pass the arrow fn () => it will result in the alert being each time the components re-renders.
      ** This is a common mistake
      */

      /* <button

        className="square" */

        /**
         **By calling 'this.setState' from an onClick handler in the Square's render method,
          **we tell React to re-render that Square every time its '<button>' is clicked.
         **After the update, the Square's this.state.value will be set to 'X'
         */

        // onClick={() => this.props.onClick({ value: 'X' })}
        /*When you call setState in a component, React automatically updates the child components inside of it too.*/
      // >
      /* Now we’re passing down two props from Board to Square: 'value' & 'onClick'.
      The onClick prop is a fn that Square can call when clicked. */

//         {this.props.value}
//       </button>
//     );
//   };
// };


/**
 * !Change our Square Component from a Class to Function Component since it only
 * !contains a render method & has no state to maintain

  **We also changed this.props to props on both times it appears.
 */

  function Square(props) {
    return (
      <button className="square" onClick={ props.onClick }>
        { props.value }
      </button>
    );
  };

  /**
   * !Note
   * When we modified the Square to be a function component, we also changed
   * *onClick={() => this.props.onClick()} to a shorter onClick={props.onClick}
   * !(note the lack of parentheses on both sides).
   */




// Board Component
class Board extends React.Component {

  /*Currently, each Square component maintains the game’s state. To check for a winner, we’ll
    maintain the value of each of the 9 squares in one location - Lifting State Up to parent
    Board Comp instead of in each Square- child. Board(parent) will then tell each Square(Child)
    what to display by passing a prop.*/

  constructor(props) {
    super(props);
      this.state = {
        squares: Array(9).fill(null),
      };
  }

  // *Our handleClick is a Custom method- it can have any name & code would still work the same;

  /*  Since the Square components no longer maintain state, the Square components receive values
      from the Board component and inform the Board component when they’re clicked. In React terms,
      the Square components are now controlled components. The Board has full control over them. */

  handleClick(i) {

    /* We call .slice() on handleClick to creat a copy of the squares array to modify instead of
      modifying the existing array bcoz of Immutability */

    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
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
