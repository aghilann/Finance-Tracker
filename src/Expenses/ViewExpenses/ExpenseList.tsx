import React, { useState, useContext } from "react";
import {
  Table,
  ScrollArea,
  CloseButton,
  Modal,
  Container,
} from "@mantine/core";
import { UserContext } from "../../UserContext";
import { useStyles, data } from "./data";
import { _DEFAULT_THEME as theme } from "../../Data/ThemeObject";
import { isArray } from "util";
import { useEffect } from "react";

interface UserExpenses {
  Expenses: {
    [category: string]: { [name: string]: number }[];
  };
}

export const ExpenseTable: React.FC = () => {
  /// When real data comes, use { data } and <TableScrollAreaProps>
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { user, setUser, userExpenses, setUserExpenses, fetchUserFinances } =
    useContext(UserContext);
  useEffect(() => null, []);
  interface UserExpenses {
    Expenses: {
      [category: string]: { [name: string]: number }[];
    };
  }

  const dummy: UserExpenses = {
    Expenses: {
      Food: [{ Netflix: 100 }],
      Entertainment: [],
      Miscellaneous: [],
    },
  };

  if (userExpenses.Expenses) {
    const arrExpenses = Object.entries(userExpenses.Expenses)
      .map(
        (
          [category, expenses] // Map each category to [{ name, cost, category }]
        ) =>
          expenses?.map((expense: any) => ({
            // Map each expense from { [name]: cost } to { name, cost, category }
            name: Object.keys(expense)[0],
            cost: Object.values(expense)[0],
            category,
          })) ?? []
      )
      .flat(); // Flatten category arrays into 1 expense array

    console.log(arrExpenses);

    const rows = arrExpenses.map((row) => (
      <tr key={row.name}>
        <td>{row.name}</td>
        <td>${row.cost}</td>
        <td>{row.category}</td>
        <td>
          <CloseButton title="Close popover" size="xl" iconSize={20} />
        </td>
      </tr>
    ));

    return (
      <Container>
        <ScrollArea
          sx={{ height: 300 }}
          onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
        >
          <Table sx={{ minWidth: 700 }}>
            <thead
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Container>
    );
  } else {
    return <p></p>;
  }
};
