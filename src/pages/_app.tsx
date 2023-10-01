import type { AppProps } from "next/app";
import { useState } from "react";
import { CountryContext } from "@/contexts/CountryContext";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { appWithTranslation } from "next-i18next";

import Layout from "@/components/layouts/Layout";
import { CountryCodesUnion } from "@/types/common";
import { AVAILIBLE_COUNTRIES } from "@/common/constants";

import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [selectedCountry, setSelectedCountry] = useState<CountryCodesUnion>(
    AVAILIBLE_COUNTRIES.UNITED_STATES
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CountryContext.Provider
        value={{
          selectedCountry,
          setSelectedCountry,
        }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </CountryContext.Provider>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
