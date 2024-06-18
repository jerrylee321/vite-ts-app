import type { Accept as FileTypes } from "react-dropzone";

export type { FileTypes };

// NOTE: When adding changes to file types, check all affected modules to make
// sure these modules also accept these types.

export const ExcelFileTypes: FileTypes = Object.freeze({
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
});

export const WordFileTypes: FileTypes = Object.freeze({
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
});

export const PowerPointFileTypes: FileTypes = Object.freeze({
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
});

export const MicrosoftOfficeFileTypes: FileTypes = Object.freeze({
  ...ExcelFileTypes,
  ...WordFileTypes,
  ...PowerPointFileTypes,
});

export const XmlFileTypes: FileTypes = Object.freeze({
  "application/xml": [".xml"],
});

export const CsvFileTypes: FileTypes = Object.freeze({
  "text/csv": [".csv"],
});

export const ImageFileTypes: FileTypes = Object.freeze({
  "image/ipeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/tiff": [".tiff"],
});

export const PdfFileTypes: FileTypes = Object.freeze({
  "application/pdf": [".pdf"],
});

export const TextFileTypes: FileTypes = Object.freeze({
  "text/plain": [".txt"],
});

export const CommonDocumentFileTypes: FileTypes = Object.freeze({
  ...ImageFileTypes,
  ...CsvFileTypes,
  ...XmlFileTypes,
  ...MicrosoftOfficeFileTypes,
  ...PdfFileTypes,
  ...TextFileTypes,
});

// This requirement applies to all eMPF features
export const DeniedFileTypes: FileTypes = {
  "application/vnd.microsoft.portable-executable": [".exe"],
  "application/zip": [".zip"],
};

export const toFileExtensions: (fileTypes: FileTypes) => string[] = (
  fileTypes
) => {
  return Array.from(new Set(Object.values(fileTypes).flat()));
};

export const isCommonDocumentFileTypes: (fileTypes: FileTypes) => boolean = (
  fileTypes
) => {
  const set1 = new Set(Object.values(fileTypes).flat());
  const set2 = new Set(Object.values(CommonDocumentFileTypes).flat());
  return set1.size === set2.size && [...set1].every((x) => set2.has(x));
};
