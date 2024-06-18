import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionDetails } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";
import HeadlineText from "../HeadlineText";

interface AccordionProps {
  className?: string;
  disableOutmostPaddings?: boolean;
  title?: string;
  titleMessageKey?: MessageKey;
  titleClassName?: string;
  footer?: ReactNode;
  collapsible?: boolean;
  disableGutters?: boolean;
  defaultExpanded?: boolean;
  "data-testid"?: string;
}

const Accordion = forwardRef(
  (
    props: PropsWithChildren<AccordionProps>,
    ref: React.ForwardedRef<HTMLDivElement>
  ): ReactElement => {
    const {
      className,
      disableOutmostPaddings = false,
      titleClassName,
      footer,
      collapsible = true,
      children,
      disableGutters = true,
      defaultExpanded = true,
      "data-testid": dataTestId,
    } = props;

    const { t } = useTranslation();

    const title =
      props.title ??
      (props.titleMessageKey ? t(props.titleMessageKey) : undefined);

    const [expanded, setExpanded] = useState(true);

    const handleOnClickSummary = useCallback(() => {
      setExpanded((prev) => !prev);
    }, []);

    useEffect(() => {
      if (!collapsible) {
        setExpanded(true);
      }
    }, [collapsible]);

    return (
      <MuiAccordion
        ref={ref}
        data-testid={dataTestId}
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        disableGutters={disableGutters}
        className={cn(
          "rounded-2xl shadow-md before:hidden text-independence-main",
          { "px-4 py-2": !disableOutmostPaddings },
          className
        )}
      >
        {title ? (
          <AccordionSummary
            classes={{
              content: "my-0",
              root: cn({ "px-0": disableOutmostPaddings }),
            }}
            className={cn({
              "cursor-auto pointer-events-none": !collapsible,
            })}
            onClick={handleOnClickSummary}
            expandIcon={collapsible ? <ExpandMoreIcon /> : null}
          >
            <HeadlineText variant="h2" className={titleClassName}>
              {title}
            </HeadlineText>
          </AccordionSummary>
        ) : null}
        <AccordionDetails
          className={cn({
            "py-2": !disableOutmostPaddings,
            "px-0": disableOutmostPaddings,
          })}
        >
          {children}
        </AccordionDetails>
        {footer ? <AccordionDetails>{footer}</AccordionDetails> : null}
      </MuiAccordion>
    );
  }
);

export default Accordion;
