export const appendPathComponent = (
  component: string,
  base: string
): string => {
  const url = new URL(base);
  if (url.pathname.charAt(url.pathname.length - 1) !== "/") {
    url.pathname = `${url.pathname}/${encodeURIComponent(component)}`;
  } else {
    url.pathname = `${url.pathname}${encodeURIComponent(component)}`;
  }

  return url.toString();
};
