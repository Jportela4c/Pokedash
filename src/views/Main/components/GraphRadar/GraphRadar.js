import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import { isString } from 'lodash';

import Select from '../../../../components/Select';

import { Wrapper, FormWrapper, ChartWrapper, Title } from './GraphRadar.styles';

const GraphRadar = ({ defaultData, getColor, strongest, allowedType }) => {
  const [options, setOptions] = useState([]);
  const [pokemon1, setPokemon1] = useState(options?.[0]);
  const [pokemon2, setPokemon2] = useState(options?.[0]);

  useEffect(() => {
    manageOptionsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedType]);

  useEffect(() => {
    if (defaultData.length && !options.length) {
      manageOptionsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  useEffect(() => {
    if (!strongest) {
      return;
    }

    const { pokemons } = strongest ?? {};

    setPokemon1(options.find(item => item?.value?.name === pokemons[0].name));
    setPokemon2(options.find(item => item?.value?.name === pokemons[1].name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strongest]);

  const manageOptionsList = () => {
    let newOptions = [];

    const sortedPokemon = defaultData.sort(
      (a, b) => a.pokedex_number - b.pokedex_number
    );

    const getFormattedPokemon = item => {
      let getCapitalizedType = string => {
        const firstLetter = string.split('')[0].toUpperCase();
        const capitalizedString = `${firstLetter}${string
          .toLowerCase()
          .split('')
          .splice(1, string.length)
          .join('')}`;

        return capitalizedString;
      };

      return {
        value: {
          name: item.name,
          data: [
            item.attack,
            item.defense,
            item.sp_attack,
            item.sp_defense,
            item.speed,
            item.hp,
          ],
          type: getCapitalizedType(item.type1),
        },
        label: `#${item.pokedex_number} ${item.name}`,
      };
    };

    if (allowedType && isString(allowedType)) {
      newOptions = [
        ...sortedPokemon
          .filter(
            item => item.type1.toLowerCase() === allowedType.toLocaleLowerCase()
          )
          .map(getFormattedPokemon),
      ];
    } else {
      newOptions = [...sortedPokemon.map(getFormattedPokemon)];
    }

    setPokemon1(newOptions[0]);
    setPokemon2(newOptions[1]);

    setOptions(newOptions);
  };

  const renderRadar = () => {
    let datasets = [];

    if (pokemon1 && pokemon2) {
      const { value: value1 } = pokemon1;
      const { value: value2 } = pokemon2;
      datasets.push({
        label: value1.name,
        data: value1.data,
        backgroundColor: `${getColor(value1.type)}50`,
        borderColor: getColor(value1.type),
        pointHoverBackgroundColor: '#fff',
      });
      datasets.push({
        label: value2.name,
        data: value2.data,
        backgroundColor: `${getColor(value2.type)}50`,
        borderColor: getColor(value2.type),
        pointHoverBackgroundColor: '#fff',
      });
    }

    const chartData = {
      labels: [
        'Ataque',
        'Defesa',
        'Ataque Sp.',
        'Defesa Sp.',
        'Velocidade',
        'HP',
      ],
      datasets,
    };

    return <Radar data={chartData} />;
  };

  return (
    <Wrapper>
      <Title>Comparação de atributos entre dois Pokémon:</Title>
      <FormWrapper>
        <Select
          label="Pokémon 1:"
          options={options}
          value={pokemon1}
          onChange={e => setPokemon1(e)}
        />
        <Select
          label="Pokémon 2:"
          options={options}
          value={pokemon2}
          onChange={e => setPokemon2(e)}
        />
      </FormWrapper>
      <ChartWrapper>{renderRadar()}</ChartWrapper>
    </Wrapper>
  );
};

export default GraphRadar;
