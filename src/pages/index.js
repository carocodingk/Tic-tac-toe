// | 0 | 1 | 2 |
// | 3 | 4 | 5 |
// | 6 | 7 | 8 |

import { useState } from "react";

const initialBoard = [['  0 ', '  1 ', '  2 '], 
                      ['  3 ', '  4 ', '  5 '],
                      ['  6 ', '  7 ', '  8 ']];

function Tile({player, nextTurn, board, setBoard, row, col}) {
  const [tileChosen, setTileChosen] = useState(false) /* Indicates if the tile has been chosen by a player already */
  const [tileOwner, setTileOwner] = useState("   ")

  const markTile = () => {
    if (tileChosen === false){ /* Executes if the tile is up for grabs */
      const updatedBoard = board.map((subBoard, rowIdx)=>{
        return(
        subBoard.map((tile, colIdx)=>{
          if (rowIdx === row && colIdx === col){ /* If this is the tile that was just clicked */
            return player
          }
          else{
            return tile /* return initial value (number) */
          }
        }))
      });

      setBoard(updatedBoard)
      setTileOwner(player)
      setTileChosen(true)
      nextTurn()
    }
  }

  return(
    <div>
      <input className="tile" type="button" value={`  ${tileOwner}  `} onClick={markTile} />
    </div>
  );
}

function TileLine({player, nextTurn, board, setBoard}) {
  let idx = 0

  return(
    <div>
      {board.map((tile, row) => (
        <div className="row">
          {tile.map((s, col) => (
            /* Passes the row and col id of each tile */
            <Tile player={player} nextTurn={nextTurn} board={board} setBoard={setBoard} row={row} col={col} />
          ))}
        </div>
      ))}
    </div>
  );
}


export default function Home() {
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState(initialBoard);

  // Who's playing next
  const nextTurn = () => { 
    if (player === 'X')
      setPlayer('O')
    else 
      setPlayer('X')
  }

  const checkWin = () => {
    console.log(`board ${board}`)
    if ((board[0][0] === board[0][1] && board[0][1] === board[0][2]) ||
        (board[1][0] === board[1][1] && board[1][1] === board[1][2]) ||
        (board[2][0] === board[2][1] && board[2][1] === board[2][2]) ||
        (board[0][0] === board[1][0] && board[1][0] === board[2][0]) ||
        (board[0][1] === board[1][1] && board[1][1] === board[2][1]) ||
        (board[0][2] === board[1][2] && board[1][2] === board[2][2]) ||
        (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0])) {
      return true
    }
    return false
  }

  return (
    <div id="game">
      {!checkWin()?
        <div>
          <h1 className="text">NOW PLAYING:  {player}</h1>
          <div>
            <TileLine player={player} nextTurn={nextTurn} board={board} setBoard={setBoard} />
          </div>
        </div>
        : (
        <div>
          <h1 id="winner" className="text">WINNER: {player === 'O'? 
            'X'
            :
            'O'}</h1>
        </div>
        )
      }
    </div>
  );

}



/* 
NOTES:
1) Start with initial board filled with nulls would not need function to check if tile is chosen... just check if it's filled or not
2) Passing a function that changes states in an upper level does not need to pass the states individually 
*/