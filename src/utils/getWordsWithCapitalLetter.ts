import { Article } from "@/types/common";
import { isUpperCase } from "./isUpperCase";

export const getWordsWithCapitalLetter = (arr: Article[]) => {
  return arr.map((el) =>
    el.title
      ?.split(" ")
      .filter((el) => isUpperCase(el[0]))
      .join(",")
  );
};
