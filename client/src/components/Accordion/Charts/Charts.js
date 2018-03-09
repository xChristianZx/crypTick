import React from "react";
import HighCharts from "react-highcharts/ReactHighstock.src";
import styled from "styled-components";

const ChartContainer = styled.div`
  /* border: 1px solid green; */
  height: 90%;
  width: 80%;
  margin: 0.25rem;
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

  const volume = test
    .map(item => {
      return [item[0] * 1000, item[5]];
    })
    .reverse();

  // console.log("HERE I AM", ohlc, volume);

  var config = {
    rangeSelector: {
      buttons: [
        { type: "day", count: 1, text: "1D" },
        { type: "month", count: 1, text: "1M" },
        { type: "all", count: 1, text: "All" }
      ],
      verticalAlign: "bottom",
      enabled: false
    },
    chart: {
      backgroundColor: "rgba(53, 60, 63, 1)",
      // borderColor: 'white',
      // borderWidth: 1,
      height: "50%",
      spacingLeft: 3,
      spacingRight: 3
    },
    title: {
      floating: true,
      text: product_id,
      style: { color: "white", opacity: 0.2, fontSize: "50px" },
      verticalAlign: "middle"
    },
    navigator: {
      enabled: true
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
    tooltip: { split: true },
    xAxis: {
      labels: {
        style: { color: "white" }
      }
    },
    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
          style: { color: "white" }
        },
        // title: {
        //   text: "OHLC"
        // },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true
        }
      },
      {
        labels: {
          align: "right",
          x: -3,
          style: { color: "white" }
        },
        // title: {
        //   text: "Volume"
        // },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2
      }
    ],
    series: [
      {
        type: "candlestick",
        name: product_id,
        id: "chart",
        data: ohlc,
        tooltip: {
          valueDecimals: 2
        },
        dataGrouping: {
          units: [["day", 1]]
        },
        yAxis: 0,
        zIndex: 3
      },
      {
        type: "column",
        name: "Volume",
        linkedTo: "chart",
        data: volume,
        yAxis: 1,
        zIndex: 0,
        dataGrouping: {
          units: [["day", 1]]
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
