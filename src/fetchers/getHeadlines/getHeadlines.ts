import { TOP_HEADLINES_URL } from "@/common/common";
import { Categories, CountryCodesUnion } from "@/types/common";

/** This sets a conditional restriction for not using country or category with sources*/
type GetPostsArgs =
  | {
      country?: CountryCodesUnion;
      sources?: never;
      pageSize?: number;
      category?: Categories;
      q?: string;
      page?: number;
    }
  | {
      country?: never;
      sources: string;
      pageSize?: number;
      category?: never;
      q?: string;
      page?: number;
    };

export const getHeadlines = async ({
  country,
  pageSize = 10,
  category,
  q,
  page,
  sources,
}: GetPostsArgs) => {
  const url = new URL(TOP_HEADLINES_URL);

  if (country) url.searchParams.append("country", country);
  if (pageSize) url.searchParams.append("pageSize", pageSize.toString());
  if (category) url.searchParams.append("category", category);
  if (q) url.searchParams.append("q", q);
  if (page) url.searchParams.append("page", page.toString());
  if (sources) url.searchParams.append("sources", sources);

  const posts = await fetch(url, {
    headers: {
      "X-Api-Key": process.env.NEXT_PUBLIC_NEWS_API_TOKEN,
    },
  });

  const { articles } = await posts.json();

  return articles;
};
