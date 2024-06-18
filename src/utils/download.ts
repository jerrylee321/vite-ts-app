export const downloadWithLink = (
  url: string,
  fileName: string = "",
  openNewTab: boolean = true
): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName; // empty => follow Content-Disposition header
  if (openNewTab) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  link.click();
  link.remove();
};

export const downloadBlob = (
  resData: Blob | string,
  fileName?: string | null
): void => {
  const blob = new Blob([resData], {
    type: resData instanceof Blob ? resData.type : "text/plain",
  });
  downloadWithLink(URL.createObjectURL(blob), fileName ?? "File", false);
};
