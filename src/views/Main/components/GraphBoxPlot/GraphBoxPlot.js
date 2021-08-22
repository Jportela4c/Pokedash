import React, { useState, useEffect } from 'react';
import { isString } from 'lodash';
import ApexChart from 'react-apexcharts';

import { Wrapper, ChartWrapper, Title } from './GraphBoxPlot.styles';

const GraphBoxPlot = ({ defaultData, getColor, allowedType, setStrongest }) => {
  const [boxplotData, setBoxPlotData] = useState(null);

  useEffect(() => {
    if (!defaultData?.length) {
      return;
    }

    if (allowedType && isString(allowedType)) {
      manageBoxPlotData(
        defaultData.filter(
          item => item.type1.toLowerCase() === allowedType.toLocaleLowerCase()
        )
      );
    } else {
      manageBoxPlotData([...defaultData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedType, defaultData]);

  const manageBoxPlotData = pokemons => {
    if (!pokemons.length) {
      return;
    }

    const getAttributeArray = attr => {
      const allData = pokemons
        .map(item => Number(item[attr]))
        .sort((a, b) => a - b);

      let mediumPos1 = 0;
      let mediumPos2 = 0;

      if (allData.length % 2) {
        mediumPos1 = Math.floor(allData.length / 2);
        mediumPos2 = mediumPos1;
      } else {
        mediumPos1 = allData.length / 2 - 1;
        mediumPos2 = allData.length / 2;
      }

      const minValue = allData[0];
      const maxValue = allData[allData.length - 1];
      const mediumValue = (allData[mediumPos1] + allData[mediumPos2]) / 2;

      const q1Value = () => {
        const q1Array = allData.slice(0, mediumPos1 + 1);
        if (q1Array.length % 2) {
          const q1MediumPos = Math.floor(q1Array.length / 2);
          return q1Array[q1MediumPos];
        } else {
          const q1MediumPos1 = q1Array.length / 2 - 1;
          const q1MediumPos2 = q1Array.length / 2;
          const q1MediumValue1 = q1Array[q1MediumPos1];
          const q1MediumValue2 = q1Array[q1MediumPos2];
          return (q1MediumValue1 + q1MediumValue2) / 2;
        }
      };

      const q3Value = () => {
        const q3Array = allData.slice(mediumPos2);
        if (q3Array.length % 2) {
          const q3MediumPos = Math.floor(q3Array.length / 2);
          return q3Array[q3MediumPos];
        } else {
          const q3MediumPos1 = q3Array.length / 2 - 1;
          const q3MediumPos2 = q3Array.length / 2;
          const q3MediumValue1 = q3Array[q3MediumPos1];
          const q3MediumValue2 = q3Array[q3MediumPos2];
          return (q3MediumValue1 + q3MediumValue2) / 2;
        }
      };

      return [minValue, q1Value(), mediumValue, q3Value(), maxValue];
    };

    const options = {
      chart: {
        type: 'boxPlot',
        height: 320,
      },
      plotOptions: {
        boxPlot: {
          colors: {
            upper: allowedType ? getColor(allowedType) : '#F1F1F1',
            lower: '#A5978B',
          },
        },
      },
    };

    const series = [
      {
        type: 'boxPlot',
        data: [
          {
            x: 'Ataque',
            y: getAttributeArray('attack'),
          },
          {
            x: 'Defesa',
            y: getAttributeArray('defense'),
          },
          {
            x: 'Ataque Sp.',
            y: getAttributeArray('sp_attack'),
          },
          {
            x: 'Defesa Sp.',
            y: getAttributeArray('sp_defense'),
          },
          {
            x: 'Velocidade',
            y: getAttributeArray('speed'),
          },
          {
            x: 'HP',
            y: getAttributeArray('hp'),
          },
        ],
      },
    ];

    setBoxPlotData({ options, series });
  };

  return (
    <Wrapper>
      <Title>Gráfico de Variação de Atributos x Tipos:</Title>
      <ChartWrapper>
        {boxplotData && (
          <ApexChart
            options={boxplotData?.options}
            series={boxplotData?.series}
            type="boxPlot"
            width={'100%'}
          />
        )}
      </ChartWrapper>
    </Wrapper>
  );
};

export default GraphBoxPlot;
