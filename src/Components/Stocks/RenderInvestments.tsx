import { ArrowDownRight, ArrowUpRight } from "tabler-icons-react";
import {
  Container,
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  createStyles,
} from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";

import { AddStock } from "../AddStock/AddStock";
import { IStock } from "./AppTypes";
import PortfolioChart from "./PortfolioChart";
import { UserContext } from "../../Context/UserContext";
import { data } from "../Expenses/ViewExpenses/data";
import { fetchStocks } from "./fetchStocks";
import { useQuery } from "react-query";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface IProps {
  stocks: Array<IStock>;
}

export const RenderInvestments: React.FC<IProps> = ({ stocks }) => {
  const { classes } = useStyles();
  const [quotes, setQuotes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (stocks.length > 0) {
      const stockTickers = stocks.map((stock) => stock.name);
      fetchStocks(stockTickers, setQuotes);
    }
  }, [stocks]);

  const stats = quotes.map((stat: any, i) => {
    const DiffIcon =
      stat.regularMarketChangePercent > 0 ? ArrowUpRight : ArrowDownRight;
    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.longName + Math.floor(Math.random() * 100).toString()}
      >
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.longName} ${Math.abs(stat.regularMarketPrice).toFixed(2)}{" "}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                stat.regularMarketChangePercent > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text
            component="span"
            color={stat.regularMarketChangePercent > 0 ? "teal" : "red"}
            weight={700}
          >
            <span> </span>
            {Math.abs(stat.regularMarketChangePercent).toFixed(2)}%
          </Text>{" "}
          {stat.regularMarketChangePercent > 0 ? "increase" : "decrease"}{" "}
          compared to the last trading day.
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
        <AddStock stocks={stocks} setQuotes={setQuotes} />
        <PortfolioChart stocks={stocks} quotes={quotes} />
      </SimpleGrid>
    </div>
  );
};
