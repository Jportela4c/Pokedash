import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

import pokemonCSV from '../../data/pokemon.csv';
import GraphScatter from './components/GraphScatter';
import GraphBar from './components/GraphBar';
import GraphDoughnut from './components/GraphDoughnut';
import GraphRadar from './components/GraphRadar';
import GraphBoxPlot from './components/GraphBoxPlot';
import Legend from './components/Legend';

import { Wrapper } from './Main.styles';

const TYPE_COLORS = [
  { type: 'Bug', color: '#6b8e23' },
  { type: 'Dark', color: '#705848' },
  { type: 'Dragon', color: '#7038F8' },
  { type: 'Electric', color: '#F8D030' },
  { type: 'Fairy', color: '#EE99AC' },
  { type: 'Fighting', color: '#C03028' },
  { type: 'Fire', color: '#F08030' },
  { type: 'Flying', color: '#A890F0' },
  { type: 'Ghost', color: '#705898' },
  { type: 'Grass', color: '#78C850' },
  { type: 'Ground', color: '#E0C068' },
  { type: 'Ice', color: '#98D8D8' },
  { type: 'Normal', color: '#A8A878' },
  { type: 'Poison', color: '#A040A0' },
  { type: 'Psychic', color: '#F85888' },
  { type: 'Rock', color: '#B8A038' },
  { type: 'Steel', color: '#B8B8D0' },
  { type: 'Water', color: '#6890F0' },
];

const Main = () => {
  const [defaultData, setDefaultData] = useState([]);
  const [allowedType, setAllowedType] = useState(null);
  const [strongest, setStrongest] = useState([]);

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

  const onLegendClick = legend => {
    if (legend?.type === allowedType) {
      setAllowedType(null);
    } else {
      setAllowedType(legend?.type);
    }
  };

  const getColor = type =>
    TYPE_COLORS.find(item => item.type.includes(type))?.color;

  return (
    <Wrapper>
      <GraphScatter
        defaultData={defaultData}
        allowedType={allowedType}
        setStrongest={setStrongest}
        getColor={getColor}
      />
      <GraphBar strongest={strongest} getColor={getColor} />
      <GraphDoughnut strongest={strongest} getColor={getColor} />
      <GraphRadar
        defaultData={defaultData}
        strongest={strongest}
        allowedType={allowedType}
        getColor={getColor}
      />
      <GraphBoxPlot
        defaultData={defaultData}
        allowedType={allowedType}
        setStrongest={setStrongest}
        getColor={getColor}
      />
      <Legend
        typeColors={TYPE_COLORS}
        onLegendClick={onLegendClick}
        selectedType={allowedType}
      />
    </Wrapper>
  );
};

export default Main;
