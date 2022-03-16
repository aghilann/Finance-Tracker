import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
import image from "./image.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function Hero() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Where's your <span className={classes.highlight}>money</span>{" "}
              <br /> going?
            </Title>
            <Text color="dimmed" mt="md">
              View your personal your investments and current expenses
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <Check size={12} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>TypeScript based</b> – Built to ensure hell in development
                and no silly bugs in development.
              </List.Item>
              <List.Item>
                <b>Free and open source</b> – all packages have MIT license, you
                can use fork my project and use all of it's dependencies.
              </List.Item>
              <List.Item>
                <b>Supabase Backend</b> – Using PostgreSQL under the hood,
                Supabase allows developers to quickly spin up custom backends
                with full SQL functionality.
              </List.Item>
            </List>

            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() =>
                  window.location.assign(
                    "https://github.com/aghilann/v4/blob/main/static/resume.pdf"
                  )
                }
              >
                Aghilan's Resume
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
                onClick={() =>
                  window.location.assign(
                    "https://github.com/aghilann/Finance-Tracker"
                  )
                }
              >
                Source Code
              </Button>
            </Group>
          </div>
          <Image src={image} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
