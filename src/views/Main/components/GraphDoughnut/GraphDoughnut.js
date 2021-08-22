import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Wrapper, ChartWrapper, Title } from './GraphDoughnut.styles';

const GraphDoughnut = ({ strongest, getColor }) => {
  const [data, setData] = useState([]);

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

  const renderDoughnut = () => {
    const getChartData = () => {
      const mappedTyped = data.map(item => item.type);
      const dataArrWithSet = new Set(mappedTyped);
      const typeList = [...dataArrWithSet];
      const colorList = typeList.map(item => getColor(item));
      const amountList = typeList.map(type => {
        const typeAmount = data.filter(
          pokemon => pokemon.type === type
        )?.length;
        return typeAmount;
      });

      return {
        datasets: [
          {
            data: amountList,
            backgroundColor: colorList,
          },
        ],
        labels: typeList,
      };
    };

    const getTooltipText = type => {
      return data
        .filter(pokemon => pokemon.type === type)
        .map(pokemon => pokemon.name);
    };

    const options = {
      indexAxis: 'y',
      plugins: {
        tooltip: {
          callbacks: {
            label: context => {
              return `${context?.label} (${context?.raw})`;
            },
            afterLabel: context => {
              return getTooltipText(context?.label);
            },
          },
        },
      },
    };

    return <Doughnut data={getChartData()} options={options} />;
  };

  return (
    <Wrapper>
      <Title>Quantidade de Pokémon por elemento no top 7:</Title>
      <ChartWrapper>{renderDoughnut()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphDoughnut;
