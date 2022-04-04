import { useEffect, useState } from "react";
import { Autocomplete, createStyles } from "@mantine/core";
import { NASDAQ } from "./StockList";
import { Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    width: "50%",
    margin: "auto",
    padding: "10px",
    display: "inline-block",
  },
}));

const AddStock: React.FC = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState("");
  // Anytime the value changes comsole log hello
  return (
    <form>
      <Autocomplete
        value={value}
        onChange={setValue}
        data={NASDAQ}
        limit={4}
        className={classes.root}
      />
      <Button>Submit Stock</Button>
    </form>
  );
};

export default AddStock;
