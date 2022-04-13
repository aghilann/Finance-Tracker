import React from "react";

export const fetchStocks = (
  stocks: string[],
  setQuotes: {
    (value: React.SetStateAction<string[]>): void;
    (arg0: any): void;
  }
) => {
  let url = "";
  stocks.forEach((stock, index) => {
    url += stock;
    if (index != stocks.length) {
      url += "%2C";
    }
  });
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
      "X-RapidAPI-Key": "bf5d4f95e7msheb9fa35fb111fb6p1d2751jsnb97cb082174b",
    },
  };
  fetch(`https://mboum-finance.p.rapidapi.com/qu/quote?symbol=${url}`, options)
    .then((response) => response.json())
    .then((response) => {
      setQuotes(response);
    })
    .catch((err) => console.error(err));
};
