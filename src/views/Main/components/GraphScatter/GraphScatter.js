import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { isString } from 'lodash';

import Select from '../../../../components/Select';

import {
  Wrapper,
  FormWrapper,
  ChartWrapper,
  Title,
} from './GraphScatter.styles';

const OPTIONS = [
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'sp_attack', label: 'Ataque Sp.' },
  { value: 'sp_defense', label: 'Defesa Sp.' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'hp', label: 'HP' },
];

const GraphScatter = ({ defaultData, getColor, allowedType, setStrongest }) => {
  const [data, setData] = useState([]);
  const [optionX, setOptionX] = useState(OPTIONS[0]);
  const [optionY, setOptionY] = useState(OPTIONS[0]);

  useEffect(() => {
    onApplyOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedType, defaultData]);

  useEffect(() => {
    if (!data.length) {
      return;
    }

    const getTopAverage = () => {
      const averageAll = data.map(item => {
        const { x, y } = item;

        return {
          ...item,
          averageValue: (x + y) / 2,
        };
      });

      const sortedAll = averageAll.sort(
        (a, b) => b.averageValue - a.averageValue
      );

      return sortedAll.slice(0, 7);
    };

    setStrongest({
      labelX: optionX.label,
      labelY: optionY.label,
      pokemons: getTopAverage(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onApplyOptions = (axis, option) => {
    let valueX = '';
    let valueY = '';

    if (!option && optionX && optionY) {
      valueX = optionX.value;
      valueY = optionY.value;
    } else if (option && axis) {
      if (axis === 'x') {
        setOptionX(option);
        valueX = option.value;
        valueY = optionY.value;
      } else if (axis === 'y') {
        setOptionY(option);
        valueY = option.value;
        valueX = optionX.value;
      }
    }

    let getCapitalizedType = string => {
      const firstLetter = string.split('')[0].toUpperCase();
      const capitalizedString = `${firstLetter}${string
        .toLowerCase()
        .split('')
        .splice(1, string.length)
        .join('')}`;

      return capitalizedString;
    };

    let newData = defaultData.map(pokemon => ({
      x: Number(pokemon[valueX]),
      y: Number(pokemon[valueY]),
      name: pokemon.name,
      type: getCapitalizedType(pokemon.type1),
      pokedexNumber: pokemon.pokedex_number,
    }));

    if (allowedType && isString(allowedType)) {
      newData = [...newData.filter(item => item.type === allowedType)];
    }

    setData([...newData]);
  };

  const renderScatter = () => {
    const { label: labelX } = optionX;
    const { label: labelY } = optionY;

    const chartData = {
      datasets: [
        {
          label: `${labelX} / ${labelY}`,
          data,
          backgroundColor: context => {
            const pokemon = context?.raw;
            return getColor(pokemon?.type);
          },
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: context => {
              const pokemon = context?.raw;
              const label = `${pokemon?.name}`;
              return label;
            },
            afterLabel: context => {
              const pokemon = context?.raw;
              return [
                `Tipo: ${pokemon.type}`,
                `${labelX}: ${pokemon.x}`,
                `${labelY}: ${pokemon.y}`,
              ];
            },
          },
        },
      },
    };

    return <Scatter data={chartData} options={options} />;
  };

  return (
    <Wrapper>
      <Title>Gráfico de relacionamento entre dois atributos:</Title>
      <FormWrapper>
        <Select
          label="Atributo X:"
          options={OPTIONS}
          value={optionX}
          onChange={e => onApplyOptions('x', e)}
        />
        <Select
          label="Atributo Y:"
          options={OPTIONS}
          value={optionY}
          onChange={e => onApplyOptions('y', e)}
        />
      </FormWrapper>
      <ChartWrapper>{renderScatter()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphScatter;
