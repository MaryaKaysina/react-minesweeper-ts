import React from 'react';
import './numberDisplay.scss';

interface INumberDisplay {
  value: number;
}

const NumberDisplay = ({ value }: INumberDisplay) => {
  return <div className="NumberDisplay">{value.toString().padStart(3, '0')}</div>;
};

export default NumberDisplay;
