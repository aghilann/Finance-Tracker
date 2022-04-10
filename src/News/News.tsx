import { ArticleCardCreator } from "./ArticleCardCreator";
import React from "react";
import { SimpleGrid } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useQuery } from "react-query";

let url =
  "https://newsapi.org/v2/top-headlines?" +
  "country=us&" +
  "category=business&" +
  "sortBy=popularity&" +
  "apiKey=530221e1d21841e59ab195c815dc13b0";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

export const News = () => {
  const { isLoading, error, data } = useQuery("newsData", () =>
    fetch(url).then((res) => res.json())
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {ArticleCardCreator(data.articles)}
      </SimpleGrid>
    </>
  );
};
