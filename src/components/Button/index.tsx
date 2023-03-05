import React from 'react';
import { CellState, CellValue } from '../../types';
import './Button.scss';

interface IButton {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  red?: boolean;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Button = ({ row, col, onContext, onClick, state, value, red = false }: IButton) => {

  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <div className={`Bomb ${red ? 'Bomb--red' : ''}`}></div>;
      }

    } else if (state === CellState.flagged) {
      return <div className="Flag"></div>;
    } else if (state === CellState.find) {
      return <div className="Find"></div>;
    }

    return null;
  };

  return (
    <div
      className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContent()}
    </div>
  );
};

export default Button;
