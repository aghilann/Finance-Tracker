import "./App.css";

import { BaseSyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeBase,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

import { ExpenseComponentsGrid } from "./ExpenseComponentsGrid";
import { Hero } from "./HeroSection/Hero";
import { IColor } from "./Types/IColor";
import { IStock } from "./AppTypes";
import { IUser } from "./Types/IUser";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { News } from "./News/News";
import { RenderInvestments } from "./Stocks/RenderInvestments";
import { ThemePicker } from "./ThemePicker/ThemePicker";
import { UserContext } from "./UserContext";
import { _DEFAULT_THEME } from "./Data/ThemeObject";
import { links } from "./Data/NavbarData";
import { supabase } from "./supabaseClient";

export interface expenseItem {
  name: string;
  category: string;
  price: number;
}
console.log(Object.keys(_DEFAULT_THEME.colors));
export const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [user, setUser] = useState<null | IUser>(null);
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
      .from("userfinancedata")
      .select("Expenses")
      .eq("id", `${user.id}`);
    setUserExpenses(data[0]);
  }

  async function fetchUserStocks(): Promise<void> {
    let { data, error } = await supabase
      .from("userfinancedata")
      .select("Investments")
      .eq("id", `${user.id}`);
    setUserStocks(data[0].Investments);
  }

  const displayWhenSignedIn = (stocks: IStock[]) => {
    return (
      <>
        {ExpenseComponentsGrid}
        <RenderInvestments stocks={stocks} />
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

  const [colorTheme, setColorTheme] =
    useState<MantineThemeBase>(_DEFAULT_THEME);

  const changeColor = (event: BaseSyntheticEvent) => {
    setColorTheme((prevState: MantineThemeBase) => {
      return prevState.primaryColor == "blue"
        ? { ...prevState, primaryColor: "red" }
        : { ...prevState, primaryColor: "blue" };
    });
  };

  console.log("STATE REFRESH");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ ...colorTheme, colorScheme: colorScheme }}
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
            <NavigationBar links={links}>
              <ThemePicker
                colorTheme={colorTheme}
                setColorTheme={setColorTheme}
              />
            </NavigationBar>
            {!!user || displayWhenLoggedOut}
            {user == null || displayWhenSignedIn(stocks)}

            <News></News>
            <Button onClick={changeColor}>Click Me</Button>
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
