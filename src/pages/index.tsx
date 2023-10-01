import { GetServerSidePropsContext } from "next";
import { Inter } from "next/font/google";
import { useContext, useEffect, useMemo } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getHeadlines } from "@/fetchers/getHeadlines/getHeadlines";

import { usePagination } from "@/hooks/usePagination";
import PaginationButtons from "@/components/PaginationButtons/PaginationButtons";

import { sanitiseResponse } from "@/utils/sanitiseResponse";

import { AVAILIBLE_COUNTRIES, PAGE_SIZE } from "@/common/constants";
import { GetHeadlinesResponseType } from "@/types/common";

import styles from "@/styles/Home.module.scss";
import { useSeo } from "@/hooks/useSeo";
import HeadlinesSeo from "@/seo/HeadlinesSeo";
import Articles from "@/components/Articles/Articles";
import { CountryContext } from "@/contexts/CountryContext";

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

  const { selectedCountry } = useContext(CountryContext);

  const { data, isLoading, refetch } = useQuery<GetHeadlinesResponseType>(
    ["all_headlines", page],
    () =>
      getHeadlines({
        country: selectedCountry,
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

  useEffect(() => {
    refetch();
  }, [selectedCountry, refetch]);

  return (
    <>
      <HeadlinesSeo seoInfo={seoInfo} />
      <main className={`${styles.main} ${inter.className}`}>
        {articles?.length && !isLoading ? (
          <>
            <div className={styles.container}>
              <Articles articles={articles} />
            </div>
            <PaginationButtons
              hasNext={hasNext}
              hasPrev={hasPrev}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </>
        ) : // TODO: add skeleton loader; move buttons out of this container. Currently they are inside to avoid layout shift
        null}
      </main>
    </>
  );
}

export async function getServerSideProps({
  locale,
  locales,
}: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["all_headlines", AVAILIBLE_COUNTRIES.UNITED_STATES],
    () =>
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
