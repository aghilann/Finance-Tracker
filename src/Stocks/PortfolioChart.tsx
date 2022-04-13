import { Pie, PieChart, Sector, Tooltip } from "recharts";
import React, { useCallback, useEffect } from "react";

import { IStock } from "../AppTypes";
import { renderActiveShape } from "./RenderActiveShape";
import { useMantineTheme } from "@mantine/core";
import { useState } from "react";

interface IProps {
  stocks: Array<IStock>;
  quotes: Array<any>;
}

const stockHoldingsXPrice = (
  stocks: IStock[],
  quotes: any[],
  index: number
): { name: string; value: number } => {
  let res = { name: "", value: 0 };
  if (
    quotes !== undefined &&
    stocks !== undefined &&
    quotes[0].bid !== undefined
  ) {
    let res = {
      name: stocks[index].name,
      value: stocks[index].holdings * quotes[index].bid,
    };
    return res;
  }
};

const PortfolioChart: React.FC<IProps> = ({ quotes, stocks }) => {
  // useState for quotes
  //   useEffect(() => null, [quotes]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const theme = useMantineTheme();
  const gradientTwo = theme.colors[theme.primaryColor][5];

  let data = quotes.map((quote, index) =>
    stockHoldingsXPrice(stocks, quotes, index)
  );

  return (
    <div>
      <PieChart width={window.screen.width} height={window.screen.width / 5}>
        <Pie
          labelLine={false}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={window.screen.width / 2}
          cy={window.screen.width / 10}
          innerRadius={window.screen.width / 18}
          outerRadius={window.screen.width / 12}
          fill={gradientTwo}
          dataKey="value"
          onMouseEnter={onPieEnter}
          isAnimationActive={true}
        />
        <Tooltip
          active={true}
          wrapperStyle={{ width: 0, backgroundColor: "#ccc" }}
        />
      </PieChart>
    </div>
  );
};

export default PortfolioChart;
