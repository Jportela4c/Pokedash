import styled from 'styled-components';
import Select from 'react-select';

export const Wrapper = styled.table`
  display: flex;
  align-items: center;
`;

export const Label = styled.label`
  margin: 0 0.8rem;
  color: white;
  font-size: 1.4rem;
`;

export const StyledSelect = styled(Select)`
  width: 12rem;
`;
