import React from "react";
import HighCharts from "react-highcharts/ReactHighstock.src";
import styled from "styled-components";

const ChartContainer = styled.div`
  /* border: 1px solid green; */
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 90%;
  width: 95%;
  margin: 0.25em auto 0.5em;
  padding: 0.5rem;
  flex: 2;
`;

const Charts = props => {
  if (!props.display) {
    return null;
  }

  const { chartData, currentTicker } = props;

  console.log("chartData", chartData);
  /* RESPONSE FORMAT- [time,low, high, open, close, volume]
     NOTE - GDAX returns time in Epoch Unix
  */

  /* 90 days */
  // const test = chartData.slice(0, 89);

  const ohlc = chartData
    .map(item => {
      return [item[0] * 1000, item[3], item[2], item[1], item[4]];
    })
    .reverse();

  const volume = chartData
    .map(item => {
      return [item[0] * 1000, item[5]];
    })
    .reverse();

  const hsConfig = {
    rangeSelector: {
      buttons: [
        { type: "month", count: 1, text: "1M" },
        { type: "month", count: 3, text: "3M" },
        { type: "ytd", text: "YTD" },
        { type: "all", text: "All" }
      ],
      buttonTheme: {
        // styles for the buttons
        fill: "none",
        stroke: "none",
        "stroke-width": 0,
        r: 8,
        style: {
          color: "white",
          fontWeight: "bold"
        },
        states: {
          hover: {
            style: { color: "black" }
          },
          select: {
            fill: "gray",
            style: {
              color: "white"
            }
          }
        }
      },
      verticalAlign: "bottom",
      enabled: true,
      inputStyle: {
        color: "white",
        fontWeight: "regular"
      },
      labelStyle: {
        color: "gray",
        fontWeight: "regular"
      }
    },
    chart: {
      backgroundColor: "rgba(53, 60, 63, 1)",
      borderColor: "gray",
      borderWidth: 1,
      height: "60%",
      // margin: [0, 0, 0, 0],
      width: 950
      // spacingLeft: 3,
      // spacingRight: 3
    },
    // title: {
    //   floating: true,
    //   text: currentTicker,
    //   style: { color: "white", opacity: 0.2, fontSize: "50px" },
    //   verticalAlign: "top"
    // },
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
        name: currentTicker,
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
      <HighCharts config={hsConfig} />
    </ChartContainer>
  );
};

export default Charts;
