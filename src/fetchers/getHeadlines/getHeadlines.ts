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

export const getHeadlines = async (props: GetPostsArgs) => {
  const url = new URL(TOP_HEADLINES_URL);

  Object.entries(props).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value.toString());
    }
  });
  
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
