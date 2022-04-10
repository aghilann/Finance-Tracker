import {
  Autocomplete,
  Box,
  Button,
  NumberInput,
  createStyles,
} from "@mantine/core";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";

import { NASDAQ } from "./StockList";
import { UserContext } from "../UserContext";
import { fetchStocks } from "../Stocks/fetchStocks";
import { supabase } from "../supabaseClient";
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
  // console.log("🚀 ~ file: AddStock.tsx ~ line 22 ~ stocks", stocks);
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

  async function updateUserStocks(updatedStocks: stockType[]): Promise<any> {
    console.log(
      "🚀 ~ file: AddStock.tsx ~ line 44 ~ updateUserStocks ~ updatedStocks",
      updatedStocks
    );

    const { data, error } = await supabase
      .from("UserFinanceData")
      .update({ Investments: updatedStocks })
      .eq("id", user.id);
  }

  useEffect(() => null, [stocks]);

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
          console.log("🚀 ~ file: AddStock.tsx ~ line 54 ~ newStock", stocks);
          updateUserStocks(stocks);
          window.location.reload();
        }}
      >
        <Autocomplete
          required
          value={form.values.stock}
          data={NASDAQ}
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
