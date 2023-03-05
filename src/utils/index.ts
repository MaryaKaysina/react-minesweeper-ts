import { MAX_ROWS, MAX_COLUMNS, NUMBER_OF_BOMBS } from '../constans';
import { CellState, CellType, CellValue } from '../types';

interface IGrabAllAdjacentCells {
  topLeftCell: CellType | null;
  topCell: CellType | null;
  topRightCell: CellType | null;
  leftCell: CellType | null;
  rightCell: CellType | null;
  bottomLeftCell: CellType | null;
  bottomCell: CellType | null;
  bottomRightCell: CellType | null;
}

const grabAllAdjacentCells = (cells: CellType[][], rowParam: number, colParam: number): IGrabAllAdjacentCells => {
  const topLeftCell =
    rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  const topRightCell =
    rowParam > 0 && colParam < MAX_COLUMNS - 1
      ? cells[rowParam - 1][colParam + 1]
      : null;
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  const rightCell =
    colParam < MAX_COLUMNS - 1 ? cells[rowParam][colParam + 1] : null;
  const bottomLeftCell =
    rowParam < MAX_ROWS - 1 && colParam > 0
      ? cells[rowParam + 1][colParam - 1]
      : null;
  const bottomCell =
    rowParam < MAX_ROWS - 1 ? cells[rowParam + 1][colParam] : null;
  const bottomRightCell =
    rowParam < MAX_ROWS - 1 && colParam < MAX_COLUMNS - 1
      ? cells[rowParam + 1][colParam + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  };
};

export const generateCells = (): CellType[][] => {
  let cells: CellType[][] = [];

  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLUMNS; col++) {
      cells[row].push({
        value: CellValue.none,
        state: CellState.visible, // TODO
      });
    }
  }

  let bombsPlaced = 0;
  while (bombsPlaced < NUMBER_OF_BOMBS) {
    const randomRow = Math.floor(Math.random() * MAX_ROWS);
    const randomCol = Math.floor(Math.random() * MAX_COLUMNS);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.bomb) {
      cells = cells.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.bomb,
            };
          }

          return cell;
        });
      });
      bombsPlaced++;
    }
  }

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLUMNS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.bomb) {
        continue;
      }

      let numberOfBombs = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
      } = grabAllAdjacentCells(cells, rowIndex, colIndex);

      if (topLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (topRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (leftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (rightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomLeftCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }
      if (bottomRightCell?.value === CellValue.bomb) {
        numberOfBombs++;
      }

      if (numberOfBombs > 0) {
        cells[rowIndex][colIndex] = {
          ...currentCell,
          value: numberOfBombs
        };
      }
    }
  }

  return cells;
};
