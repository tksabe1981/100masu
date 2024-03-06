import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [cellValues, setCellValues] = useState({});
  const [cellStyles, setCellStyles] = useState({});

  useEffect(() => {
    resetGame();
  }, []);

  function generateRandomArray() {
    const array = Array.from({ length: 10 }, (_, i) => i + 1);
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleInputChange = (row, col, value) => {
    setCellValues((prevValues) => ({
      ...prevValues,
      [`${row}-${col}`]: value,
    }));
  };

  const checkAnswers = () => {
    const newCellStyles = {};
    rows.forEach((row) => {
      columns.forEach((col) => {
        const key = `${row}-${col}`;
        const correct = cellValues[key] == row * col;
        newCellStyles[key] = correct ? 'correctCell' : 'incorrectCell';
      });
    });
    setCellStyles(newCellStyles);
  };

  const resetGame = () => {
    setRows(generateRandomArray());
    setColumns(generateRandomArray());
    setCellValues({});
    setCellStyles({});
  };

  return (
    <div className="App">
      <h1>100マス計算</h1>
      <table>
        <thead>
          <tr>
            <th></th> {/* 左上の空欄 */}
            {columns.map((number) => (
              <th key={number} className="rowTitle">{number}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rowNumber) => (
            <tr key={rowNumber}>
              <td className="rowTitle">{rowNumber}</td> {/* 行のタイトル */}
              {columns.map((colNumber) => {
                const key = `${rowNumber}-${colNumber}`;
                return (
                  <td key={key} className={`tableCell ${cellStyles[key] || ''}`}>
                    <input
                      type="text"
                      className="inputCell"
                      value={cellValues[key] || ''}
                      onChange={(e) => handleInputChange(rowNumber, colNumber, e.target.value)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={checkAnswers}>答え合わせ</button>
        <button onClick={resetGame}>再挑戦</button>
      </div>
    </div>
  );
}

export default App;
