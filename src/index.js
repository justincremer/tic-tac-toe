import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
	display: 'flex'
}

const squareStyle = {
	'width':'60px',
	'height':'60px',
	'backgroundColor': '#ddd',
	'margin': '4px',
	'display': 'flex',
	'justifyContent': 'center',
	'alignItems': 'center',
	'fontSize': '20px',
	'color': 'white'
}

const boardStyle = {
	'backgroundColor': '#eee',
	'width': '208px',
	'alignItems': 'center',
	'justifyContent': 'center',
	'display': 'flex',
	'flexDirection': 'column',
	'border': '3px #eee solid'
}

const containerStyle = {
	'display': 'flex',
	'alignItems': 'center',
	'flexDirection': 'column'
}

const instructionsStyle = {
	'marginTop': '5px',
	'marginBottom': '5px',
	'fontWeight': 'bold',
	'fontSize': '16px',
}

const buttonStyle = {
	'marginTop': '15px',
	'marginBottom': '16px',
	'width': '80px',
	'height': '40px',
	'backgroundColor': '#8acaca',
	'color': 'white',
	'fontSize': '16px',
}

const Square = ({inner, callback}) => {
	return (
		<button className="square" style={squareStyle} onClick={callback}>
			{inner ? inner : ""}
		</button>
	);
}

const Board = () => {
	const [data, setData] = useState([]);
	const [current, setCurrent] = useState("X");
	const [winner, setWinner] = useState(null);

	const next = () => current == "X" ? "O" : "X";

	const checkSlice = (xs) =>
		  xs.reduce((valid, i) => valid && data[i] === current, true);

	const checkWin = () => 
		  [[0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
		   [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
		   [0, 4, 8], [2, 4, 6]]             // diagonals
		  .reduce((valid, xs) => valid || checkSlice(xs), false);

	function update(i) {
		if (!data[i] && !winner) {
			let copy = data;
			copy[i] = current;
			setData(copy);
			
			if (!winner)
				if (checkWin())
					setWinner(current);
			
			setCurrent(next());
		}
	}

	function reset() {
		setData([]);
		setCurrent("X");
		setWinner(null);
	}

	const newSquare = (i) => <Square inner={data[i]} callback={() => update(i)}/>;
	const newRow = (i) => (
		<div className="board-row" style={rowStyle}>
			{newSquare((3 * i) + 0)}
			{newSquare((3 * i) + 1)}
			{newSquare((3 * i) + 2)}
		</div>
	);
	
	return (
		<div style={containerStyle} className="gameBoard">
			<div id="statusArea" className="status" style={instructionsStyle}>Current player: <span>{current}</span></div>
			<div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner ? winner : "None"}</span></div>
			<button style={buttonStyle} onClick={reset}>Reset</button>
			<div style={boardStyle}>
				{newRow(0)}
				{newRow(1)}
				{newRow(2)}
			</div>
		</div>
	);
}

const Game = () =>  (
	<div className="game">
		<div className="game-board">
			<Board />
		</div>
	</div>
);

ReactDOM.render(<Game />, document.getElementById('root'));
