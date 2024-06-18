import { QueryObserverOptions } from "@tanstack/react-query";

export type CommonQueryObserverOptions = Pick<
  QueryObserverOptions,
  "keepPreviousData" | "enabled"
>;
