export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  bomb
};

export enum CellState {
  open,
  visible,
  flagged,
  find
};

export type CellType = {
  value: CellValue,
  state: CellState,
  red?: boolean,
};

export enum Face {
  smile,
  oh,
  lost,
  won
};
