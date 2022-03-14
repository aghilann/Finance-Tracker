import { useState } from "react";
import "./App.css";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  MantineTheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { links } from "./Data/data";
import { _DEFAULT_THEME } from "./Data/ThemeObject";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ ..._DEFAULT_THEME, colorScheme: colorScheme }}>
        <div className="App">
          <NavigationBar links={links}></NavigationBar>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
