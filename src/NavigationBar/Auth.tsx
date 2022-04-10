import { Button, ButtonProps, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";

import { MarkGithubIcon } from "@primer/octicons-react";
import { UserContext } from "../UserContext";
import { supabase } from "../supabaseClient";
import { useContext } from "react";

interface IProps {
  method: any;
  message: string;
}

export const GithubButton: React.FC<IProps> = ({ method, message }) => {
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

  // useEffect(() => {
  //   setSession(supabase.auth.session());
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, [user]);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, [user]);

  async function checkUser() {
    const user = supabase.auth.user();
    // console.dir("🚀 ~ file: Auth.tsx ~ line 61 ~ checkUser ~ user", user)
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
