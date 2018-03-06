import React from "react";
import HighCharts from "react-highcharts/ReactHighstock.src";
import styled from "styled-components";

const ChartContainer = styled.div`
  /* border: 1px solid green; */
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
  //90 days
  const test = chartData.slice(0, 89);

  const ohlc = test
    .map(item => {
      return [item[0] * 1000, item[3], item[2], item[1], item[4]];
    })
    .reverse();

  const volume = chartData.map(item => {
    return [item[0], item[5]];
  });

  // console.log("HERE I AM", ohlc, volume);

  var config = {
    rangeSelector: {
      verticalAlign: "bottom",
      enabled: false,
      selected: 1
    },
    chart: {
      backgroundColor: "dimgray",
      height: "50%"
    },
    title: {
      floating: true,
      text: product_id,
      style: { color: "white", opacity: 0.2, fontSize: "50px" },
      verticalAlign: "middle"
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    plotOptions: {
      candlestick: {
        upColor: "limegreen",
        color: "red"
      }
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
