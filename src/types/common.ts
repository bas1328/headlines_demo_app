import { AVAILIBLE_COUNTRIES } from "@/common/constants";

// this (typeof obj)[keyof typeof obj] pattern + object as const gives us a dynamic union inferred from a readonly object as a single source of truth
export type CountryCodesUnion =
  (typeof AVAILIBLE_COUNTRIES)[keyof typeof AVAILIBLE_COUNTRIES];

export type Categories =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";
