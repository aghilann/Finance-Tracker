import "./App.css";

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import { ExpenseComponentsGrid } from "./ExpenseComponentsGrid";
import { Hero } from "./HeroSection/Hero";
import { IStock } from "./AppTypes";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { RenderInvestments } from "./Stocks/RenderInvestments";
import { UserContext } from "./UserContext";
import { _DEFAULT_THEME } from "./Data/ThemeObject";
import { links } from "./Data/NavbarData";
import { supabase } from "./supabaseClient";

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

  const [user, setUser] = useState(null);
  const [userExpenses, setUserExpenses] = useState([]);
  const [stocks, setUserStocks] = useState<IStock[]>([]);

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useEffect(() => {
    if (!!user) {
      fetchUserFinances();
      fetchUserStocks();
    }
  }, [user, setUserExpenses]);

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

  const displayWhenSignedIn = (stocks: IStock[]) => {
    return (
      <>
        {ExpenseComponentsGrid}
        <RenderInvestments stocks={stocks} />
        {/* <AddStock></AddStock> */}
      </>
    );
  };

  const displayWhenLoggedOut = (
    <div className="diagonal-box animated-background">
      <div className="content">
        <Hero />
      </div>
    </div>
  );

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
            {!!user || displayWhenLoggedOut}

            {user == null || displayWhenSignedIn(stocks)}
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
