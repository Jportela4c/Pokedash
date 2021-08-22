import React from 'react';

import { Wrapper, ListItem, Circle, Text } from './Legend.styles';

const Legend = ({ typeColors, onLegendClick, selectedType }) => {
  return (
    <Wrapper>
      {typeColors.map(item => (
        <ListItem
          key={item?.type}
          role="button"
          onClick={() => onLegendClick?.(item)}
        >
          <Circle background={item?.color} />
          <Text isSelected={selectedType === item?.type}>{item?.type}</Text>
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default Legend;
