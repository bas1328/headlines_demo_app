import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { CountryContext } from "@/contexts/CountryContext";

import { AVAILIBLE_COUNTRIES } from "@/common/constants";
import { CountryCodesUnion } from "@/types/common";

import styles from "./CountrySelector.module.scss";

export const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);

  const { t } = useTranslation("common");

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: persist selected country in cookies to prefetch the selected one
    setSelectedCountry(e.target.value as CountryCodesUnion);
  };
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        {Object.entries(AVAILIBLE_COUNTRIES).map(([country, code]) => (
          <option className={styles.option} key={code} value={code}>
            {country}
          </option>
        ))}
      </select>
      <p>
        {t("selectedCountry")}: {selectedCountry}
      </p>
    </div>
  );
};
