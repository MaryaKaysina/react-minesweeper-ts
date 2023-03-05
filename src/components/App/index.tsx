import React, { useEffect, useState } from 'react';
import { COUNT_BOMBS, MAX_COLUMNS, MAX_ROWS, TIME_OF_MINUTES } from '../../constans';
import { CellState, CellType, CellValue, Face } from '../../types';
import { generateCells, openMultipleCells } from '../../utils';
import Button from '../Button';
import NumberDisplay from '../NumberDisplay';
import './App.scss';

const App = () => {
  const [cells, setCells] = useState<CellType[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [timerMinutes, setTimerMinutes] = useState<number>(TIME_OF_MINUTES * 60);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [bombCounter, setBombCounter] = useState<number>(COUNT_BOMBS);
  const [live, setLive] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    const table = document.querySelector('.Body');

    const handleMouseDown = (): void => {
      setFace(Face.oh);
    };

    const handleMouseUp = (): void => {
      setFace(Face.smile);
    };

    table?.addEventListener("mousedown", handleMouseDown);
    table?.addEventListener("mouseup", handleMouseUp);

    return () => {
      table?.removeEventListener("mousedown", handleMouseDown);
      table?.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (live && timerSeconds < 999) {
      const timer = setInterval(() => {
        setTimerSeconds(timerSeconds + 1);
        setTimerMinutes(timerMinutes - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    return () => {};
  }, [live, timerSeconds]);

  useEffect(() => {
    if (hasLost) {
      setFace(Face.lost);
      setLive(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setFace(Face.won);
      setLive(false);
    }
  }, [hasWon]);

  const showAllBombs = (): CellType[][] => {
    const currentCells = cells.slice();
    return currentCells.map(row =>
      row.map(cell => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible
          };
        }

        return cell;
      })
    );
  };

  const handleCellClick = (rowParam: number, colParam: number) => () => {
    let newCells = cells.slice();

    if (!live) {
      let isABomb = newCells[rowParam][colParam].value === CellValue.bomb;
      while (isABomb) {
        newCells = generateCells();
        if (newCells[rowParam][colParam].value !== CellValue.bomb) {
          isABomb = false;
          break;
        }
      }
      setLive(true);
    }

    const currentCell = cells[rowParam][colParam];

    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLUMNS; col++) {
        const current = newCells[row][col];

        if (
          current.value !== CellValue.bomb &&
          current.state === CellState.open
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      newCells = newCells.map(row =>
        row.map(cell => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.find
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);

  };

  const handleCellContext = (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
  {
    e.preventDefault();

    if (!live || bombCounter === 0) return;

    const currentCells = cells.slice();
    const currentCell =  cells[rowParam][colParam];
    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = () => {
    setLive(false);
    setTimerMinutes(TIME_OF_MINUTES * 60);
    setTimerSeconds(0);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
  }

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return (
          <Button
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            state={cell.state}
            value={cell.value}
            red={cell.red}
            onClick={handleCellClick}
            onContext={handleCellContext}
          />
        );
      });
    });
  };

  return (
    <div className="App">
      <div className="Title">Количество оставшихся бомб: {bombCounter}</div>
      <div className="Header">
        <NumberDisplay value={Math.floor(timerMinutes / 60)} />
        <div className={`Face type-${face}`} onClick={handleFaceClick}></div>
        <NumberDisplay value={timerSeconds} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
