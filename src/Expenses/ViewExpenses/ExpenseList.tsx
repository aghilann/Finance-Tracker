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
import { forEach } from "lodash";

<<<<<<< Updated upstream
interface UserExpenses {
  Expenses: {
    [category: string]: { [name: string]: number }[];
  };
=======
const data = [
  {
    name: "Bob John",
    company: "Bob Smith Company",
    email: "Elouise.Prohaska@yahoo.com",
  },
];

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; company: string }[];
>>>>>>> Stashed changes
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
      Food: [{ Net: 100 }],
      Entertainment: [],
      Miscellaneous: [],
    },
  };

  const updateExpenseArray = () => {
    if (typeof userExpenses.Expenses !== "undefined") {
      for (const e of userExpenses.Expenses.Food) {
        dummy.Expenses.Food.push(e);
      }

      for (const e of userExpenses.Expenses.Entertainment) {
        dummy.Expenses.Entertainment.push(e);
      }

      for (const e of userExpenses.Expenses.Miscellaneous) {
        dummy.Expenses.Miscellaneous.push(e);
      }
    }
  };

  updateExpenseArray();

  if (userExpenses.Expenses) {
    const arrExpenses = Object.entries(dummy.Expenses)
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

    // console.log(arrExpenses);
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
