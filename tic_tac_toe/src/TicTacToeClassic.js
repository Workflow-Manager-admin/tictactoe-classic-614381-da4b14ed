import React, { useState } from "react";

// Colors from the spec
const COLORS = {
  primary: "#ffffff",
  secondary: "#222222",
  accent: "#4caf50",
};

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * Main container component for TicTacToe Classic.
   * Manages core game logic (turns, win/draw, reset), styling, and layout.
   **/

  // The 3x3 board as an array of 9 cells
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' always starts
  const [xIsNext, setXIsNext] = useState(true);
  // Explicitly track the winner (null, 'X', or 'O')
  const winner = calculateWinner(board);
  // Track draw
  const isDraw = !winner && board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    /**
     * Handle click event for a board cell.
     * Ignore clicks if the cell is taken or the game is over.
     */
    if (board[idx] || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /** Reset the board and player turn */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    /** Render a single cell with all the right styling and click handling */
    return (
      <button
        key={idx}
        className="ttt-cell"
        onClick={() => handleCellClick(idx)}
        style={{
          color:
            board[idx] === "X"
              ? COLORS.secondary
              : board[idx] === "O"
                ? COLORS.accent
                : COLORS.secondary,
          background: COLORS.primary,
          cursor: board[idx] || winner ? "not-allowed" : "pointer",
          outline:
            winner && winnerLineIncludes(idx, board)
              ? `2px solid ${COLORS.accent}`
              : "none",
        }}
        aria-label={`cell-${idx}`}
        disabled={Boolean(board[idx]) || Boolean(winner)}
      >
        {board[idx]}
      </button>
    );
  }

  // PUBLIC_INTERFACE
  function winnerLineIncludes(idx, board) {
    /**
     * Highlight winning cells if we have a winner.
     * Returns true if idx is part of the winning line.
     */
    const winInfo = getWinnerLine(board);
    return winInfo && winInfo.line.includes(idx);
  }

  // PUBLIC_INTERFACE
  function getStatusMessage() {
    /**
     * Returns the status text to be displayed under the board.
     */
    if (winner) {
      return (
        <span>
          <strong style={{ color: COLORS.accent }}>
            Player {winner} wins!
          </strong>
        </span>
      );
    } else if (isDraw) {
      return (
        <span>
          <strong style={{ color: COLORS.secondary }}>It's a draw!</strong>
        </span>
      );
    } else {
      return (
        <span>
          Turn:{" "}
          <strong
            style={{
              color: xIsNext ? COLORS.secondary : COLORS.accent,
            }}
          >
            Player {xIsNext ? "X" : "O"}
          </strong>
        </span>
      );
    }
  }

  return (
    <div className="ttt-outer-container">
      <h2
        style={{
          textAlign: "center",
          color: COLORS.secondary,
          margin: "28px 0 6px 0",
        }}
      >
        TicTacToe Classic
      </h2>
      <div className="ttt-current-player" style={{
        textAlign: "center",
        color: xIsNext ? COLORS.secondary : COLORS.accent,
        fontWeight: 500,
        fontSize: "1.15rem",
        marginBottom: 16,
      }}>
        {winner || isDraw ? "" : `Current: Player ${xIsNext ? "X" : "O"}`}
      </div>
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="ttt-row">
            {[0, 1, 2].map((col) => renderCell(row * 3 + col))}
          </div>
        ))}
      </div>
      <div
        className="ttt-status"
        style={{
          margin: "22px 0 12px 0",
          textAlign: "center",
          minHeight: 24,
          fontSize: "1.1rem",
        }}
      >
        {getStatusMessage()}
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="ttt-reset-btn"
          style={{
            background: COLORS.accent,
            color: "#fff",
            border: "none",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 6,
            padding: "10px 28px",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(44,44,44,0.07)",
            marginTop: 2,
            letterSpacing: 1,
          }}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Helper: get who won (returns 'X' or 'O'), null if ongoing/draw
function calculateWinner(squares) {
  // Lines for a 3x3 board
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// Returns {line: [x, y, z]} if winner exists, else null
function getWinnerLine(squares) {
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
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line };
    }
  }
  return null;
}

export default TicTacToeClassic;
