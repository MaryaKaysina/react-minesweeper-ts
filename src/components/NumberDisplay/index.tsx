import React from 'react';
import './numberDisplay.scss';

interface INumberDisplay {
  value: number;
}

const NumberDisplay = ({ value }: INumberDisplay) => {
  const num = value > 0 ? value.toString().padStart(3, '0') : '000';
  return (
    <div className="NumberDisplay">
      <div className={`num-${num[0]}`}></div>
      <div className={`num-${num[1]}`}></div>
      <div className={`num-${num[2]}`}></div>
    </div>
  );
};

export default NumberDisplay;
