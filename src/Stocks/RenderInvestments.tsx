import React from "react";
import {
  createStyles,
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export const RenderInvestments: React.FC<{ stocks: string[] }> = ({
  stocks,
}) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stocks.map((stock) => {
          return <p key={stock}>{stock}</p>;
        })}
      </SimpleGrid>
    </div>
  );
};
