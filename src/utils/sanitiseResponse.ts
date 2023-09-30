import { Article } from "@/types/common";
/**
 * @description Removes articles with [Removed] in title, content or description and articles from si.com due to incompatability of image hosting issue (to be fixed)
 */
export const sanitiseResponse = (data: Article[] | undefined) => {
  if (!data) return [];
  return data.filter((el) => {
    const filterConditions = [
      el.title === "[Removed]",
      el.content === "[Removed]",
      el.description === "[Removed]",
      el.urlToImage?.includes("www.si.com"),
    ];

    return !filterConditions.includes(true);
  });
};
