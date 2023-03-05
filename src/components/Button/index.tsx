import React from 'react';
import { CellState, CellValue } from '../../types';
import './Button.scss';

interface IButton {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  red?: boolean;
  disabled?: boolean;
  onClick(rowParam: number, colParam: number): (...args: any[]) => void;
  onContext(rowParam: number, colParam: number): (...args: any[]) => void;
}

const Button = ({ row, col, onContext, onClick, state, value, red = false, disabled }: IButton) => {

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
    <button
      className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value} ${disabled ? 'disabled' : ''}`}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
