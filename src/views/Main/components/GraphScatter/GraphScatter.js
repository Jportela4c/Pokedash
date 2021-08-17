import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { isString } from 'lodash';

import Select from '../../../../components/Select';

import { Wrapper, FormWrapper, ChartWrapper } from './GraphScatter.styles';

const OPTIONS = [
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'sp_attack', label: 'Ataque Sp.' },
  { value: 'sp_defense', label: 'Defesa Sp.' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'hp', label: 'HP' },
];

const GraphScatter = ({ defaultData, typeColors, allowedType }) => {
  const [data, setData] = useState([]);
  const [optionX, setOptionX] = useState(OPTIONS[0]);
  const [optionY, setOptionY] = useState(OPTIONS[0]);

  useEffect(() => {
    onApplyOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedType]);

  const onApplyOptions = () => {
    const { value: valueX } = optionX;
    const { value: valueY } = optionY;

    let newData = defaultData.map(pokemon => ({
      x: pokemon[valueX],
      y: pokemon[valueY],
      name: pokemon.name,
      type: pokemon.type1,
    }));

    if (allowedType && isString(allowedType)) {
      newData = [...newData.filter(item => item.type === allowedType)];
    }

    setData([...newData]);
  };

  const onChangeOption = (axis, option) => {
    let valueX = '';
    let valueY = '';

    if (axis === 'x') {
      setOptionX(option);
      valueX = option.value;
      valueY = optionY.value;
    } else if (axis === 'y') {
      setOptionY(option);
      valueY = option.value;
      valueX = optionX.value;
    }

    let newData = defaultData.map(pokemon => ({
      x: pokemon[valueX],
      y: pokemon[valueY],
      name: pokemon.name,
      type: pokemon.type1,
    }));

    if (allowedType && isString(allowedType)) {
      newData = [...newData.filter(item => item.type === allowedType)];
    }

    setData([...newData]);
  };

  const renderScatter = () => {
    const { label: labelX } = optionX;
    const { label: labelY } = optionY;

    const getColor = type => typeColors.find(item => item.type === type)?.color;

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
        tooltip: {
          callbacks: {
            label: context => {
              const pokemon = context?.raw;
              const label = `${pokemon?.name}:`;
              return label;
            },
            afterLabel: context => {
              const pokemon = context?.raw;
              const label = `${labelX} - ${pokemon.x} / ${labelY} - ${pokemon.y} `;
              return label;
            },
          },
        },
      },
    };

    return <Scatter data={chartData} options={options} />;
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Select
          label="Eixo X:"
          options={OPTIONS}
          onChange={e => onChangeOption('x', e)}
        />
        <Select
          label="Eixo Y:"
          options={OPTIONS}
          onChange={e => onChangeOption('y', e)}
        />
      </FormWrapper>
      <ChartWrapper>{renderScatter()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphScatter;
