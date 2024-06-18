import React, {
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import cn from "classnames";

import {
  formButton,
  formCheckbox,
  formInput,
  formInputLabel,
  formItem,
  formSelectedItem,
} from "./index.module.scss";

export interface AutocompleteOption {
  id: string;
  title: string;
}

export interface AutocompleteInputProps
  extends Omit<
    AutocompleteProps<AutocompleteOption, true, true, false>,
    "renderInput" | "onChange"
  > {
  name: string;
  options: AutocompleteOption[];
  selectedItems: AutocompleteOption[];
  onChange: (v: AutocompleteOption[]) => void;
  label?: string;
  error?: boolean;
  helperText?: string | string[];
  inputLabelId?: string;
  className?: string;
  rootClassName?: string;
  placeholder?: string;
  renderInput?: AutocompleteProps<
    AutocompleteOption,
    true,
    true,
    false
  >["renderInput"];
  required?: boolean;
  "data-testid"?: string;
  type?: "input" | "select";
  showSelectAllButton?: boolean;
  showDoneButton?: boolean;
  showDeselectAllButton?: boolean;
}

const UncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CheckedIcon = <CheckBoxIcon fontSize="small" />;
const RemoveIcon = <CloseIcon />;

export const defaultRenderTags = (
  options: AutocompleteOption[],
  getTagProps: AutocompleteRenderGetTagProps
): ReactElement[] =>
  options.map((option, index: number) => {
    const { className, key, ...rest } = getTagProps({ index });
    return (
      <Chip
        size="small"
        label={option.title}
        deleteIcon={RemoveIcon}
        className={cn(className, formSelectedItem)}
        key={key}
        {...rest}
      />
    );
  });

export const defaultRenderOption = (
  props: HTMLAttributes<HTMLLIElement>,
  option: AutocompleteOption,
  { selected }: AutocompleteRenderOptionState
): ReactElement => (
  <li {...props} className={cn(props.className, formItem)}>
    <Checkbox
      key={option.id}
      className={formCheckbox}
      icon={UncheckedIcon}
      checkedIcon={CheckedIcon}
      checked={selected}
    />
    {option.title}
  </li>
);

export const defaultIsOptionEqualToValue = (
  option: AutocompleteOption,
  value: AutocompleteOption
): boolean => option.id === value.id;

export const getDefaultDisplayText = (option: AutocompleteOption): string =>
  option.title;

interface AutocompletePaperOptions {
  showDoneButton?: boolean;
  showSelectAllButton?: boolean;
  showDeselectAllButton?: boolean;
  onSelectAll?: () => void;
  onDeselectAll?: () => void;
}

export const AutocompletePaper = (
  props: AutocompletePaperOptions & PropsWithChildren
): ReactElement => {
  const {
    children,
    showDoneButton = false,
    showSelectAllButton = false,
    showDeselectAllButton = false,
    onSelectAll,
    onDeselectAll,
    ...rest
  } = props;

  const handleSelectAll = useCallback(
    (e: React.SyntheticEvent) => {
      // Prevent input blur when interacting with the "no options" content
      e.preventDefault();
      e.stopPropagation();
      onSelectAll?.();
    },
    [onSelectAll]
  );

  const handleDeselectAll = useCallback(
    (e: React.SyntheticEvent) => {
      // Prevent input blur when interacting with the "no options" content
      e.preventDefault();
      e.stopPropagation();
      onDeselectAll?.();
    },
    [onDeselectAll]
  );

  const buttons: ReactElement[] = [];
  if (showSelectAllButton) {
    buttons.push(
      <Button
        key="select-all-button"
        className={formButton}
        fullWidth={true}
        onMouseDown={handleSelectAll}
        data-testid="autoCompleteSelectAllBtn"
      >
        <Trans i18nKey="Autocomplete.action.selectAll" />
      </Button>
    );
  }
  if (showDeselectAllButton) {
    buttons.push(
      <Button
        key="deselect-all-button"
        className={formButton}
        fullWidth={true}
        onMouseDown={handleDeselectAll}
        data-testid="autoCompleteDeselectAllBtn"
      >
        <Trans i18nKey="Autocomplete.action.deselectAll" />
      </Button>
    );
  }
  if (showDoneButton) {
    buttons.push(
      <Button key="done-button" className={formButton} fullWidth={true}>
        <Trans i18nKey="Autocomplete.action.done" />
      </Button>
    );
  }

  return (
    <Paper elevation={8} {...rest}>
      {children}
      {buttons.length > 0 ? (
        <>
          <Divider />
          {buttons}
        </>
      ) : null}
    </Paper>
  );
};

export const withAutocompletePaperOptions = (
  options: AutocompletePaperOptions
): (({ children }: PropsWithChildren) => ReactElement) => {
  return ({ children }) => (
    <AutocompletePaper {...options}>{children}</AutocompletePaper>
  );
};

const autoCompleteInputProps: AutocompleteInputProps["componentsProps"] = {
  popper: {
    style: {
      minWidth: "fit-content",
      width: "100%",
    },
  },
};

const AutocompleteInput = (props: AutocompleteInputProps): ReactElement => {
  const { t } = useTranslation();
  const {
    options,
    selectedItems,
    onChange,
    label,
    error,
    helperText,
    placeholder,
    inputLabelId,
    rootClassName,
    renderInput,
    required,
    fullWidth,
    "data-testid": dataTestId,
    type = "input",
    showSelectAllButton = false,
    showDoneButton = true,
    showDeselectAllButton = false,
    disableClearable,
    disablePortal = true,
    ...rest
  } = props;

  const _placeholder = useMemo(() => {
    if (placeholder) {
      return placeholder;
    }

    return type === "select"
      ? t("FormSelect.default.placeholder")
      : t("FormInput.default.placeholder");
  }, [type, placeholder, t]);

  const handleChange = useCallback(
    (_: SyntheticEvent, changeOptions: AutocompleteOption[]) => {
      onChange(changeOptions);
    },
    [onChange]
  );

  const handleSelectAll = useCallback(() => {
    onChange(options);
  }, [onChange, options]);

  const handleDeselectAll = useCallback(() => {
    onChange([]);
  }, [onChange]);

  const defaultRenderInput = useCallback(
    (params: AutocompleteRenderInputParams) => {
      const { className, ...restInputProps } = params.inputProps;
      return (
        <TextField
          {...params}
          helperText={helperText}
          error={error}
          margin="normal"
          className={formInput}
          placeholder={_placeholder}
          variant="standard"
          data-testid={dataTestId}
          inputProps={{
            ...restInputProps,
            readOnly: type === "select",
            className: cn(className, {
              "cursor-pointer": type === "select",
            }),
          }}
        />
      );
    },
    [helperText, error, _placeholder, dataTestId, type]
  );

  return (
    <FormControl
      className={rootClassName}
      required={required}
      fullWidth={fullWidth}
    >
      {label ? (
        <InputLabel
          id={inputLabelId}
          shrink={true}
          className={cn(formInputLabel, "text-independence-main")}
        >
          {label}
        </InputLabel>
      ) : null}
      <Autocomplete
        value={selectedItems}
        options={options}
        onChange={handleChange}
        getOptionLabel={getDefaultDisplayText}
        isOptionEqualToValue={defaultIsOptionEqualToValue}
        renderTags={defaultRenderTags}
        renderOption={defaultRenderOption}
        renderInput={renderInput ?? defaultRenderInput}
        PaperComponent={withAutocompletePaperOptions({
          showDoneButton,
          showSelectAllButton: showSelectAllButton,
          showDeselectAllButton: !disableClearable && showDeselectAllButton,
          onSelectAll: handleSelectAll,
          onDeselectAll: handleDeselectAll,
        })}
        fullWidth={fullWidth}
        componentsProps={autoCompleteInputProps}
        disablePortal={disablePortal}
        disableClearable={
          disableClearable || showDeselectAllButton ? true : undefined
        }
        {...rest}
      />
    </FormControl>
  );
};

export default AutocompleteInput;
