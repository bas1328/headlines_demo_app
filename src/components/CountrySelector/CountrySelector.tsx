import { useContext } from "react";
import { AVAILIBLE_COUNTRIES } from "@/common/constants";
import { CountryContext } from "@/contexts/CountryContext";
import { CountryCodesUnion } from "@/types/common";

import styles from "./CountrySelector.module.scss";

export const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);

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
      <p>Selected country: {selectedCountry}</p>
      </div>
  );
};
