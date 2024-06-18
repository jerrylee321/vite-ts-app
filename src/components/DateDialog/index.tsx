import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Typography } from "@mui/material";

import { MessageKey } from "../../i18n/LocaleModel";
import DatePicker, {
  DatePickerProps,
  ReactDatePickerFunctionParams,
} from "../DatePicker";
import DialogWithActions, {
  DialogWithActionsProps,
} from "../DialogWithActions";

interface DateDialogProps
  extends Omit<DialogWithActionsProps, "title" | "buttons"> {
  title: MessageKey;
  initDate: Date | undefined | null;
  onDateChange: (date: ReactDatePickerFunctionParams) => void;
  datePickerProps?: Omit<DatePickerProps, "onChange">;
}

const DateDialog = (props: DateDialogProps): ReactElement => {
  const { title, onDateChange, initDate, datePickerProps, ...rest } = props;

  return (
    <DialogWithActions {...rest} buttons={[]} className="">
      <div className="flex items-center justify-center px-2">
        <div className="flex grow flex-col">
          <div
            className="mb-6 flex justify-center"
            data-testid="MessageDialogTitle"
          >
            <Typography className="font-bold text-independence-main">
              <Trans<MessageKey> i18nKey={title} />
            </Typography>
          </div>
          <div>
            <DatePicker
              {...datePickerProps}
              onChange={onDateChange}
              inline={true}
              selected={initDate}
            />
          </div>
        </div>
      </div>
    </DialogWithActions>
  );
};

export default DateDialog;
