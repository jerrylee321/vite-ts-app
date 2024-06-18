import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import { formatInTimeZone } from "date-fns-tz";
import Accordion from "frontend-common/src/components/Accordion";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

import useTimeZone from "../../../hooks/useTimeZone";
import UpdatesPreviewSection, {
  UpdatePreviewObject,
} from "../../UpdatesPreviewSection";
import { TransferType } from "../PaymentRequisitionContents";

const DefaultValue = "-";

export interface TransferRequest {
  trusteeName?: string | null;
  schemeName?: string | null;
  employerName?: string | null;
  employerAccountNumber?: string | null;
}

interface TransferRequestInfoSectionProps {
  viewModel: TransferRequestInfoSectionViewModel;
}

export interface FollowUpViewModel {
  title?: string | null;
  comment?: string | null;
}

export interface TransferRequestInfoSectionViewModel {
  originalRequest: TransferRequest;
  newRequest: TransferRequest;
  transferType: TransferType;
  employerTransferRefNo: string | null;
  transferEffectiveDate: Date | null;
  followUp: FollowUpViewModel | null;
}

const TransferRequestInfoSection = ({
  viewModel,
}: TransferRequestInfoSectionProps): ReactElement => {
  const { t } = useTranslation();
  const {
    originalRequest,
    newRequest,
    transferType,
    employerTransferRefNo,
    transferEffectiveDate,
    followUp,
  } = viewModel;

  const originalValues: UpdatePreviewObject[] = useMemo(
    () => [
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.original.trusteeName"
        ),
        value: originalRequest.trusteeName,
        "data-testid": "originalTrusteeName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.original.schemeName"
        ),
        value: originalRequest.schemeName,
        "data-testid": "originalSchemeName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.original.employerName"
        ),
        value: originalRequest.employerName,
        "data-testid": "originalEmployerName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.original.employerAccountNumber"
        ),
        value: originalRequest.employerAccountNumber,
        "data-testid": "originalEmployerAccountNumber",
      },
    ],
    [originalRequest, t]
  );

  const newValues: UpdatePreviewObject[] = useMemo(
    () => [
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.new.trusteeName"
        ),
        value: newRequest.trusteeName,
        "data-testid": "newTrusteeName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.new.schemeName"
        ),
        value: newRequest.schemeName,
        "data-testid": "newSchemeName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.new.employerName"
        ),
        value: newRequest.employerName,
        "data-testid": "newEmployerName",
      },
      {
        name: t(
          "PaymentRequisitionDetailScreen.transferRequestInfoSection.new.employerAccountNumber"
        ),
        value: newRequest.employerAccountNumber,
        "data-testid": "newEmployerAccountNumber",
      },
    ],
    [newRequest, t]
  );

  const timeZone = useTimeZone();

  return (
    <Accordion
      className="bg-white"
      title={t(
        "PaymentRequisitionDetailScreen.transferRequestInfoSection.title"
      )}
      collapsible={followUp == null}
    >
      <Paper className="rounded-xl bg-gray-light py-6 px-10">
        <div className="flex flex-row gap-18">
          <ReadOnlyTextField
            label={t(
              "PaymentRequisitionDetailScreen.transferRequestInfoSection.typeOfTransfer"
            )}
            value={
              transferType !== "Unknown"
                ? t(
                    `PaymentRequisitionDetailScreen.typeOfTransfer.${transferType}`
                  )
                : null
            }
            defaultValue={DefaultValue}
            className="flex-1"
            data-testid="typeOfTransfer"
          />
          <ReadOnlyTextField
            label={t(
              "PaymentRequisitionDetailScreen.transferRequestInfoSection.employerTransferRefNumber"
            )}
            value={employerTransferRefNo}
            defaultValue={DefaultValue}
            className="flex-1"
            data-testid="employerTransferRefNumber"
          />
        </div>
        <UpdatesPreviewSection
          labelDirection="left"
          originalValues={originalValues}
          newValues={newValues}
        />
        <div className="mt-4 font-semibold text-independence-main">
          <Typography variant="body1" data-testid="transferEffectiveDate">
            <Trans
              i18nKey="PaymentRequisitionDetailScreen.transferRequestInfoSection.transferEffectiveDate"
              values={{
                date: transferEffectiveDate
                  ? formatInTimeZone(
                      transferEffectiveDate,
                      timeZone,
                      "dd/MM/yyyy"
                    )
                  : DefaultValue,
              }}
            />
          </Typography>
        </div>
      </Paper>
      {followUp != null ? (
        <section className="flex flex-col gap-4" data-testid="followUpSection">
          <HeadlineText variant="h3">
            <Trans i18nKey="PaymentRequisitionDetailScreen.transferRequestInfoSection.followUpReason.title" />
          </HeadlineText>
          <HeadlineText
            variant="h5"
            className="text-primary-main"
            data-testid="followUpReason"
          >
            {followUp.title}
          </HeadlineText>
          <ReadOnlyTextField
            valueStyle="grayBox"
            label={t(
              "PaymentRequisitionDetailScreen.transferRequestInfoSection.followUpReason.commentFromEmpf.label"
            )}
            childTextClassName="text-xs min-h-20"
            value={followUp.comment}
            data-testid="followUpComment"
          />
        </section>
      ) : null}
    </Accordion>
  );
};

export default TransferRequestInfoSection;
