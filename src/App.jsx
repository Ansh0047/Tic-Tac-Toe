import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


const PLAYERS = {
  X:'Player 1',
  O:'Player 2',
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  // now instead of having two states we can use only only to derive the players turns from game turns
  // so we are deriving the state
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players){
   // checking for the winning condition
   let winner;
   for (const combination of WINNING_COMBINATIONS) {
     const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
     const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
     const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
 
     if (
       firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
       firstSquareSymbol === thirdSquareSymbol
     ) {
       winner = players[firstSquareSymbol];
     }
   } 

   return winner;
}

function deriveGameBoard(gameTurns){
  // setting the gameboard with the turns made by the players
  // map the inner arrays so that we can not make changes to the same original array
  let gameBoard = [...initialGameBoard.map((innerArrays) => [...innerArrays])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}


function App() {
  // useSatate to get the name of the players on every keystroke
  const [players,setPlayers] = useState(PLAYERS);

  // here we have used the concept of list state up to the closest Ancestor component
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  // if we tried all the possibilites and we dont get our winner so its a draw
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));

    // state Change function to set which player turns and store its index and its symbol
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      //  here in the state change function we have added the previous turns (...prevTurns) and added a new turn at the starting
      // which have row,col index with the symbol of the player selcted the square
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  // to restart the game when rematch button is click and it is done by setting the gameTurns to an empty array
  // and pass this function to the gameover component 
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    // changing the name of the player which changed his name by overwriting one of the values
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol] : newName,
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Players */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* the above computed value for winner is defined and have some symbol then it will display this */}
        {/* if there is no winner then undefined will be passed */}
        {(winner || hasDraw) && <GameOver winner={winner} onSelect={handleRestart}/>}

        {/* GameBoard */}
        {/* here the onSelectsquare is used to pass the gameboard thagt which player is currently active */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        
        
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
