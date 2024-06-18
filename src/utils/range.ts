/**
 * range returns an number array with range specified.
 * if step is not positive number, only an empty array will be returned
 */
const range = (start: number, stop: number, step: number): number[] => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );
};

export default range;
