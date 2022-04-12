import {
  Button,
  ColorSwatch,
  Group,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Radio, RadioGroup } from "@mantine/core";

import { CheckIcon } from "@modulz/radix-icons";
import { Container } from "@mantine/core";
import { DEFAULT_COLORS } from "../Data/default-colors";
import { MantineThemeBase } from "@mantine/core";
import { Popover } from "@mantine/core";
import React from "react";
import { SimpleGrid } from "@mantine/core";
import { useState } from "react";

interface IProps {
  colorTheme: MantineThemeBase;
  setColorTheme: React.Dispatch<React.SetStateAction<MantineThemeBase>>;
}

const useStyles = createStyles((theme) => ({
  radioGroup: {
    padding: theme.spacing.sm,
  },
}));

// Render a component which allows the user to change global state regarding the colorTheme
export const ThemePicker: React.FC<IProps> = ({
  colorTheme,
  setColorTheme,
}) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const colorPalletes = Object.keys(theme.colors).map(
    (color: string, index: number) => (
      <ColorSwatch
        className={classes.radioGroup}
        size={36}
        key={color}
        component="button"
        color={theme.colors[color][6]}
        onClick={() => {
          setColorTheme((prevState: MantineThemeBase) => {
            return { ...prevState, primaryColor: color };
          });
        }}
        style={{ color: "#fff", cursor: "pointer" }}
      >
        {colorTheme.primaryColor === color && <CheckIcon />}
      </ColorSwatch>
    )
  );

  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <Button onClick={() => setOpened((o) => !o)}>
            Change Color Scheme
          </Button>
        }
        width={260}
        position="top"
        withArrow
      >
        <SimpleGrid cols={5}>{colorPalletes}</SimpleGrid>
      </Popover>
    </>
  );
};
