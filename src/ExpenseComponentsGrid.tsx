import { Grid } from "@mantine/core";
import { AddExpense } from "./Expenses/InputExpense/AddExpense";
import { LoadExpenses } from "./Expenses/LoadExpenseValue/LoadExpenses";
import { ExpenseTable } from "./Expenses/ViewExpenses/ExpenseList";

export const ExpenseComponentsGrid = (
  <Grid grow>
    <Grid.Col span={8}>
      <LoadExpenses />
    </Grid.Col>
    <Grid.Col span={8}>
      <ExpenseTable />
    </Grid.Col>
    <Grid.Col span={4}>
      <AddExpense />
    </Grid.Col>
  </Grid>
);
