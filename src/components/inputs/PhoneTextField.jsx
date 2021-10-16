import React from 'react';
import NumberFormat from 'react-number-format';
import { removeNonDigitsFromString } from '../../utils/basic';

const PhoneTextField = ({ inputRef, onChange, ...other }) => {
  const formatPhone = (value) => {
    const stripped = removeNonDigitsFromString(value);
    const size = stripped ? stripped.length : 0;

    if (size > 10) {
      let finalValue = `(${stripped.slice(0, 2)}`;
      finalValue += `) ${stripped.slice(2, 7)}`;
      finalValue += `-${stripped.slice(7, 11)}`;

      return finalValue;
    }
    let finalValue = `(${stripped.slice(0, 2)}`;
    if (stripped.length > 2) {
      finalValue += `) ${stripped.slice(2, 6)}`;
    }
    if (stripped.length > 6) {
      finalValue += `-${stripped.slice(6)}`;
    }
    return finalValue;
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange(values.formattedValue);
      }}
      format={formatPhone}
    />
  );
};

export default PhoneTextField;
