import { Article } from "@/types/common";
import { getWordsWithCapitalLetter } from "@/utils/getWordsWithCapitalLetter";
import { OpenGraph } from "next-seo/lib/types";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type UseSeoArgs = {
  slug?: string;
  articles: Article[];
};

/**
 *
 * @description This hook is used to generate SEO information for the page based on the locale and the articles
 */
export const useSeo = ({ slug, articles }: UseSeoArgs) => {
  const { t } = useTranslation("common");

  const url = !slug
    ? `@${process.env.NEXT_PUBLIC_BASE_URL}`
    : `@${process.env.NEXT_PUBLIC_BASE_URL}/category/${slug}`;

  const seoInfo = useMemo(() => {
    return {
      title: t("app_title"),
      seoTitle: t("app_title"),
      description: t("description"),
      canonical: url,
      // OG is set to the first article on the page
      openGraph: {
        url: url,
        title: t("app_title"),
        description: articles?.[0]?.title || t("description"),
        images: [
          {
            url: articles?.[0]?.urlToImage,
            width: 800,
            height: 600,
            alt: articles?.[0]?.title || "Article",
            type: "image/jpeg",
          },
        ],
        siteName: t("app_title"),
      } as OpenGraph,
      // https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives
      robotsProps: {
        nosnippet: true,
        notranslate: true,
        noimageindex: false,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: "none",
        maxVideoPreview: -1,
      },
      // twitter reads OG tags
      twitter: {
        handle: "@handle",
        site: url,
        cardType: "summary_large_image",
      },
      // assuming that any word from the news title, that starts with a capital letter has a potential to be a keyword
      seoKeywords: `${t(slug as string)}, ${getWordsWithCapitalLetter(articles)}
           `,
    };
  }, [t, url, articles, slug]);

  return { seoInfo };
};
