const groupBy = <T, K extends string | number | symbol = string>(
  items: T[],
  callbackFn: (item: T) => K
): { [key in K]?: T } => {
  return items.reduce<{ [key in K]?: T }>((prev, curr) => {
    return {
      ...prev,
      [callbackFn(curr)]: curr,
    };
  }, {});
};

export default groupBy;
