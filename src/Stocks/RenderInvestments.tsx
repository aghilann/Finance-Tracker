import React, { useContext, useEffect, useState } from "react";
import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";
import { UserContext } from "../UserContext";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface IProps {
  stocks: string[];
}

export const RenderInvestments: React.FC<IProps> = ({ stocks }) => {
  const { classes } = useStyles();
  const [quotes, setQuotes] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (stocks.length != 0) {
      let url = "";
      stocks.forEach((stock, index) => {
        url += stock;
        if (index != stocks.length) {
          url += "%2C";
        }
      });
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
          "X-RapidAPI-Key":
            "d6a49c2ae0mshf9dafc96f6c764ep1e393cjsn953170446f33",
        },
      };
      fetch(
        `https://mboum-finance.p.rapidapi.com/qu/quote?symbol=${url}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log("Response is above");
          setQuotes(response);
        })
        .catch((err) => console.error(err));
    }
  }, [stocks]);

  const stats = quotes.map((stat: any) => {
    const DiffIcon =
      stat.regularMarketChangePercent > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.longName}
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
            {Math.abs(stat.regularMarketChangePercent).toFixed(2)}%
          </Text>{" "}
          {stat.regularMarketChangePercent > 0 ? "increase" : "decrease"}{" "}
          compared to trading day.
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
};
