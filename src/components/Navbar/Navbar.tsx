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

  return (
    <nav className={`${styles.container} ${inter.className}`}>
      <Link href="/" locale={locale}>
        home
      </Link>
      <CountrySelector />
      {CATEGORIES.map((category, i) => {
        return (
          <Link
            key={i}
            href={{
              pathname: "/category/[category]",
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