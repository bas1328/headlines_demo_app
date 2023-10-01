import { useContext } from "react";
import { AVAILIBLE_COUNTRIES } from "@/common/constants";
import { CountryContext } from "@/contexts/CountryContext";
import { CountryCodesUnion } from "@/types/common";

export const CountrySelector = () => {
  const { selectedCountry, setSelectedCountry } = useContext(CountryContext);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // TODO: persist selected country in cookies to prefetch the selected one
    setSelectedCountry(e.target.value as CountryCodesUnion);
  };
  return (
    <div>
      <select value={selectedCountry} onChange={handleCountryChange}>
        {Object.entries(AVAILIBLE_COUNTRIES).map(([country, code]) => (
          <option key={code} value={code}>
            {country}
          </option>
        ))}
      </select>
      <p>Selected country: {selectedCountry}</p>
    </div>
  );
};
