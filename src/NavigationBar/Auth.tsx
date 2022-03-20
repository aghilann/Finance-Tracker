import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Button, ButtonProps, Group, Text } from "@mantine/core";
import { MarkGithubIcon } from "@primer/octicons-react";

export const GithubButton: React.FC<any> = ({ method, message }) => {
  // !!! Change from any type
  const { user } = useContext(UserContext);
  return (
    <Button
      leftIcon={<MarkGithubIcon />}
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[8],
        // theme.colors.dark[theme.colorScheme === "dark" ? 7 : 5],
        color: "#fff",
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[6],
        },
      })}
      onClick={method}
    >
      {message}
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
  console.log(user);
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
        <GithubButton
          method={signOut}
          message={`Sign Out ${user.user_metadata.preferred_username}`}
        >
          Sign Out {user.email}
        </GithubButton>
      </>
    );
  } else {
    return (
      <>
        <GithubButton method={signInWithGithub} message={"Sign In"}>
          Sign In
        </GithubButton>
      </>
    );
  }
};
