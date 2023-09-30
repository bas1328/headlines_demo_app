import { AVAILIBLE_COUNTRIES, CATEGORIES } from "@/common/constants";

// this (typeof obj)[keyof typeof obj] pattern + object as const gives us a dynamic union inferred from a readonly object as a single source of truth
export type CountryCodesUnion =
  (typeof AVAILIBLE_COUNTRIES)[keyof typeof AVAILIBLE_COUNTRIES];

// array[number] with as const gives us a union of all array values with a single source of truth
export type CategoriesUnion = (typeof CATEGORIES)[number];

export type Article = {
  source?: {
    id: string | null;
    name: string;
  };
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
  publishedDate?: Date;
};

export type GetHeadlinesResponseType = {
  status: string;
  totalResults: number;
  articles: Article[];
};
