import { CountryCodesUnion } from "@/types/common";
import { createContext } from "react";

interface ICountryContext {
  selectedCountry: CountryCodesUnion;
  setSelectedCountry: React.Dispatch<React.SetStateAction<CountryCodesUnion>>;
}
export const CountryContext = createContext<ICountryContext>(null!);
