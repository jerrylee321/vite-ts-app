import { ReactElement } from "react";

import ReadOnlyTextField, {
  ReadOnlyTextFieldProps,
} from "../ReadOnlyTextField";

interface ReadOnlyTextFieldTableProps {
  dataSet: ReadOnlyTextFieldTableCellProp[];
  defaultValue?: string;
  className?: string;
}

export type ReadOnlyTextFieldTableCellProp = ReadOnlyTextFieldProps & {
  isEmptyCell?: boolean;
};

const ReadOnlyTextFieldTable = (
  props: ReadOnlyTextFieldTableProps
): ReactElement => {
  const { dataSet, defaultValue = "-", className } = props;

  return (
    <div className={className}>
      {dataSet.map((data, index) => {
        const { defaultValue: fieldDefaultValue, isEmptyCell, ...rest } = data;
        const key =
          data.id ??
          ("labelMessageKey" in data ? data.labelMessageKey : `${index}`);
        return isEmptyCell ? (
          <div key={key} />
        ) : (
          <ReadOnlyTextField
            key={key}
            defaultValue={fieldDefaultValue ?? defaultValue}
            {...rest}
          />
        );
      })}
    </div>
  );
};

export default ReadOnlyTextFieldTable;
