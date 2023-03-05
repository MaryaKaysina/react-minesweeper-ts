export enum CellValue {
  bomb,
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight
};

export enum CellState {
  open,
  visible,
  flagged
};

export type CellType = {
  value: CellValue,
  state: CellState
};
