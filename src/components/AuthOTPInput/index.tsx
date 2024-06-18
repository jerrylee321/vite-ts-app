import {
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  ReactElement,
  useCallback,
} from "react";
import { FormControl, Input } from "@mui/material";
import cn from "classnames";

import { otpInput } from "./index.module.scss";

const replaceStringAt = (
  value: string,
  index: number,
  inputString: string
): string => {
  const newInputString = inputString === "" ? " " : inputString;
  if (index >= value.length) {
    return value + " ".repeat(index - value.length) + newInputString;
  }
  return (
    value.substring(0, index) +
    newInputString +
    value.substring(index + newInputString.length)
  );
};

const isHTMLInputElement = (
  element: (EventTarget & Element) | null
): element is HTMLInputElement => {
  return element?.tagName === "input";
};

/**
 * Using an input element, find the container element that has sibilings to
 * other container elements.
 *
 * In short, find the container element to jump to next or previous input.
 */
const getContainerElement = (element: HTMLInputElement): HTMLElement | null => {
  return element.parentElement?.parentElement ?? null;
};

/**
 * Using a container element, find the input element inside it.
 */
const getInputElement = (element: Element): HTMLInputElement | null => {
  return element.children[0].children[0] as HTMLInputElement | null;
};

const getNextInputElement = (
  element: HTMLInputElement
): HTMLInputElement | null => {
  const targetContainerElement =
    getContainerElement(element)?.nextElementSibling;
  return targetContainerElement
    ? getInputElement(targetContainerElement)
    : null;
};

const getPreviousInputElement = (
  element: HTMLInputElement
): HTMLInputElement | null => {
  const targetContainerElement =
    getContainerElement(element)?.previousElementSibling;
  return targetContainerElement
    ? getInputElement(targetContainerElement)
    : null;
};

const getSiblingInputElementAtIndex = (
  element: HTMLInputElement,
  index: number
): HTMLInputElement | null => {
  const targetContainerElement =
    getContainerElement(element)?.parentElement?.children[index];
  return targetContainerElement
    ? getInputElement(targetContainerElement)
    : null;
};

interface AuthOTPInputProps {
  id?: string;
  className?: string;
  name: string;
  maxLength: number;
  value: string;
  onChange?: (value: string) => void;
  setFieldValue?: (field: string, value: string) => void;
  setFieldTouched?: (field: string) => void;
  autoFocus?: boolean;
}

const AuthOTPInput = (props: AuthOTPInputProps): ReactElement => {
  const {
    id,
    className,
    maxLength,
    name,
    value,
    onChange,
    setFieldValue,
    setFieldTouched,
    autoFocus = false,
  } = props;
  const namePrefix = `${name}_`;

  const handleBlur = useCallback(
    (e: FocusEvent) => {
      const relatedTarget = e.relatedTarget;
      if (
        isHTMLInputElement(relatedTarget) &&
        relatedTarget.name.startsWith(namePrefix)
      ) {
        return;
      }
      setFieldTouched?.(name);
    },
    [name, namePrefix, setFieldTouched]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const i = parseInt(e.target.name.substring(namePrefix.length), 10);
      const inputString = e.target.value.replace(/[^\d]+/, "");
      const newValue = replaceStringAt(value, i, inputString)
        .substring(0, maxLength)
        .trimEnd();
      onChange?.(newValue);
      setFieldValue?.(name, newValue);

      const focusIndex = Math.min(i + inputString.length, maxLength - 1);
      getSiblingInputElementAtIndex(e.target, focusIndex)?.focus();
    },
    [namePrefix.length, value, maxLength, onChange, setFieldValue, name]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const target = e.target as HTMLInputElement;
      const i = parseInt(target.name.substring(namePrefix.length), 10);

      if (e.key === "ArrowLeft") {
        getPreviousInputElement(target)?.focus();
      } else if (e.key === "ArrowRight") {
        getNextInputElement(target)?.focus();
      } else if (e.key === "Backspace" || e.key === "Delete") {
        if (target.value === "") {
          if (i > 0) {
            const newValue = replaceStringAt(value, i - 1, " ");
            onChange?.(newValue);
            setFieldValue?.(name, newValue);
            getPreviousInputElement(target)?.focus();
          }
        }
      }
    },
    [name, namePrefix.length, onChange, setFieldValue, value]
  );

  const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    e.target.select();
  }, []);

  return (
    <div className={cn("flex gap-x-6", className)}>
      {[...Array(maxLength).keys()].map((i) => (
        <FormControl key={i}>
          <Input
            className={cn(otpInput, "rounded-xl")}
            componentsProps={{
              input: {
                pattern: "\\d*",
                className:
                  "text-center text-xl bg-auth-dark text-auth-contrastText",
              },
            }}
            data-testid={`${namePrefix}${i}`}
            id={id}
            name={`${namePrefix}${i}`}
            value={value[i] && value[i] !== " " ? value[i] : ""}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus={!!(i === 0 && autoFocus)}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
          />
        </FormControl>
      ))}
    </div>
  );
};

export default AuthOTPInput;
