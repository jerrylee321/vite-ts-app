import { ReactElement, useMemo } from "react";
import cn from "classnames";

import { ValidatePasswordResult } from "../../apis/CommonAuthenticationAPI";
import AuthRequirementHintList, {
  AuthRequirementHintMessage,
} from "../AuthRequirementHintList";

interface AuthPasswordRequirementHintListProps {
  result: Required<ValidatePasswordResult>;
  isLoading?: boolean;
  ignores?: string[];
}

const mapValidatePasswordResult = (
  result: Required<ValidatePasswordResult>,
  ignores: string[] = []
): AuthRequirementHintMessage[] => {
  const messages: AuthRequirementHintMessage[] = [];
  if (result.strength) {
    messages.push({
      key: "strength",
      i18nKey: "AuthPasswordRequirementHint.strength.strong",
      isInvalid: false,
    });
  } else {
    messages.push({
      key: "strength",
      i18nKey: "AuthPasswordRequirementHint.strength.weak",
      isInvalid: true,
    });
  }

  messages.push({
    key: "length",
    i18nKey: "AuthPasswordRequirementHint.length",
    isInvalid: !result.length,
  });
  messages.push({
    key: "username",
    i18nKey: "AuthPasswordRequirementHint.username",
    isInvalid: !result.username,
  });
  messages.push({
    key: "uppercase",
    i18nKey: "AuthPasswordRequirementHint.uppercase",
    isInvalid: !result.uppercase,
  });
  messages.push({
    key: "lowercase",
    i18nKey: "AuthPasswordRequirementHint.lowercase",
    isInvalid: !result.lowercase,
  });
  messages.push({
    key: "digit",
    i18nKey: "AuthPasswordRequirementHint.digit",
    isInvalid: !result.numeric,
  });
  messages.push({
    key: "special",
    i18nKey: "AuthPasswordRequirementHint.special",
    isInvalid: !result.specialCharacters,
  });

  return messages.filter(({ key }) => !ignores.includes(key));
};

const AuthPasswordRequirementHintList = ({
  result,
  isLoading = false,
  ignores = [],
}: AuthPasswordRequirementHintListProps): ReactElement => {
  const messages = useMemo(
    () => mapValidatePasswordResult(result, ignores),
    [result, ignores]
  );

  return (
    <AuthRequirementHintList
      className={cn({
        "opacity-50": isLoading,
      })}
      messages={messages}
    />
  );
};

export default AuthPasswordRequirementHintList;
