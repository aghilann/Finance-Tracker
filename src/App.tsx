import { useState, useEffect } from "react";
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
import Auth from "./Auth";
import { supabase } from "./supabaseClient";
import Account from "./Account";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ ..._DEFAULT_THEME, colorScheme: colorScheme }}>
        <div className="App">
          <NavigationBar links={links}></NavigationBar>
          {!session ? (
            <Auth />
          ) : (
            <Account key={session.user.id} session={session} />
          )}
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
