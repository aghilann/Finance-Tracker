import { useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import React from "react";
import { Container, Text } from "@mantine/core";
import { useStyles, GetValues, StatsGroupProps } from "./useStyles";
import "../../App.css";

let foodSum: number | unknown;
let entertainmentSum: number | unknown;
let miscellaneousSum: number | unknown;

export const LoadExpenses = () => {
  const { userExpenses, setUserExpenses } = useContext(UserContext);
  // console.log(typeof userExpenses);
  // console.log("Hello above");

  const { classes } = useStyles();
  useEffect(() => {
    () => {};
  });
  if (
    userExpenses != undefined &&
    userExpenses.Expenses != undefined &&
    userExpenses.Expenses.Food != undefined
  ) {
    // // console.log("The properties are defined. Stuff works");
    if (userExpenses.Expenses.Food.length != 0) {
      foodSum = Object.values(GetValues(userExpenses.Expenses.Food)).reduce(
        (a: any, b: any) => a + b
      );
    } else {
      // console.log("Food is undefined");
      foodSum = 0;
    }
    if (userExpenses.Expenses.Entertainment.length != 0) {
      entertainmentSum = Object.values(
        GetValues(userExpenses.Expenses.Entertainment)
      ).reduce((a: any, b: any) => a + b);
    } else {
      // console.log("Entertainment sum is undefined");
      entertainmentSum = -1;
    }

    if (userExpenses.Expenses.Miscellaneous.length != 0) {
      miscellaneousSum = Object.values(
        GetValues(userExpenses.Expenses.Miscellaneous)
      ).reduce((a: any, b: any) => a + b);
    } else {
      // console.log("The m is undefined");
      miscellaneousSum = -1;
    }
  } else {
    // console.log("The properties is undefined");
    // console.log(userExpenses);
    foodSum = "Loading";
    entertainmentSum = "Loading";
    miscellaneousSum = "Loading";
  }
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
