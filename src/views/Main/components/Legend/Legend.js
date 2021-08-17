import React from 'react';

import { Wrapper, ListItem, Circle, Text } from './Legend.styles';

const Legend = ({ typeColors, onLegendClick }) => {
  return (
    <Wrapper>
      {typeColors.map(item => (
        <ListItem role="button" onClick={() => onLegendClick?.(item)}>
          <Circle background={item?.color} />
          <Text>{item?.type}</Text>
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default Legend;
