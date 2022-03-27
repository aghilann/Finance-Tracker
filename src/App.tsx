import { useState, useEffect } from "react";
import "./App.css";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  MantineTheme,
  Button,
  Grid,
  Group,
  Modal,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { links } from "./Data/NavbarData";
import { _DEFAULT_THEME } from "./Data/ThemeObject";
import { supabase } from "./supabaseClient";
import { isEqual } from "lodash";
import { UserContext } from "./UserContext";
import { Hero } from "./HeroSection/Hero";
import { AddExpense } from "./Expenses/InputExpense/AddExpense";
import { LoadExpenses } from "./Expenses/LoadExpenseValue/LoadExpenses";
import { ExpenseTable } from "./Expenses/ViewExpenses/ExpenseList";
import { RenderInvestments } from "./Stocks/RenderInvestments";

export type JSONResponse = { Expenses: ExpenseList };

export interface ExpenseList {
  Food: expenseItem[];
  Entertainment: expenseItem[];
  Miscellaneous: expenseItem[];
}

export type expenseItem = undefined | { string: number };

export const BaseExpense: ExpenseList = {
  Food: [],
  Entertainment: [],
  Miscellaneous: [],
};

export type IStock = { name: string; holdings: number };

export const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [user, setUser] = useState(null);
  const [userExpenses, setUserExpenses] = useState([BaseExpense]);
  const [stocks, setUserStocks] = useState<IStock[]>([]);

  useEffect(() => {
    if (!!user) {
      fetchUserFinances();
    }
  }, [user, setUserExpenses]);

  useEffect(() => {
    if (!!user) {
      fetchUserStocks();
    }
  }, [user]);

  async function fetchUserFinances() {
    let { data } = await supabase
      .from("UserFinanceData")
      .select("Expenses")
      .eq("id", `${user.id}`);
    setUserExpenses(data[0]);
  }

  async function fetchUserStocks() {
    let { data, error } = await supabase
      .from("UserFinanceData")
      .select("Investments")
      .eq("id", `${user.id}`);
    setUserStocks(data[0].Investments);
  }
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ..._DEFAULT_THEME, colorScheme: colorScheme }}
        withGlobalStyles
      >
        <div className="App">
          <UserContext.Provider
            value={{
              user,
              setUser,
              userExpenses,
              setUserExpenses,
              fetchUserFinances,
            }}
          >
            <NavigationBar links={links} />
            {!!user || ( // Change true to user after GitHub update
              <div className="diagonal-box animated-background">
                <div className="content">
                  <Hero></Hero>
                </div>
              </div>
            )}
            {user == null || ( // !!! Change false to User after GitHub is online
              <>
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
                  <Grid.Col span={2}>
                    <RenderInvestments stocks={stocks} />
                  </Grid.Col>
                </Grid>
              </>
            )}
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
