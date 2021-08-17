import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { isString } from 'lodash';

import Select from '../../../../components/Select';

import { Wrapper, FormWrapper, ChartWrapper } from './GraphBar.styles';

const OPTIONS = [
  { value: 'attack', label: 'Ataque' },
  { value: 'defense', label: 'Defesa' },
  { value: 'sp_attack', label: 'Ataque Sp.' },
  { value: 'sp_defense', label: 'Defesa Sp.' },
  { value: 'speed', label: 'Velocidade' },
  { value: 'hp', label: 'HP' },
];

const GraphBar = ({ defaultData, typeColors, allowedType }) => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(OPTIONS[0]);

  useEffect(() => {
    onApplyOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedType]);

  const getStrongestPokemon = value => {
    let sortedPokemon = defaultData.sort((a, b) => b[value] - a[value]);

    if (allowedType && isString(allowedType)) {
      sortedPokemon = [
        ...sortedPokemon.filter(item => item.type1 === allowedType),
      ];
    }

    return sortedPokemon.slice(0, 7);
  };

  const onApplyOptions = () => {
    const strongestData = getStrongestPokemon(option?.value);

    let newData = strongestData.map((pokemon, index) => ({
      x: pokemon[option?.value],
      y: index,
      name: pokemon.name,
      type: pokemon.type1,
    }));

    setData([...newData]);
  };

  const onChangeOption = option => {
    setOption(option);

    const strongestData = getStrongestPokemon(option?.value);

    let newData = strongestData.map((pokemon, index) => ({
      x: pokemon[option?.value],
      y: index,
      name: pokemon.name,
      type: pokemon.type1,
      index,
    }));

    setData([...newData]);
  };

  const renderBar = () => {
    const { label } = option;

    const getColor = type => typeColors.find(item => item.type === type)?.color;

    const chartData = {
      labels: data.map(item => item.name),
      datasets: [
        {
          label,
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
        tooltip: {
          callbacks: {
            label: context => {
              const pokemon = context?.raw;
              const label = `${pokemon?.x}`;
              return label;
            },
          },
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Select
          label="Atributo:"
          options={OPTIONS}
          onChange={e => onChangeOption(e)}
        />
      </FormWrapper>
      <ChartWrapper>{renderBar()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphBar;
