import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useMemo } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getHeadlines } from "@/fetchers/getHeadlines/getHeadlines";

import { usePagination } from "@/hooks/usePagination";
import PaginationButton from "@/components/UI/PaginationButton/PaginationButton";

import { sanitiseResponse } from "@/utils/sanitiseResponse";

import { AVAILIBLE_COUNTRIES, PAGE_SIZE } from "@/common/constants";
import { GetHeadlinesResponseType } from "@/types/common";

import styles from "@/styles/Home.module.scss";
import { useSeo } from "@/hooks/useSeo";
import HeadlinesSeo from "@/seo/HeadlinesSeo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    page,
    hasNext,
    setHasNext,
    hasPrev,
    setHasPrev,
    handlePrev,
    handleNext,
  } = usePagination();

  const { t } = useTranslation("common");

  const { data } = useQuery<GetHeadlinesResponseType>(
    ["all_headlines", page],
    () =>
      getHeadlines({
        country: AVAILIBLE_COUNTRIES.UNITED_STATES,
        pageSize: PAGE_SIZE,
        page,
      }),
    {
      onSuccess: (data: { totalResults: number }) => {
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

  const { seoInfo } = useSeo({ articles });

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
                  alt={article?.title || article.description || "Article"}
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
  locale,
  locales,
}: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["all_headlines"], () =>
    getHeadlines({
      country: AVAILIBLE_COUNTRIES.UNITED_STATES,
      pageSize: PAGE_SIZE,
    })
  );

  return {
    props: {
      locale,
      locales,
      ...(await serverSideTranslations(locale || "en", ["common"])),
      dehydratedState: dehydrate(queryClient),
    },
  };
}
