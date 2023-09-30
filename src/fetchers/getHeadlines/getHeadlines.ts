import { TOP_HEADLINES_URL } from "@/common/common";
import { PAGE_SIZE } from "@/common/constants";
import { CountryCodesUnion, CategoriesUnion, Article } from "@/types/common";

/** This sets a conditional restriction for not using country or category with sources*/
type GetPostsArgs =
  | {
      country?: CountryCodesUnion;
      sources?: never;
      pageSize?: number;
      category?: CategoriesUnion;
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
  pageSize = PAGE_SIZE,
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

  try {
    const posts = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_NEWS_API_TOKEN,
      },
    });
    const response = await posts.json();

    return response;
    
  } catch (error) {
    // TODO: show error message to user
    console.error(error);
    return [];
  }
};
