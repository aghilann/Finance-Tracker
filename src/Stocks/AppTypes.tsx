export type JSONResponse = { Expenses: ExpenseList };

export interface ExpenseList {
  Food: expenseItem[];
  Entertainment: expenseItem[];
  Miscellaneous: expenseItem[];
}

export type expenseItem = undefined | { string: number };

export type IStock = { name: string; holdings: number };
