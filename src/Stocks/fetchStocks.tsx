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
      "X-RapidAPI-Key": "d6a49c2ae0mshf9dafc96f6c764ep1e393cjsn953170446f33",
    },
  };
  // fetch(`https://mboum-finance.p.rapidapi.com/qu/quote?symbol=${url}`, options)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     setQuotes(response);
  //   })
  //   .catch((err) => console.error(err)); !!! TODO: Over montly API limit
  setQuotes([]);
};
