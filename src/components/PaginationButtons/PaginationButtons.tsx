import PaginationButton from "../UI/PaginationButton/PaginationButton";

import { useTranslation } from "next-i18next";

import styles from "./PaginationButtons.module.scss";

type TPaginationButtons = {
  hasNext: boolean;
  hasPrev: boolean;
  handleNext: () => void;
  handlePrev: () => void;
};

export default function PaginationButtons({
  hasNext,
  hasPrev,
  handleNext,
  handlePrev,
}: TPaginationButtons) {
  const { t } = useTranslation("common");

  return (
    <div className={styles.container}>
      <PaginationButton disabled={!hasPrev} onClick={handlePrev}>
        {t("prev")}
      </PaginationButton>
      <PaginationButton disabled={!hasNext} onClick={handleNext}>
        {t("next")}
      </PaginationButton>
    </div>
  );
}
