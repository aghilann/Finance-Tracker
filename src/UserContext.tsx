import { createContext } from "react";
import { JSONResponse, ExpenseList } from "./App";

const userFinanceData: JSONResponse = {
  Expenses: {
    Food: [],
    Entertainment: [],
    Miscellaneous: [],
  },
};

export const UserContext: React.Context<any> = createContext(userFinanceData);
