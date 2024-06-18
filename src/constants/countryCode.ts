export interface CountryCodeOption {
  label: string;
  value: string;
}

export const countryCodeOptions: CountryCodeOption[] = [
  { label: "+852", value: "+852" },
  { label: "+853", value: "+853" },
  { label: "+86", value: "+86" },
];

export const defaultCountryCode = "+852";
