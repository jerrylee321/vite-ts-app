import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Column, IdType } from "react-table";

import { selectedItems } from "../utils/datatable";
import { AccessorType, exportExcelWithColumns } from "../utils/exportExcel";

export interface ExportTableExcelButtonProps<Type extends object> {
  data: Type[];
  columns: Column<Type>[];
  selectedRowIds: Record<IdType<Type>, boolean>;
}

const useExportTableExcel = <Type extends object>(
  props: ExportTableExcelButtonProps<Type>
): (() => void) => {
  const { data, columns, selectedRowIds } = props;
  const { t } = useTranslation();

  const exportSelected = useCallback(() => {
    const exportData = selectedItems(data, selectedRowIds);
    if (exportData.length === 0) {
      return;
    }
    const headers = columns.map((col) => ({
      text: col.i18nKey ? t(col.i18nKey) : "",
      accessor: (col.id === "index" ? "_index" : col.accessor) as AccessorType,
      format: col.dateFormat,
    }));

    exportExcelWithColumns({
      fileName: `table_${new Date().toLocaleDateString()}.xlsx`,
      sheetName: "result",
      headers: headers,
      data: exportData.map((d) => d.item),
    });
  }, [columns, data, selectedRowIds, t]);

  return exportSelected;
};

export default useExportTableExcel;
