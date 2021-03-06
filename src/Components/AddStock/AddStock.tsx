import {
  Autocomplete,
  Box,
  Button,
  NumberInput,
  createStyles,
} from "@mantine/core";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";

import { NYSE } from "./StockList";
import { UserContext } from "../../Context/UserContext";
import { supabase } from "../../Supabase/supabaseClient";
import { useForm } from "@mantine/form";

interface stockType {
  name: string;
  holdings: number;
}

const useStyles = createStyles((theme) => ({
  addTickerTextInput: {
    width: "50%",
    margin: "auto",
    padding: "10px",
    display: "inline-block",
  },

  addTickerButton: {
    margin: "auto",
    padding: "10px",
    display: "inline-block",
    width: "100%",
  },

  addTickerNumberInput: {
    width: "50%",
    margin: "auto",
    padding: "10px",
    display: "inline-block",
  },
}));

interface IProps {
  stocks: { name: string; holdings: number }[];
  setQuotes: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AddStock: React.FC<IProps> = ({ stocks, setQuotes }) => {
  const { user, fetchUserFinances } = useContext(UserContext);
  const { classes } = useStyles();
  const [value, setValue] = useState("");
  const form = useForm({
    initialValues: {
      stock: null,
      holdings: null,
    },
    validate: {
      stock: (value) => (value ? null : "Stock can't be empty"),
      holdings: (value) =>
        /^[1-9]\d*/.test(value.toString()) ? null : "Holdings can't be empty",
    },
  });

  async function updateUserStocks(updatedStocks: stockType[]): Promise<void> {
    const { data, error } = await supabase
      .from("userfinancedata")
      .update({ Investments: updatedStocks })
      .eq("id", user.id);
  }

  return (
    <Box>
      <form
        onSubmit={(event: BaseSyntheticEvent) => {
          event.preventDefault(); // TODO: Update UI without refresh
          const newStock = {
            name: form.values.stock,
            holdings: form.values.holdings,
          };
          stocks.push(newStock);
          form.setFieldValue("stock", null);
          form.setFieldValue("holdings", null);
          updateUserStocks(stocks);
          window.location.reload();
        }}
      >
        <Autocomplete
          required
          value={form.values.stock}
          data={NYSE}
          limit={4}
          className={classes.addTickerTextInput}
          onChange={(event) => {
            form.setFieldValue("stock", event);
          }}
          label="Stock Ticker"
          placeholder="Enter a Stock Ticker"
        />
        <NumberInput
          onChange={(event) => {
            form.setFieldValue("holdings", event);
          }}
          value={form.values.holdings}
          defaultValue={form.values.holdings}
          placeholder="Number of Holdings"
          label="Stock Holdings"
          stepHoldDelay={500}
          stepHoldInterval={(t) => Math.max(1000 / 2 ** t, 25)}
          className={classes.addTickerNumberInput}
          required
        />
        <Button type="submit" className={classes.addTickerButton}>
          Submit Stock
        </Button>
      </form>
    </Box>
  );
};
