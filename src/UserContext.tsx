import { ExpenseList, JSONResponse } from "./AppTypes";

import { createContext } from "react";

const userFinanceData: JSONResponse = {
  Expenses: {
    Food: [],
    Entertainment: [],
    Miscellaneous: [],
  },
};

export const UserContext: React.Context<any> = createContext({});
