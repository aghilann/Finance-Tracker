import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import React from "react";
import { Container, Text } from "@mantine/core";
import { useStyles, GetValues, StatsGroupProps } from "./useStyles";
import "../../App.css";

let foodSum: number | unknown = 0;
let entertainmentSum: number | unknown = 0;
let miscellaneousSum: number | unknown = 0;

type expenseItem = {
  name: string;
  category: string;
  price: number;
};

export const LoadExpenses = () => {
  const { userExpenses, setUserExpenses } = useContext(UserContext);

  useEffect(() => {
    () => {};
  }, [userExpenses]);

  if (userExpenses.Expenses !== undefined) {
    console.log("LOOK BELOW MEE NOW");
    console.log(userExpenses.Expenses);

    foodSum = userExpenses.Expenses.filter(
      (e: expenseItem) => e.category === "Food"
    )
      .map((e: expenseItem) => e.price)
      .reduce((a: number, b: number) => a + b, 0);
    console.log(foodSum);

    entertainmentSum = userExpenses.Expenses.filter(
      (e: expenseItem) => e.category === "Entertainment"
    )
      .map((e: expenseItem) => e.price)
      .reduce((a: number, b: number) => a + b, 0);

    miscellaneousSum = userExpenses.Expenses.filter(
      (e: expenseItem) => e.category === "Miscellaneous"
    )
      .map((e: expenseItem) => e.price)
      .reduce((a: number, b: number) => a + b, 0);
  } else {
    foodSum = 0;
    entertainmentSum = 0;
    miscellaneousSum = 0;
  }

  console.log("foodSum: " + foodSum);
  const { classes } = useStyles();
  let userData: StatsGroupProps = {
    data: [
      {
        title: "Food Expenses",
        stats: `$${foodSum}`, // !!!
        description: "It appears somebody has been hungry.",
      },
      {
        title: "Entertainment Expenses",
        stats: `$${entertainmentSum}`,
        description: "You know all you really need is some Netflix right?",
      },
      {
        title: "Miscellaneous",
        stats: `$${miscellaneousSum}`,
        description: "Inflation, am I right?",
      },
    ],
  };

  const { data } = userData;

  const stats = data.map((stat) => (
    <Container key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </Container>
  ));
  return (
    <>
      <div className={classes.root}>{stats}</div>
    </>
  );
};

// {JSON.stringify(userExpenses.Expenses.Food)}
