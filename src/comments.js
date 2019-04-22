/*
        Why Immutability is Important

    In the previous code example, we suggested using the .slice() operator to create a copy
    of the squares array to modify instead of modifying the existing array.
    We’ll now discuss immutability and why immutability is important to learn.

    There are generally 2 approaches to changing data.
    1) To mutate the data by directly changing the data’s values.
    2) To replace the data with a new copy which has the desired changes.

    1) Data Change with Mutation

        var player = {score: 1, name: 'Jeff'};
        player.score = 2;

        Now player is {score: 2, name: 'Jeff'}


    2) Data Change without Mutation

        var player = {score: 1, name: 'Stanley'};
        var newPlayer = Object.assign({}, player, {score: 2});

        Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

    Or if you are using object Spread Syntax Proposal, you can write:
        var newPlayer = {...player, score: 2};

    The end result is the same but by not mutating (or changing the underlying data) directly,
    we gain several benefits described below.

    1) Complex Features Become Simple
    Immutability makes complex features much easier to implement. Later in this tutorial, we will implement
    a “time travel” feature that allows us to review the tic-tac-toe game’s history & “jump back” to previous moves.
    This functionality isn’t specific to games — ability to undo & redo certain actions is a common requirement in apps.
    Avoiding direct data mutation lets us keep previous versions of the game’s history intact, & reuse them later.

    2) Detecting Changes
    Detecting changes in mutable objs is difficult because they are modified directly.
    This detection requires the mutable obj to be compared to previous copies of itself & the entire object tree traversed.

    Detecting changes in immutable objs is considerably easier. If the immutable obj that is being referenced is different
    than the previous one, then the obj has changed.

    3) Determining When to Re-Render in React
    The main benefit of immutability is that it helps build 'pure components' in React. Immutable data can easily determine
    if changes have been made which helps to determine when a component requires re-rendering.

    Learn more about shouldComponentUpdate() & how to build pure components by reading Optimizing Performance.
    https://reactjs.org/docs/optimizing-performance.html#examples

 */