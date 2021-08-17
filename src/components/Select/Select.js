import React from 'react';
import { Wrapper, Label, StyledSelect } from './Select.styles';

const Select = ({ label, value, options, onChange }) => {
  const handleChange = (newValue) => {
    if (newValue) {
      onChange?.(newValue);
    }
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <StyledSelect
        options={options}
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Select;
