import { ArticleCardCreator } from "./ArticleCardCreator";
import React from "react";
import { SimpleGrid } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useQuery } from "react-query";

const options = {
  method: "GET",
  headers: {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    "X-RapidAPI-Key": "ea7888ed26msh18522a4aeb01c8bp1ca26fjsncd5193fd369a",
  },
};

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

const mockData = {
  _type: "News",
  webSearchUrl: "https://www.bing.com/news/search?q=business+news&form=TNSA02",
  value: [
    {
      _type: "NewsArticle",
      name: "Most Americans blame Putin, oil companies for high gas prices: POLL",
      url: "https://www.msn.com/en-us/news/politics/most-americans-blame-putin-oil-companies-for-high-gas-prices-poll/ar-AAW42qB",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.QgNTvuC0wvpYtTepKBDzbC&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "As politicians spar over who's to blame for recent increases in gas prices, a large majority of Americans say oil companies and Russian President Vladimir Putin are major culprits, a new ABC",
      provider: [
        {
          _type: "Organization",
          name: "ABC News",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.-LMnifaGw_NvPvJr_0E9tA&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T13:07:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Biden will speak to India's Modi as U.S. warns India on imports of Russian energy",
      url: "https://www.msn.com/en-us/news/world/biden-will-speak-to-indias-modi-as-us-warns-india-on-imports-of-russian-energy/ar-AAW3WJW",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.W29MO3pXXZINywVYW_PX0i&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "President Joe Biden will virtually meet with Indian Prime Minister Narendra Modi on Monday, the White House said, at a time when the United States has made clear it does not want to see an uptick in",
      provider: [
        {
          _type: "Organization",
          name: "Reuters",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.jFXbg3L7Ce_1pS4_IOR8CA&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T15:02:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Cathie Wood sold 90% of her Twitter stock this year. Then Elon Musk sent the shares soaring — and her stake would be worth $700 million if she'd held onto it.",
      url: "https://www.msn.com/en-us/autos/news/cathie-wood-sold-90-of-her-twitter-stock-this-year-then-elon-musk-sent-the-shares-soaring-and-her-stake-would-be-worth-700-million-if-shed-held-onto-it/ar-AAW3Jqo",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.B3K3ZH4UanH5SCKMmT-C1C&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "Had ARK retained the Twitter stake it held at the end of 2021, it would now be worth over $700 million, versus its current holdings' $62 million.",
      provider: [
        {
          _type: "Organization",
          name: "Markets Insider",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.LrIq_5vxtu4ONs5zIW54FA&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T11:04:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "‘Sonic 2’ Grabs $71 Million as Biggest Covud-Era Kids Movie",
      url: "https://www.msn.com/en-us/money/other/sonic-2-grabs-71-million-as-biggest-covud-era-kids-movie/ar-AAW4dIu",
      description:
        "“Sonic the Hedgehog 2” became the highest-grossing kids movie of the pandemic era, generating an estimated $71 million in its domestic debut in an encouraging sign for theater owners and film studios",
      provider: [
        {
          _type: "Organization",
          name: "Bloomberg",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.yAnAsiiCHte5V2il_I5mug&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T16:32:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "JetBlue, Alaska trim schedules as airlines attempt smoother summer",
      url: "https://www.msn.com/en-us/travel/news/jetblue-alaska-trim-schedules-as-airlines-attempt-smoother-summer/ar-AAW3U11",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.CGkpw604C6cEQE1O0Lq90S&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "Airlines are adding staff and cutting flights in an effort to avoid upheaval as both customer demand and labor shortages persist.JetBlue Airways Corp. this weekend said it would reduce flights in May",
      provider: [
        {
          _type: "Organization",
          name: "FOX News",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.GimbRbdxNxZt1GEL5O0AJg&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T18:18:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Multiple States—Figuring What's Owed When You Live and Work in More Than One State",
      url: "https://www.msn.com/en-us/money/personalfinance/multiple-states-figuring-whats-owed-when-you-live-and-work-in-more-than-one-state/ar-AAW4qiT",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.5OewAK2mflae3ggnEjRATS&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "If you live and/or work in more than one state, how do you determine your state income taxes? TurboTax can help.",
      provider: [
        {
          _type: "Organization",
          name: "TheStreet",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.dsVvdYEiGuqZDGlCaqu-ZQ&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T19:00:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Average US gas price drops 10 cents to $4.27 per gallon",
      url: "https://www.msn.com/en-us/money/markets/average-us-gas-price-drops-10-cents-to-427-per-gallon/ar-AAW4hHi",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.SDM9wtA4XC9gYFCbR_LzPi&pid=News",
          width: 600,
          height: 315,
        },
        isLicensed: true,
      },
      description:
        "The average U.S. price of a gallon of regular-grade gasoline dropped 10 cents over the past two weeks to $4.27 per gallon as oil prices continue to “yo-yo,” industry analyst Trilby Lundberg said",
      provider: [
        {
          _type: "Organization",
          name: "The Hill",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.BO7AWyiZH_p5UNPH6KXa_g&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T18:48:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Cleveland Fed's Mester says inflation elevated through 2023 but trajectory will fall - CBS",
      url: "https://www.msn.com/en-us/money/markets/cleveland-feds-mester-says-inflation-elevated-through-2023-but-trajectory-will-fall-cbs/ar-AAW4a7J",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.gwA9XISJmFmYoBHxEPaxFC&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "Inflation will remain high this year and next even as the Fed moves steadily to lower the pace of price increases, Cleveland Fed president Loretta Mester said Sunday in an interview on CBS' \"Face the",
      provider: [
        {
          _type: "Organization",
          name: "Reuters",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.jFXbg3L7Ce_1pS4_IOR8CA&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T15:59:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Conn. Sales Tax Free Week on Clothing and Footwear Begins Today",
      url: "https://www.msn.com/en-us/money/personalfinance/conn-sales-tax-free-week-on-clothing-and-footwear-begins-today/ar-AAW40IL",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.QiXGJ1ziP3DTZDtyOzTXwC&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "Connecticut’s Sales Tax Free Week begins today and residents are preparing for a little bit of relief at checkout lines. It’s a part of the state’s emergency legislation to create a one-week sales",
      provider: [
        {
          _type: "Organization",
          name: "NBC Connecticut",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.l9WuaNb25kkxER7ehKJGpQ&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T18:58:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "5 things to know about liquefied natural gas and its role in the Ukraine crisis",
      url: "https://www.msn.com/en-us/money/markets/5-things-to-know-about-liquefied-natural-gas-and-its-role-in-the-ukraine-crisis/ar-AAW4qv5",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.kFi_JQ4ZZFiO9pxAENnKxy&pid=News",
          width: 600,
          height: 315,
        },
        isLicensed: true,
      },
      description:
        "The Russian invasion of Ukraine has put a spotlight on the production and trade of liquefied natural gas, a key part of Russia’s energy leverage in Europe. Before the invasion, Russia was Europe’s",
      provider: [
        {
          _type: "Organization",
          name: "The Hill",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.BO7AWyiZH_p5UNPH6KXa_g&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T19:11:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Bank earnings, CPI inflation, retail sales: What to know this holiday-shortened week",
      url: "https://www.msn.com/en-us/money/markets/bank-earnings-cpi-inflation-retail-sales-what-to-know-this-holiday-shortened-week/ar-AAW4pOS",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.Yp-DZoiikPvLZor0ZPV8yC&pid=News",
          width: 1200,
          height: 630,
        },
        isLicensed: true,
      },
      description:
        "A flurry of big bank earnings and fresh inflation data out of Washington are expected to keep investors busy this holiday-shortened trading week. Market participants will also tune in Wednesday for a",
      provider: [
        {
          _type: "Organization",
          name: "Yahoo! Finance",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.fJDJ4f2BFbmOkQx_rnDw3Q&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T18:03:00.0000000Z",
    },
    {
      _type: "NewsArticle",
      name: "Millions of student loan borrowers getting ‘forgiveness' in latest pause",
      url: "https://www.msn.com/en-us/money/personalfinance/millions-of-student-loan-borrowers-getting-forgiveness-in-latest-pause/ar-AAW4nsI",
      image: {
        _type: "ImageObject",
        thumbnail: {
          _type: "ImageObject",
          contentUrl:
            "https://www.bing.com/th?id=OVFT.gFnNh7H6W61ocFKXbWOuhy&pid=News",
          width: 600,
          height: 315,
        },
        isLicensed: true,
      },
      description:
        "President Biden has not only delayed student loan payments for another few months, but he’s also given some borrowers a bit of ‘forgiveness.’ The U.S. Department of Education described the additional",
      provider: [
        {
          _type: "Organization",
          name: "WFLA Tampa",
          image: {
            _type: "ImageObject",
            thumbnail: {
              _type: "ImageObject",
              contentUrl:
                "https://www.bing.com/th?id=ODF.SEGWCiNzAtmXhkrzfPu5Lw&pid=news",
            },
          },
        },
      ],
      datePublished: "2022-04-10T18:10:00.0000000Z",
    },
  ],
};

export const News = () => {
  const { isLoading, error, data } = useQuery("newsData", () => {
    return fetch(
      "https://bing-news-search1.p.rapidapi.com/news/search?q=Finance&freshness=Day&textFormat=Raw&safeSearch=Off",
      options
    ).then((response) => response.json());
  });

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
        {ArticleCardCreator(data)}
      </SimpleGrid>
    </>
  );
};
