/**
 *                                  !WHAT IS REACT
 *
 **     React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
 **     It lets you compose complex UIs from small and isolated pieces of code called “components”.
 *
 * -   React has a few different kinds of components, but we’ll start with
 **                React.Component subclasses.

 */
//=================================================================================================================================================
/**
 *                                  !PASSING DATA THROUGH PROPS
 *
 * * As an Example, let's pass data from our Board component to our Square component
 *
 * - In the Board's #renderSquare mthd, let's change the code to pass a prop called 'value' to the square:
 *
 *            class Board extends React.Component {
 *              renderSquare(i) {
                    return <Square value={i} />;
 *               }
 *
 * - Let's change Square's #render mthd to show that 'value' - props being passed down
 *
 *            class Square extends React.Component {
                render() {
                    return (
                    <button className="square">
                        {this.props.value}
                    </button>
                    );
                }
                }
 *
 *
 *
 */
//=================================================================================================================================================
/*
                                    !WHY IMMUTABILITY IS IMPORTANT

    -In the previous code example, we suggested using the .slice() operator to create a copy
    of the squares array to modify instead of modifying the existing array.
    -We’ll now discuss immutability and why immutability is important to learn.

    -There are generally 2 approaches to changing data.
    *1) To mutate the data by directly changing the data’s values.
    *2) To replace the data with a new copy which has the desired changes.

    !1) Data Change with Mutation

        var player = {score: 1, name: 'Jeff'};
        player.score = 2;

        Now player is {score: 2, name: 'Jeff'}


    !2) Data Change without Mutation

        var player = {score: 1, name: 'Stanley'};
        var newPlayer = Object.assign({}, player, {score: 2});

        -Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

    *Or if you are using object Spread Syntax Proposal, you can write:
        var newPlayer = {...player, score: 2};

    -The end result is the same but by not mutating (or changing the underlying data) directly,
    we gain several benefits described below.

   * 1) Complex Features Become Simple
    -Immutability makes complex features much easier to implement. Later in this tutorial, we will implement
    a “time travel” feature that allows us to review the tic-tac-toe game’s history & “jump back” to previous moves.
    -This functionality isn’t specific to games — ability to undo & redo certain actions is a common requirement in apps.
    -Avoiding direct data mutation lets us keep previous versions of the game’s history intact, & reuse them later.

   * 2) Detecting Changes
    -Detecting changes in mutable objs is difficult because they are modified directly.
    -This detection requires the mutable obj to be compared to previous copies of itself & the entire object tree traversed.

    -Detecting changes in immutable objs is considerably easier. If the immutable obj that is being referenced is different
    than the previous one, then the obj has changed.

   * 3) Determining When to Re-Render in React
    -The main benefit of immutability is that it helps build 'pure components' in React. Immutable data can easily determine
    if changes have been made which helps to determine when a component requires re-rendering.

    *Learn more about shouldComponentUpdate() & how to build pure components by reading Optimizing Performance.
    *https://reactjs.org/docs/optimizing-performance.html#examples

 */
//=================================================================================================================================================
/**
 *                                !FUNCTION COMPONENT
 *
 ** We'll now change the Square to be a Function Component

* In React, fn comps are a simpler way to write comps that only contain a render method & don’t have their own state.

* Instead of defining a class which extends React.Component, we can write a fn that takes props as input &
returns what should be rendered.

* Fn comps are less tedious to write than classes, & many components can be expressed this way.

 */
//=================================================================================================================================================
/**
  *                                  !TAKING TURNS
  *
  * *We need to fix the obvious defect in our game: "O" can't be marked on the board.
  *
  *  Set the first move to be "X" by default. We can set this default by modifying the Initial State in our Board Constructor:
  *     *set=> xIsNext: true,
  *
  *  Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next & the game's state will be saved.
  *  We'll update the Board's handleClick fn to flip the value of xIsNext:
  *     *set=> this.setState({
      **            squares: squares,
      **            xIsNext: !this.state.xIsNext,
      **          });
      **      }
  *     !With this changes, "X" and "O" can take turns.
  *
  * Let's also change the "Status" text in Board's #render so it displays which player has the next turn.
  *     *   render() {
       **       const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        **       return (
        * the rest has not changed
  */
//=================================================================================================================================================
/**
 *                                    !ADDING TIME TRAVEL
 *
 *  If we mutated the squares array, implementing time travel would be very difficult.
 *
 *  Since we use #slice() to create a copy of the #squares array after each move, & treated it as #immutable. It's now possible to
 * store every past version of the #squares array, & navigate btwn turns that have already happened.
 *
 *  We'll store the past #squares array in another array called #history. It will represent all board states, from the 1st to the
 * last move. & has a shape like this.
*                           history = [
                                ** Before first move
                                {
                                    squares: [
                                    null, null, null,
                                    null, null, null,
                                    null, null, null,
                                    ]
                                },
                                ** After first move
                                {
                                    squares: [
                                    null, null, null,
                                    null, 'X', null,
                                    null, null, null,
                                    ]
                                },
                                ** After second move
                                {
                                    squares: [
                                    null, null, null,
                                    null, 'X', null,
                                    null, null, 'O',
                                    ]
                                },
                                ** ...and so on
                                ]

    ** Now we need to decide which component should own the history state.
 */
//=================================================================================================================================================
/**
  *                                 !LIFTING STATE UP- PART 2
  *
  *     We’ll want the top-level 'Game component' to display a list of past moves.
  *     It will need access to the #history to do that, so we will place the #history state in the top-level 'Game component'.
  *
  *     Placing the #history state into the 'Game component' lets us remove the #squares state from its child 'Board component'.
  *     Just like we “lifted state up” from the 'Square component' into the 'Board component', we are now be lifting it up from the #Board
  *    into the top-level 'Game component'. This gives the 'Game component' full control over the #Board’s data, and lets it instruct the
  *    #Board to render previous turns from the history.
  *
  * *   First, we’ll set up the initial state for the Game component within its constructor:
  *
  * *   Next, we’ll have the Board component receive squares and onClick props from the Game component.
  *
  *     Since we now have a single click handler in Board for many Squares, we’ll need to pass the location of each Square into the onClick handler
  *     to indicate which Square was clicked.
  *
  *     Here are the required steps to transform the Board component:
          **  Delete the constructor in Board.

          **  Replace #this.state.squares[i] with => this.props.squares[i] in Board’s renderSquare.

          **  Replace #this.handleClick(i) with => this.props.onClick(i) in Board’s renderSquare.

          **  Update the Game component’s render function to use the most recent history entry
          ** to determine and display the game’s status:

    *!  Since the Game component is now rendering the game’s status, we can remove the corresponding code from the Board’s render method.

    ** Finally, move the handleClick method from the Board component to the Game component.

    ** Also modify handleClick bcoz the Game component’s state is structured differently.

    ** Within the Game’s handleClick method, we concatenate new history entries onto history.

    *! NOTE
    ** Unlike the array push() method you might be more familiar with, the concat() method doesn’t mutate the original array, so we prefer it.
  *
  *  All the 'Board Comp' needs is the #renderSquare and #render methods. The 'game's state' & the #handleClick methods are already in the
  *  Game component.
  */
//=================================================================================================================================================
/**
 *                                  !SHOWING THE PAST MOVES
 *
 *  We are recording the tic-tac-toe game's history, so we can display it to the player as a list of past moves.
 *
 ** React elements are "JS First Class Objs"- We can pass them around as arguments in our apps.
 ** To render multiple items in React, we can use an array of React elements.

 ** JS arrays have a map() mthd that is commonly used for mapping data to other data.
                e.g const numbers = [1, 2, 3, 4];
                    const double  = numbers.map(x => x * 2);  // [2, 4, 6, 8];
 *
 * We can use the map mthd to map our #history of moves to React elements rep.ing btns on the screen & displaying a list
 * of btns to 'jump' to past moves
 *
 ** Lets #map over the history in the #Game's render mthd.
 *
 *  For each move in the tic-tac-toes’s game’s #history, we create a list item <li> which contains a btn <button>.
 *
 *  The btn has a onClick handler which calls a mthd called this.jumpTo(). We haven't implemented the mthd yet.
 */
//=================================================================================================================================================
/**
*                                        !PICKING A KEY
 *
 * !ERROR
 * !Warning: Each child in an array or iterator should have a unique “key” prop. Check the render method of “Game”.
 *
 ** When we render a list, React stores some info about each rendered list item. When we update a list, React needs to determine what's changed.
 ** We could have added, removed, re-arranged, or updated the list’s items.
 *
 *  We need to specify a specific "key" property for each list item to differentiate each list item from its siblings.
 *
 *  When a list is re-rendered, React takes each list item’s "key" & searches the previous list’s items for a matching "key".
 *
 *  If the current list has a "key" that didn’t exist before, React creates a component.
 *  If the current list is missing a "key" that existed in the previous list, React destroys the previous component.
 *  If two "keys" match, the corresponding component is moved.
 *
 ** Keys tell React about the identity of each component which allows React to maintain state between re-renders.
 *  If a component’s "key" changes, the component will be destroyed and re-created with a new state.
 *
 ** "key" is a special & reserved property in React (along with "ref", a more advanced feature).
 *  When an element is created, React extracts the "key" property & stores the "key" directly on the returned element.
 *
 ** Even though "key" may look like it belongs in 'props', "key" cannot be referenced using 'this.props.key'.
 *
 *! React automatically uses "key" to decide which components to update. A component cannot inquire about its "key".
 *
 *! It’s strongly recommended that you assign proper keys whenever you build dynamic lists.
 ** If you don’t have an appropriate "key", you may want to consider restructuring your data so that you do.
 *
 ** If no "key" is specified, React will present a warning and use the array index as a key by default.
**  Using the array index as a "key" is problematic when trying to re-order a list’s items or inserting/removing list items.
**  Explicitly passing 'key={i}' silences the warning but has the same problems as array indices(index) & is not recommended in most cases.
*
*!  "Keys" don't need to be globally unique; they only need to be unique btwn components & their siblings.
 */
//=================================================================================================================================================
/**
  *                                     !IMPLEMENTING TIME TRAVEL
  *
  * In our game's history, each past move has a unique ID associated with it: It's the sequential # of the move.
  * The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a "key".
  *
  * In the Game component's #render mthd, we can add the key as:
  **            <li key={move}> & React's warning about "keys" should disappear.
 *
 *  "jumpTo mthd" is still undefined, so we're still getting an error for clicking any btns.
 *  We'll add "stepNumber mthd" to the Game component's state to indicate which step we're currently viewing.
 *
 ** 1). Add stepNumber: 0 to the initial state in Game’s constructor:
 *
 ** 2.a). Define the jumpTo method in Game to update that stepNumber.
 **   b). Set xIsNext to true if the number that we’re changing stepNumber to is even.
 *
 *  Changes to be made to the Game's handleClick mthd which fires when you click on a square.
 *
 *  The #stepNumber state we've added reflects the move displayed to the user now.
 *-  After we make a new move, we need to update stepNumber by adding
 **     stepNumber: history.length as part of the this.setState argument.
 *   This ensures we don’t get stuck showing the same move after a new one has been made.
 *
 *-  We also need to replace reading this.state.history with
 **        this.state.history.slice(0, this.state.stepNumber + 1).
 *- This ensures that if we "go back in time" & then make a new move from that point, we throw away all the "future" history
 *- that would now become incorrect.
 *
 *  Finally we will modify the Game component's #render mthd from always rendering the last move to rendering the currently
 * selected move according to #stepNumber
  */
//=================================================================================================================================================
/**
   *                                !WRAPPING UP
   *
   * * What the Tic Tac Toe Game can do:
   *    - Let's you play tic-tac-toe
   *    - Indicates when a player has won the game
   *    - Stores a game's history as a game progress
   *    - Allows players to review a game's history & see previous versions of a game's board.
   */
