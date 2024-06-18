export type PortalType = "mpfa" | "trustee" | "orso";

export type PortalAccount<
  T extends PortalType = PortalType,
  A extends object = object
> = A & { _portal: T };

export const makePortalAccount = <
  T extends PortalType = PortalType,
  A extends object = object
>(
  portal: T,
  account: A
): PortalAccount<T, A> => {
  return { _portal: portal, ...account };
};
