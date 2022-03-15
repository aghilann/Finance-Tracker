import { useContext } from "react";
import { UserContext } from "../UserContext";
import React from "react";

export const LoadExpenses = () => {
  const { userFinanceData, setUserFinanceData } = useContext(UserContext);

  return <h1>{JSON.stringify(userFinanceData)}</h1>;
};
