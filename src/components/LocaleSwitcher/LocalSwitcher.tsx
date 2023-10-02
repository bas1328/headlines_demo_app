import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./LocalSwitcher.module.scss";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale
  );

  const setCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.active}> {activeLocale} </div>
      <ul>
        {otherLocales.map((locale) => {
          const { pathname, query, asPath } = router;
          return (
            <li key={locale} className={styles.list}>
              <Link
                href={{ pathname, query }}
                as={asPath}
                locale={locale}
                onClick={() => setCookie(locale)}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
