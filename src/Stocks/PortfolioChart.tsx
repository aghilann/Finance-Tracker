import React, { useEffect } from "react";

import { IStock } from "../AppTypes";

interface IProps {
  stocks: Array<IStock>;
  quotes: Array<any>;
}

const sumStocks = (quotes: any[], stocks: IStock[]): number => {
  // console.log(
  // "🚀 ~ file: PortfolioChart.tsx ~ line 12 ~ sumStocks ~ quotes",
  // quotes
  // );
  let total = 0;
  if (quotes !== undefined) {
    quotes.forEach((quote, i) => {
      total += quote.bid * stocks[i].holdings;
      // console.log(
      // "🚀 ~ file: PortfolioChart.tsx ~ line 19 ~ quotes.forEach ~ total",
      // total
      // );
    });
  }

  return total;
};

const PortfolioChart: React.FC<IProps> = ({ quotes, stocks }) => {
  // useState for quotes
  //   useEffect(() => null, [quotes]);
  return <div>{sumStocks(quotes, stocks)}</div>;
};

export default PortfolioChart;
