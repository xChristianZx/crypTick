import React from "react";
import HighCharts from "react-highcharts/ReactHighstock.src";
import styled from "styled-components";

const ChartContainer = styled.div`
  border: 1px solid green;
  height: 90%;
  width: 80%;
  margin: 0.5rem;
`;

const Charts = props => {
  if (!props.display) {
    return null;
  }
  const { product_id } = props.data;
  const { chartData } = props;

  console.log("chartData", chartData);
  /*
          RESPONSE FORMAT
    [time,low, high, open, close, volume]
    *NOTE* GDAX returns time in Epoch Unix
*/

  const ohlc = chartData
    .map(item => {
      return [item[0], item[3], item[2], item[1], item[4]];
    })
    .reverse();

  const volume = chartData.map(item => {
    return [item[0], item[5]];
  });

  console.log("HERE I AM", ohlc, volume);

  var config = {
    rangeSelector: {
      selected: 1
    },
    chart: {
      backgroundColor: "dimgray",
      height: "35%"
    },
    title: {
      text: product_id
    },
    series: [
      {
        type: "candlestick",
        name: product_id,
        data: ohlc,
        tooltip: {
          valueDecimals: 2
        }
      }
    ]
  };

  return (
    <ChartContainer>
      <HighCharts config={config} />
    </ChartContainer>
  );
};

export default Charts;
