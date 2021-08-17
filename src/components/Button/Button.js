import React from 'react';
import { StyledButton } from './Button.styles';

const Button = ({ label, onClick }) => (
  <StyledButton data-testid="button" onClick={onClick}>
    <span>{label}</span>
  </StyledButton>
);

export default Button;
