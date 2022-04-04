import React, { BaseSyntheticEvent, useContext, useEffect } from "react";
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
import { expenseItem } from "../../AppTypes";
import { supabase } from "../../supabaseClient";
import { count } from "console";
import "./AddExpense.css";
import { _DEFAULT_THEME as theme } from "../../Data/ThemeObject";

interface expenseObject {
  expenseName: string;
  expenseType: string;
  price: number;
}

let gradientOne = theme.colors[theme.primaryColor][4];
let gradientTwo = theme.colors[theme.primaryColor][7];

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
  const { userExpenses, setUserExpenses, user, setUser, fetchUserFinances } =
    useContext(UserContext);

  async function updateUserFinances(
    currentUserID: string,
    updatedExpenses: Array<any>
  ) {
    const { data, error } = await supabase
      .from("UserFinanceData")
      .update({ Expenses: updatedExpenses })
      .eq("id", currentUserID);

    fetchUserFinances();
  }

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

  const handleForm = (expenseObject: expenseObject) => {
    const expenseType = expenseObject.expenseType;
    const name: string = expenseObject.expenseName;
    const price: number = expenseObject.price;
    if (userExpenses !== undefined && userExpenses.Expenses !== undefined) {
      const newExpense = {
        category: expenseType,
        name: name,
        price: price,
      };

      const newExpenses = [...userExpenses.Expenses, newExpense];
      setUserExpenses(() => (userExpenses.Expenses = newExpenses));
      updateUserFinances(user.id, newExpenses);
      form.setFieldValue("expenseName", "");
      form.setFieldValue("expenseType", null);
      form.setFieldValue("price", 0);
      updateUserFinances(user.id, userExpenses);
    }
  };
  return (
    <Container>
      <form
        onSubmit={form.onSubmit((values: expenseObject) => handleForm(values))}
      >
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
        <Container style={{ marginTop: 15, marginLeft: -15 }}>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: gradientOne, to: gradientTwo }}
          >
            Submit Expense
          </Button>
        </Container>
      </form>
    </Container>
  );
};
function eq(arg0: string, currentUserID: string) {
  throw new Error("Function not implemented.");
}
function setCount(arg0: any) {
  throw new Error("Function not implemented.");
}
