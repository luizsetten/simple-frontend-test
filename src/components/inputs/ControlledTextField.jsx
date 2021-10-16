import React from 'react';
import { TextField as MTextField } from '@material-ui/core';

import { Controller } from 'react-hook-form';

const ControlledTextField = ({
  formProps,
  name,
  ...otherProps
}) => {
  const {
    control, errors, rules, initialValues,
  } = formProps;

  const isError = errors[name] !== undefined;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      defaultValue={initialValues[name]}
      render={({ onChange, onBlur, value }) => (
        <MTextField
          {...otherProps}
          value={value}
          error={isError}
          helperText={errors[name]?.message}
          onChange={(v) => {
            onChange(v);
            if (otherProps.onChange) otherProps.onChange(v);
          }}
          onBlur={async () => {
            onBlur();

            if (otherProps.onBlur) otherProps.onBlur(value);
          }}
        />
      )}
    />
  );
};

export default ControlledTextField;
