import React, { BaseSyntheticEvent } from "react";
import {
  createStyles,
  Select,
  TextInput,
  NumberInput,
  Container,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const handleForm = (event: BaseSyntheticEvent) => {
  event.preventDefault();
  console.log();
};

type expenseTypeDef = "Food" | "Entertainment" | "Miscellaneous";

export const AddExpense: React.FC = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      expenseName: "",
      expenseType: "",
      price: 0,
    },

    validate: {
      expenseName: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Enter a Expense Name",
    },
  });

  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          required
          label="Expense Name"
          placeholder="Ice Cream"
          classNames={classes}
          onChange={(event) => {
            form.setFieldValue("expenseName", event.target.value);
            console.log(form.values.expenseName);
          }}
          value={form.values.expenseName}
        />

        <Select
          required
          style={{ marginTop: 20, zIndex: 2 }}
          data={["Food", "Entertainment", "Miscellaneous"]}
          placeholder="Pick one"
          label="Expense Type"
          classNames={classes}
          onChange={(event) => {
            form.setFieldValue("expenseType", event);
            console.log(event);
          }}
          value={form.values.expenseType}
        />

        <NumberInput
          required
          label="Price"
          defaultValue={5}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
          value={form.values.price}
          {...form.getInputProps("price")}
          onChange={(event) => {
            form.setFieldValue("price", event);
            console.log(event);
          }}
        />
        <Button></Button>
      </form>
    </Container>
  );
};
