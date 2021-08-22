import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { Wrapper, ChartWrapper, Title } from './GraphBar.styles';

const GraphBar = ({ strongest, getColor }) => {
  const [data, setData] = useState([]);
  const { labelX, labelY } = strongest;

  useEffect(() => {
    const { pokemons } = strongest ?? {};

    if (!pokemons?.length) {
      return;
    }

    let newData = pokemons?.map((pokemon, index) => ({
      ...pokemon,
      valueX: pokemon.x,
      valueY: pokemon.y,
      x: pokemon.averageValue,
      y: index,
    }));

    setData([...newData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strongest]);

  const renderBar = () => {
    const chartData = {
      labels: data.map(item => item.name),
      datasets: [
        {
          label: `Pokémons mais fortes - Média ${labelX} / ${labelY}`,
          data,
          backgroundColor: context => {
            const pokemon = context?.raw;
            return getColor(pokemon?.type);
          },
        },
      ],
    };

    const options = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: context => {
              const pokemon = context?.raw;
              return `Tipo: ${pokemon.type}`;
            },
            afterLabel: context => {
              const pokemon = context?.raw;
              return [
                `${labelX}: ${pokemon.valueX}`,
                `${labelY}: ${pokemon.valueY}`,
                `Média: ${pokemon.x}`,
              ];
            },
          },
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  return (
    <Wrapper>
      <Title>Top 7 dos Pokémon com a maior média de poder:</Title>
      <ChartWrapper>{renderBar()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphBar;
