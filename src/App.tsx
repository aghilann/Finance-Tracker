import { useState, useEffect } from "react";
import "./App.css";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  MantineTheme,
  Button,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { links } from "./Data/NavbarData";
import { _DEFAULT_THEME } from "./Data/ThemeObject";
import { supabase } from "./supabaseClient";
import { isEqual } from "lodash";
import { LoadExpenses } from "./Expenses/LoadExpenses";
import { UserContext } from "./UserContext";

export type JSONResponse = { Expenses: ExpenseList };

export interface ExpenseList {
  Food: expenseItem[];
  Entertainment: expenseItem[];
  Miscellaneous: expenseItem[];
}

type expenseItem = any;

const BaseExpense: ExpenseList = {
  Food: [],
  Entertainment: [],
  Miscellaneous: [],
};

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [user, setUser] = useState(null);

  const [userExpenses, setUserExpenses] = useState([BaseExpense]);

  useEffect(() => {
    fetchUserFinances();
    console.log(userExpenses);
  }, []);

  async function fetchUserFinances() {
    let { data } = await supabase
      .from("UserFinanceData")
      .select("Expenses")
      .eq("UserID", `${user.id}`);
    setUserExpenses(data[0]);
    console.log(userExpenses[0]);
  }
  // 5052e355-6387-423c-9cc6-d0b337af37aa

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ ..._DEFAULT_THEME, colorScheme: colorScheme }}>
        <div className="App">
          <UserContext.Provider
            value={{
              user,
              setUser,
              userFinanceData: userExpenses,
              setUserFinanceData: setUserExpenses,
            }}
          >
            <NavigationBar links={links} />
            {user ? user.email : "You are currently logged Out"}
            {JSON.stringify(userExpenses)}
            <Button onClick={fetchUserFinances}></Button>
            <LoadExpenses />
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
