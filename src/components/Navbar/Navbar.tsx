import Link from "next/link";
import { Fira_Code } from "next/font/google";

import styles from "./Navbar.module.scss";
import LocaleSwitcher from "../LocaleSwitcher/LocalSwitcher";
import { useRouter } from "next/router";
import { CATEGORIES } from "@/common/constants";
import { useTranslation } from "next-i18next";
import { CountrySelector } from "../CountrySelector/CountrySelector";

const inter = Fira_Code({ subsets: ["latin"] });

export default function Navbar() {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("common");

  //TODO: add burger menu for mobile
  return (
    <nav className={`${styles.container} ${inter.className}`}>
      <Link href="/" locale={locale}>
        home
      </Link>
      <CountrySelector />
      {/* FIXME: there is currently an open issue with navigating to the same route with not default locale. (Invariant: attempted to hard navigate to the same URL)
      https://github.com/vercel/next.js/issues/44919 */}
      {CATEGORIES.map((category, i) => {
        return (
          <Link
            key={i}
            href={{
              pathname: "/categories/[category]",
              query: { category },
            }}
            locale={locale}
          >
            {t(category)}
          </Link>
        );
      })}
      <LocaleSwitcher />
    </nav>
  );
}
