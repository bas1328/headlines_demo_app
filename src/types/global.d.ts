declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** MAIN API ENDPOINT */
      NEXT_PUBLIC_BASE_API: string;
      /**
       * API KEY
       */
      NEXT_PUBLIC_NEWS_API_TOKEN: string;
      /**
       * base app url
       */
      NEXT_PUBLIC_BASE_URL: string
    }
  }
}

export {};
