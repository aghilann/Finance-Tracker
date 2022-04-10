import { IArticle, INewsResponseJSON } from "./IArticle";

import { ArticleCard } from "./ArticleCard";
import React from "react";
import { generateUUID } from "./generateUUID";

export const ArticleCardCreator = (articles: INewsResponseJSON) => {
  return articles.value
    .filter(
      (article) =>
        article &&
        article.image &&
        article.image.thumbnail &&
        article.image.thumbnail.contentUrl
    )

    .map((article: IArticle) => {
      let articleImageUrl;

      let dataObject = {
        image: articleImageUrl,
        link: article.url,
        title: article.name,
        rating: "outstanding",
        description: article.description,
        author: {
          name: article.provider[0].name,
        },
      };
      return <ArticleCard {...dataObject} key={generateUUID()} />;
    });
};
