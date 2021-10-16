import React from 'react';
import NumberFormat from 'react-number-format';
import { removeNonDigitsFromString } from '../../utils/basic';

const formatZipCode = (value) => {
  const stripped = removeNonDigitsFromString(value);

  let finalValue = stripped.slice(0, 5);
  if (stripped.length > 5) {
    finalValue += `-${stripped.slice(5, 8)}`;
  }
  return finalValue;
};

const ZipCodeTextField = ({ inputRef, onChange, ...other }) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange(values.formattedValue);
    }}
    format={formatZipCode}
  />
);

export default ZipCodeTextField;
