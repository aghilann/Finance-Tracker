import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button, Text } from "@mantine/core";
import { useContext } from "react";
import { UserContext } from "../App";

export function IsLoggedIn() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // const [user, setUser] = useState(null);

  if (!useContext(UserContext)) {
    const { user, setUser } = useContext(UserContext);
  }
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);

  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }
  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: "github",
    });
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (user) {
    return (
      <>
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
          style={{ fontFamily: "Greycliff CF, sans-serif" }}
        ></Text>
        <Button onClick={signOut}>Sign out {user.email}</Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={signInWithGithub}>Sign In</Button>
    </>
  );
}
