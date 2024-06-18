import { ReactElement } from "react";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";

import AuthRequirementHint from "./AuthRequirementHint";

export interface AuthRequirementHintMessage {
  key: string;
  i18nKey: MessageKey;
  isInvalid: boolean;
}

interface AuthRequirementHintListProps {
  messages: AuthRequirementHintMessage[];
  className?: string;
}

const AuthRequirementHintList = ({
  messages,
  className,
}: AuthRequirementHintListProps): ReactElement => {
  return (
    <ul className={cn("list-none p-0", className)}>
      {messages.map((message) => (
        <li key={message.key}>
          <AuthRequirementHint
            data-testid={`AuthRequirementHint-${message.key}`}
            i18nKey={message.i18nKey}
            isInvalid={message.isInvalid}
          />
        </li>
      ))}
    </ul>
  );
};

export default AuthRequirementHintList;
