import { Fira_Code } from "next/font/google";
import styles from "./Footer.module.scss";
import { CATEGORIES } from "@/common/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const inter = Fira_Code({ subsets: ["latin"] });

export default function Footer() {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("common");

  return (
    <footer className={`${styles.container} ${inter.className}`}>
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
    </footer>
  );
}
