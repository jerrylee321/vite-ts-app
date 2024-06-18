export interface LookupFn {
  (value: string): string;
  (value: string | null): string | null;
  (value: string | undefined): string | undefined;
  (value: string | null | undefined): string | null | undefined;
}
