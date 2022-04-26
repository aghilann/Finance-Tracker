import {
  Button,
  CloseButton,
  Container,
  Modal,
  ScrollArea,
  Table,
} from "@mantine/core";
import React, { JSXElementConstructor, useContext, useState } from "react";
import { data, useStyles } from "./data";

import { UserContext } from "../../../Context/UserContext";
import { expenseItem } from "../../../App";
import { forEach } from "lodash";
import { supabase } from "../../../Supabase/supabaseClient";
import { _DEFAULT_THEME as theme } from "../../../Data/ThemeObject";
import { useEffect } from "react";
import { useId } from "@mantine/hooks";

export const ExpenseTable: React.FC = () => {
  const uuid = useId();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const { user, setUser, userExpenses, setUserExpenses, fetchUserFinances } =
    useContext(UserContext);

  let rows = [];
  if (userExpenses != [] && userExpenses.Expenses != undefined) {
    rows = userExpenses.Expenses.map((row: expenseItem) => (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td>${row.price}</td>
        <td>{row.category}</td>
        <td>
          {/* <CloseButton
            onClick={() => {
              setUserExpenses((prev: expenseItem[]) => [
                {
                  category: "Food",
                  name: "Burger",
                  price: 100,
                  id: "6ybwux3okhn",
                },
              ]);
            }}
          ></CloseButton> */}
        </td>
      </tr>
    ));
  }
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
              <th>Cost</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};
