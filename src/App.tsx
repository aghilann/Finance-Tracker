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
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { links } from "./Data/NavbarData";
import { _DEFAULT_THEME } from "./Data/ThemeObject";
import { supabase } from "./supabaseClient";
import { isEqual } from "lodash";
import { LoadExpenses } from "./Expenses/LoadExpenses";
import { UserContext } from "./UserContext";
import { Hero } from "./HeroSection/Hero";

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
    if (!!user) {
      fetchUserFinances();
      console.log(userExpenses);
      console.log("Hello");
    }
  }, [user]);

  async function fetchUserFinances() {
    let { data } = await supabase
      .from("UserFinanceData")
      .select("Expenses")
      .eq("UserID", `${user.id}`);
    setUserExpenses(data[0]);
  }
  // let blackColor = _DEFAULT_THEME.colors.dark[7];
  // let lightColor = _DEFAULT_THEME.colors.gray[1];
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
            {/* {!!!user || <Button onClick={fetchUserFinances}>Im Button</Button>} */}
            {user == null || (
              <Grid grow>
                <Grid.Col span={4}>
                  <LoadExpenses />
                </Grid.Col>
                <Grid.Col span={4}>
                  <LoadExpenses />
                </Grid.Col>
                {/* <Grid.Col span={4}>3</Grid.Col>
                <Grid.Col span={4}>4</Grid.Col>
                <Grid.Col span={4}>5</Grid.Col> */}
              </Grid>
            )}
          </UserContext.Provider>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
