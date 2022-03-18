import React, { BaseSyntheticEvent, useContext } from "react";
import { UserContext } from "../../UserContext";
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
import { expenseItem } from "../../App";

interface expenseObject {
  expenseName: string;
  expenseType: string;
  price: number;
}

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

type expenseTypeDef = "Food" | "Entertainment" | "Miscellaneous";

export const AddExpense: React.FC = () => {
  const { classes } = useStyles();
  const { userExpenses, setUserExpenses } = useContext(UserContext);
  const form: any = useForm({
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

  const handleForm = (expenseObject: expenseObject) => {
    event.preventDefault();
    console.log("HandleForm is below");
    const price: number = expenseObject.price;
    const name: string = expenseObject.expenseName;
    const expenseType = expenseObject.expenseType;
    var UserInputObject = {};
    UserInputObject[name] = price;
    // if (UserInputObject != undefined) {
    console.log(UserInputObject);
    // UserInputObject[name] = price;
    console.log(userExpenses);
    console.log("Check below");
    const temp = userExpenses.Expenses[expenseType].push(UserInputObject);
    console.log(userExpenses);
    console.log(`User Expenses is of type ${typeof userExpenses}`);
    form.setFieldValue("expenseName", "");
    form.setFieldValue("expenseType", null);
    form.setFieldValue("price", 0);
    console.log(userExpenses);
    // }
  };
  return (
    <Container>
      <form onSubmit={form.onSubmit((values: any) => handleForm(values))}>
        {/* form.onSubmit((values) => console.log(values)) */}
        <TextInput
          required
          label="Expense Name"
          placeholder="Ice Cream"
          classNames={classes}
          onChange={(event) => {
            form.setFieldValue("expenseName", event.target.value);
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
          }}
          value={form.values.expenseType}
        />

        <NumberInput
          required
          label="Price"
          defaultValue={0}
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
          }}
        />
        <Button type="submit"></Button>
      </form>
    </Container>
  );
};
