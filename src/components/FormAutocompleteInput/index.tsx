import React, { ReactElement, useCallback } from "react";

import AutocompleteInput, {
  AutocompleteInputProps,
  AutocompleteOption,
} from "../AutocompleteInput";

export interface FormAutoCompleteProps
  extends Omit<AutocompleteInputProps, "onChange" | "name"> {
  name: string;
  "data-testid"?: string;
  onChange: (name: string, value: AutocompleteOption[]) => void;
}
const FormAutocompleteInput = (props: FormAutoCompleteProps): ReactElement => {
  const { name, onChange, ...rest } = props;

  const _onChange = useCallback(
    (value: AutocompleteOption[]) => {
      onChange(name, value);
    },
    [name, onChange]
  );
  return <AutocompleteInput name={name} onChange={_onChange} {...rest} />;
};

export default FormAutocompleteInput;
