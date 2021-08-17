import styled from 'styled-components';
import { colors } from '../../theme/colors';

export const Wrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${colors.grey};
  position: relative;
`;
