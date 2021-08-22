import styled from 'styled-components';
import { colors } from '../../../../theme/colors';

export const Wrapper = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1.6rem;
  background: ${colors.lightGrey};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  height: 1.6rem;
  cursor: pointer;
`;

export const Circle = styled.div`
  width: 0.4rem;
  height: 0.4rem;
  background: ${({ background }) => background};
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  margin-right: 0.4rem;
`;

export const Text = styled.span`
  color: white;
  font-size: 0.8rem;
  font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'regular')};
`;
