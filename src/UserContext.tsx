import { AnyNsRecord } from "dns";
import { createContext } from "react";
import { JSONResponse, ExpenseList } from "./App";

const userFinanceData: JSONResponse = {
  Expenses: {
    Food: [],
    Entertainment: [],
    Miscellaneous: [],
  },
};

export const UserContext = createContext(userFinanceData);
