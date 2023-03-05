import React from 'react';
import { CellState, CellValue } from '../../types';
import './Button.scss';

interface IButton {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
}

const Button = ({ row, col, state, value }: IButton) => {
  const renderContent = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <div className="Bomb"></div>;
      } 

    } else if (state === CellState.flagged) {
      return <div className="Flag"></div>;
    }

    return null;
  };

  return (
    <div className={`Button ${state === CellState.visible ? 'visible' : ''} value-${value}`}>
      {renderContent()}
    </div>
  );
};

export default Button;
