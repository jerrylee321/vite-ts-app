export interface UserFunctionMenuFilter {
  category: string;
  functionName: string;
}

export type WithUserFunctionMenuFilter<T> = T & {
  userFunctionMenuFilter?: UserFunctionMenuFilter;
};
