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
  console.log(stocks);
  const { classes } = useStyles();
  const stats = stocks.map((stock) => {
    // const DiffIcon = stock.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stock}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stock}
            </Text>
            <Text weight={700} size="xl">
              {stock}
            </Text>
          </div>
          {/* <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                stock.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} />
          </ThemeIcon> */}
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          {/* /* <Text
            component="span"
            color={stock.diff > 0 ? "teal" : "red"}
            weight={700}
          >
            {stock.diff}%
          </Text>{" "}
          {stock.diff > 0 ? "increase" : "decrease"} compared to last month */}
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
};
