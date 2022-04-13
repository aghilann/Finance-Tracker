import { AddExpense } from "../Expenses/InputExpense/AddExpense";
import { ExpenseTable } from "../Expenses/ViewExpenses/ExpenseList";
import { Grid } from "@mantine/core";
import { LoadExpenses } from "../Expenses/LoadExpenseValue/LoadExpenses";

export const ExpenseComponentsGrid = (
  <Grid grow>
    <Grid.Col span={12}>
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
