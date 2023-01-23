import { useState } from 'react';
import "./App.css"
import Board from "./components/Board";

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquare = newCurrent.squares.slice();
    if (calculateWinner(newSquare) || newSquare[i]) {
      return;
    }
    newSquare[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquare }]);
    setXIsNext(prev => !prev);

    setStepNumber(newHistory.length);
  }
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0); // 그 이동한 곳이 x차례인지 o차례인지 알기위해 짝수일 때마다 true로 설정한다
  }
  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move : //move가 true일 때
      'Go to game start'; // game 시작 전일 때
    return (
      <li key={move}>
        <button className='move-button' onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          handleClick={handleClick} />
        <div className="game-square">
        </div>
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol style={{ listStyle: 'none' }}>{moves}</ol>
      </div>

    </div>
  );
}

export default App;
