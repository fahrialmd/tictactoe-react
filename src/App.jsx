import { useState } from "react";

function Square(props) {
	return (
		<>
			<button className="square" onClick={props.onSquareClick}>
				{props.value}
			</button>
		</>
	);
}

function Board(props) {
	const nextPlayer = props.isXNext ? "X" : "O";
	const winner = calculateWinner(props.squares);
	let status = winner
		? "Winner Player: " + winner
		: "Next Player: " + nextPlayer;

	function handleClick(i) {
		if (props.squares[i] || calculateWinner(props.squares)) return;
		const nextSquares = props.squares.slice();
		nextSquares[i] = nextPlayer;
		props.onPlay(nextSquares);
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board">
				<Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
				<Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
				<Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	);
}

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const isXNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	const moves = history.map((squares, move) => {
		let description = "";
		if (move > 0) {
			description = "Go to Move #" + move;
		} else {
			description = "Go to Game Start";
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<div className="game">
			<div className="game-board">
				<Board isXNext={isXNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
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
		if (squares[a] && squares[a] === squares[b] && squares[c]) {
			return squares[a];
		}
	}
	return false;
}
