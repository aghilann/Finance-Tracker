import { ArticleCard } from "./ArticleCard";
import { IArticle } from "./IArticle";
import React from "react";
import { generateUUID } from "./generateUUID";

export const ArticleCardCreator = (articles: IArticle[]) => {
  return articles.map((article: IArticle) => {
    let dataObject = {
      image: article.urlToImage,
      link: article.url,
      title: article.title,
      rating: "outstanding",
      description: article.description,
      author: {
        name: article.author,
      },
    };
    return <ArticleCard {...dataObject} key={generateUUID()} />;
  });
};
