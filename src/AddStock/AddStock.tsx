import { Autocomplete, Button, createStyles } from "@mantine/core";
import { BaseSyntheticEvent, useContext, useState } from "react";

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
  root: {
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
      stock: "",
    },
    validate: {
      stock: (value) => (value ? null : "Stock can't be empty"),
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

  return (
    <form
      onSubmit={(event: BaseSyntheticEvent) => {
        event.preventDefault();
        const newStock = { name: form.values.stock, holdings: 0 };
        stocks.push(newStock);
        console.log("🚀 ~ file: AddStock.tsx ~ line 54 ~ newStock", stocks);
        updateUserStocks(stocks);
      }}
    >
      <Autocomplete
        value={form.values.stock}
        data={NASDAQ}
        limit={4}
        className={classes.root}
        onChange={(event) => {
          // // console.log("🚀 ~ file: AddStock.tsx ~ line 39 ~ event", event);
          form.setFieldValue("stock", event);
        }}
      />
      <Button type="submit">Submit Stock</Button>
    </form>
  );
};
