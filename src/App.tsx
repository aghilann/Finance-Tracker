import { useState, useEffect } from "react";
import "./App.css";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  MantineTheme,
  Button,
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
import { RenderInvestments } from "./Stocks/RenderInvestments";
import { BaseExpense, IStock } from "./AppTypes";
import { ExpenseComponentsGrid } from "./ExpenseComponentsGrid";
import AddStock from "./AddStock/AddStock";

export interface expenseItem {
  name: string;
  category: string;
  price: number;
}

export const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [user, setUser] = useState(null);
  const [userExpenses, setUserExpenses] = useState([]);
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

  async function fetchUserFinances(): Promise<void> {
    let { data } = await supabase
      .from("UserFinanceData")
      .select("Expenses")
      .eq("id", `${user.id}`);
    setUserExpenses(data[0]);
  }

  async function fetchUserStocks(): Promise<void> {
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
            {!!user || (
              <div className="diagonal-box animated-background">
                <div className="content">
                  <Hero></Hero>
                </div>
              </div>
            )}
            {user == null || (
              <>
                {ExpenseComponentsGrid}
                <RenderInvestments stocks={stocks} />
                <AddStock></AddStock>
              </>
            )}
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
