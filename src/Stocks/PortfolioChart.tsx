import { Pie, PieChart, Sector, Tooltip } from "recharts";
import React, { useCallback, useEffect } from "react";

import { IStock } from "./AppTypes";
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
  console.log("🚀 ~ file: PortfolioChart.tsx ~ line 34 ~ stocks", stocks);
  console.log("🚀 ~ file: PortfolioChart.tsx ~ line 34 ~ quotes", quotes);
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
      <PieChart width={theme.spacing.xl * 20} height={theme.spacing.xl * 10}>
        <Pie
          labelLine={true}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={theme.spacing.xl * 10}
          cy={theme.spacing.xl * 5}
          innerRadius={64}
          outerRadius={90}
          fill={gradientTwo}
          dataKey="value"
          onMouseEnter={onPieEnter}
          isAnimationActive={true}
        />
      </PieChart>
    </div>
  );
};

export default PortfolioChart;
