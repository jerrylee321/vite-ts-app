import React, { PropsWithChildren, ReactElement, useCallback } from "react";
import { Trans } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import cn from "classnames";

import { ReactComponent as UploaderNextIcon } from "../../assets/icons/ic_uploader_next.svg";
import HeadlineText from "../HeadlineText";
import ReadOnlyTextField from "../ReadOnlyTextField";

export interface UpdatePreviewObject {
  name: string;
  value?: string | null;
  "data-testid"?: string;
}

interface UpdatesPreviewSectionProps {
  originalValues: UpdatePreviewObject[];
  newValues: UpdatePreviewObject[];
  originalTitle?: string;
  newTitle?: string;
  indexText?: string;
  labelDirection: "right" | "left";
  className?: string;
}

const UpdatesPreviewSection = (
  props: PropsWithChildren<UpdatesPreviewSectionProps>
): ReactElement => {
  const {
    className,
    originalValues,
    newValues,
    indexText,
    labelDirection,
    originalTitle,
    newTitle,
  } = props;

  const renderUpdatePreviewObject = useCallback(
    (update: UpdatePreviewObject, index?: number) => (
      <ReadOnlyTextField
        key={index}
        label={update.name}
        value={update.value}
        data-testid={update["data-testid"]}
      />
    ),
    []
  );

  return (
    <div className={cn("flex flex-row", className)}>
      {indexText != null ? (
        <div className="mr-2 flex w-8 items-start pt-15">
          <HeadlineText variant="h2">{indexText}</HeadlineText>
        </div>
      ) : null}
      <div className="flex-1">
        <div className="mb-1 flex flex-row pr-2">
          {labelDirection === "right" ? (
            <Typography
              data-testid="OriginalTitleLabelLeft"
              variant="h4"
              className="flex-1 text-xl font-bold text-gray-dark"
            >
              {originalTitle}
            </Typography>
          ) : null}
          <HeadlineText variant="h4">
            <Trans i18nKey="UpdatesPreviewSection.title.original" />
          </HeadlineText>
          {labelDirection === "left" ? (
            <Typography
              data-testid="OriginalTitleLabelRight"
              variant="h4"
              className="flex-1 text-right text-xl font-bold text-gray-dark"
            >
              {originalTitle}
            </Typography>
          ) : null}
        </div>
        <Paper className="flex flex-col gap-4 rounded-2xl py-6 px-8 shadow-none">
          {originalValues.map(renderUpdatePreviewObject)}
        </Paper>
      </div>
      <div className="mx-4 flex items-center justify-center pt-6">
        <UploaderNextIcon className="h-10 w-10 text-gray-dark" />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex flex-row pr-2">
          {labelDirection === "right" ? (
            <Typography
              data-testid="NewTitleLabelLeft"
              variant="h4"
              className="flex-1 text-xl font-bold text-gray-dark"
            >
              {newTitle}
            </Typography>
          ) : null}
          <HeadlineText variant="h4">
            <Trans i18nKey="UpdatesPreviewSection.title.new" />
          </HeadlineText>
          {labelDirection === "left" ? (
            <Typography
              data-testid="NewTitleLabelRight"
              variant="h4"
              className="flex-1 text-right text-xl font-bold text-gray-dark"
            >
              {newTitle}
            </Typography>
          ) : null}
        </div>
        <Paper className="flex flex-col gap-4 rounded-2xl py-6 px-8 shadow-none">
          {newValues.map(renderUpdatePreviewObject)}
        </Paper>
      </div>
    </div>
  );
};

export default UpdatesPreviewSection;
