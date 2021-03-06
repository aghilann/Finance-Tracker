import {
  Button,
  Container,
  NumberInput,
  Select,
  TextInput,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext } from "react";

import { UserContext } from "../../../Context/UserContext";
import { supabase } from "../../../Supabase/supabaseClient";
import { useForm } from "@mantine/form";

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
  const { userExpenses, setUserExpenses, user, setUser, fetchUserFinances } =
    useContext(UserContext);

  const theme = useMantineTheme();

  let gradientOne = theme.colors[theme.primaryColor][4];
  let gradientTwo = theme.colors[theme.primaryColor][7];

  async function updateUserFinances(
    currentUserID: string,
    updatedExpenses: expenseObject[]
  ) {
    const { data, error } = await supabase
      .from("userfinancedata")
      .update({ Expenses: updatedExpenses })
      .eq("id", currentUserID);
    fetchUserFinances();
    // Updating database and fetching new data
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
      expenseType: (value) =>
        /^(?!\s*$).+/.test(value) ? null : "Enter a Expense Type",
      price: (value) => (value > 0 ? null : "Enter a valid price"),
    },
  });

  const handleForm = (expenseObject: expenseObject) => {
    const expenseType = expenseObject.expenseType;
    const name: string = expenseObject.expenseName;
    const price: number = expenseObject.price;
    if (userExpenses !== undefined && userExpenses.Expenses !== undefined) {
      const uuid = Math.random().toString(36).substring(2, 15);
      const newExpense = {
        category: expenseType,
        name: name,
        price: price,
        id: uuid,
      };

      const newExpenses = [...userExpenses.Expenses, newExpense];
      setUserExpenses(() => (userExpenses.Expenses = newExpenses));
      updateUserFinances(user.id, newExpenses);
      form.setFieldValue("expenseName", "");
      form.setFieldValue("expenseType", "");
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
            form.setFieldValue("price", parseInt(event.toString()));
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
