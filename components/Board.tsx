import { useEffect, useState } from "react";
import { Square } from "./Square";
type Player = "X" | "O" | "BOTH" | null;

const calculateWinner = (squares: Player[]) => {
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
      squares &&
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
};

export const Board = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  const setSquareValue = (index: number) => {
    const newSquares = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setSquares(newSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }
    if (!w && !squares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  });

  return (
    <div>
      {!winner && <p>Hey {currentPlayer}, it is your turn</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && (
        <p>Congratulations you are both winners</p>
      )}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square
              key={i}
              winner={winner}
              onClick={() => setSquareValue(i)}
              value={squares[i]}
            />
          ))}
      </div>
      <button className="reset" onClick={reset}>
        RESET
      </button>
    </div>
  );
};
