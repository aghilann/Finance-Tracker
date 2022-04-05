import React, { useEffect } from "react";
import { IStock } from "../AppTypes";
interface IProps {
  stocks: Array<IStock>;
  quotes: Array<any>;
}

// Sum the total value of all stocks
const sumStocks = (quotes: any[], stocks: IStock[]): number => {
  console.log("Below is the quotes in portfolio");
  console.log(quotes);
  let total = 0;
  if (quotes !== undefined) {
    quotes.forEach((quote, i) => {
      total += quote.bid * stocks[i].holdings;
    });
  }
  console.log(total);
  return total;
};

const PortfolioChart: React.FC<IProps> = ({ quotes, stocks }) => {
  // useState for quotes
  //   useEffect(() => null, [quotes]);
  return <div>{sumStocks(quotes, stocks)}</div>;
};

export default PortfolioChart;
