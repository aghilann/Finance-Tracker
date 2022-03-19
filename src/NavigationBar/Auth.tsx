import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Button, ButtonProps, Group, Text } from "@mantine/core";
import { MarkGithubIcon } from "@primer/octicons-react";

export const GithubButton: React.FC = (props: ButtonProps<"button">) => {
  const { user } = useContext(UserContext);
  return (
    <Button
      {...props}
      leftIcon={<MarkGithubIcon />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === "dark" ? 7 : 6],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === "dark" ? 5 : 6],
        },
      })}
    >
      {user.email}
    </Button>
  );
};

export const IsLoggedIn = () => {
  const { user, setUser } = useContext(UserContext);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [user]);

  // const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, [user]);

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
        <GithubButton></GithubButton>
      </>
    );
  }
  return (
    <>
      <Button onClick={signInWithGithub}>Sign In</Button>
    </>
  );
};
