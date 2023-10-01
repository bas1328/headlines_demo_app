import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";

import HeadlinesSeo from "@/seo/HeadlinesSeo";
import PaginationButton from "@/components/UI/PaginationButton/PaginationButton";
import { usePagination } from "@/hooks/usePagination";
import { useSeo } from "@/hooks/useSeo";

import { getHeadlines } from "@/fetchers/getHeadlines/getHeadlines";
import { sanitiseResponse } from "@/utils/sanitiseResponse";
import { AVAILIBLE_COUNTRIES, CATEGORIES, PAGE_SIZE } from "@/common/constants";
import { CategoriesUnion, GetHeadlinesResponseType } from "@/types/common";

import styles from "./Category.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const {
    query: { slug },
  } = router;

  const {
    page,
    hasNext,
    setHasNext,
    hasPrev,
    setHasPrev,
    handleNext,
    handlePrev,
  } = usePagination();

  const { t } = useTranslation("common");

  const { data } = useQuery<GetHeadlinesResponseType>(
    ["headlines_by_category", page],
    () =>
      getHeadlines({
        // safe type casting because we reroute to 404 if category is not in CATEGORIES
        category: slug as CategoriesUnion,
        pageSize: PAGE_SIZE,
        page,
        country: AVAILIBLE_COUNTRIES.UNITED_STATES,
      }),
    {
      onSuccess: (data) => {
        if (data?.totalResults) {
          setHasNext(data?.totalResults > page * PAGE_SIZE);
          setHasPrev(page > 1);
        }
      },
    }
  );

  const articles = useMemo(() => {
    return sanitiseResponse(data?.articles);
  }, [data]);

  // save type casting
  const { seoInfo } = useSeo({ articles, slug: slug as string });

  return (
    <>
      <HeadlinesSeo seoInfo={seoInfo} />
      <main className={`${styles.main} ${inter.className}`}>
        {articles?.map((article) => (
          <div key={article.source?.id || article?.publishedAt || article?.url}>
            <h1>{article?.title}</h1>
            <p>{article?.description}</p>
            {article?.urlToImage && (
              <div className={styles.imageContainer}>
                <Image
                  src={article?.urlToImage}
                  alt={article?.title || "Article Image"}
                  fill
                  priority={false}
                  loading="lazy"
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        ))}
        <PaginationButton disabled={!hasPrev} onClick={handlePrev}>
          {t("prev")}
        </PaginationButton>
        <PaginationButton disabled={!hasNext} onClick={handleNext}>
          {t("next")}
        </PaginationButton>
      </main>
    </>
  );
}

export async function getServerSideProps({
  params,
  locale,
  locales,
}: GetStaticPropsContext) {
  const queryClient = new QueryClient();

  const category = params?.slug;

  // type casting is a workaround for typescript's issue with Array.includes
  if (!CATEGORIES.includes(category as CategoriesUnion)) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  await queryClient.prefetchQuery(["headlines_by_category"], () =>
    // type casting is safe because we check if category is in CATEGORIES
    getHeadlines({
      category: category as CategoriesUnion,
      pageSize: PAGE_SIZE,
      country: AVAILIBLE_COUNTRIES.UNITED_STATES,
    })
  );

  return {
    props: {
      locale,
      locales,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
}
