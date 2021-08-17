import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import pokemonCSV from '../../data/pokemon.csv';
import GraphScatter from './components/GraphScatter';
import GraphBar from './components/GraphBar';
import GraphRadar from './components/GraphRadar';
import Legend from './components/Legend';

import { Wrapper } from './Main.styles';

const TYPE_COLORS = [
  { type: 'bug', color: '#6b8e23' },
  { type: 'dark', color: '#705848' },
  { type: 'dragon', color: '#7038F8' },
  { type: 'electric', color: '#F8D030' },
  { type: 'fairy', color: '#EE99AC' },
  { type: 'fighting', color: '#C03028' },
  { type: 'fire', color: '#F08030' },
  { type: 'flying', color: '#A890F0' },
  { type: 'ghost', color: '#705898' },
  { type: 'grass', color: '#78C850' },
  { type: 'ground', color: '#E0C068' },
  { type: 'ice', color: '#98D8D8' },
  { type: 'normal', color: '#A8A878' },
  { type: 'poison', color: '#A040A0' },
  { type: 'psychic', color: '#F85888' },
  { type: 'rock', color: '#B8A038' },
  { type: 'steel', color: '#B8B8D0' },
  { type: 'water', color: '#6890F0' },
];

const Main = () => {
  const [defaultData, setDefaultData] = useState([]);
  const [allowedType, setAllowedType] = useState(null);

  useEffect(() => {
    const getFormattedData = async () => {
      try {
        const formattedData = await d3.csv(pokemonCSV, data => data);
        setDefaultData(formattedData);
      } catch (err) {
        console.error(err);
      }
    };

    getFormattedData();
  }, []);

  useEffect(() => {
    console.log('defaultData:', defaultData);
  }, [defaultData]);

  const onLegendClick = legend => {
    if (legend?.type === allowedType) {
      setAllowedType(null);
    } else {
      setAllowedType(legend?.type);
    }
  };

  return (
    <Wrapper>
      <GraphScatter
        defaultData={defaultData}
        typeColors={TYPE_COLORS}
        allowedType={allowedType}
      />
      <GraphBar
        defaultData={defaultData}
        typeColors={TYPE_COLORS}
        allowedType={allowedType}
      />
      <GraphRadar
        defaultData={defaultData}
        typeColors={TYPE_COLORS}
        allowedType={allowedType}
      />
      <Legend typeColors={TYPE_COLORS} onLegendClick={onLegendClick} />
    </Wrapper>
  );
};

export default Main;
