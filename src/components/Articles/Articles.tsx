import Link from "next/link";
import Image from "next/image";

import { Article } from "@/types/common";

import styles from "./Articles.module.scss";

type TArticles = {
  articles: Article[];
};

export default function Articles({ articles }: TArticles) {
  return (
    <>
      {articles?.map((article) => (
        // ids from api are not reliable
        <div key={article.title} className={styles.articleContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={article.urlToImage || "/no-image.png"}
              alt={article?.title || article.description || "Article"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          </div>
          <Link
            href={article.url || ""}
            rel="noopener noreferrer"
            target="_blank"
          >
            <h1>{article?.title}</h1>
          </Link>
          <p>{article?.description}</p>
        </div>
      ))}
    </>
  );
}
