// Adapted from react-table/src/sortTypes.js
import { IdType, Row } from "react-table";

/* eslint-disable sonarjs/cognitive-complexity */

const reSplitAlphaNumeric = /([0-9]+)/gm;

// Mixed sorting is slow, but very inclusive of many edge cases.
// It handles numbers, mixed alphanumeric combinations, and even
// null, undefined, and Infinity
/* istanbul ignore next */
export const alphanumeric = <D extends object>(
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>
): number => {
  let [a, b] = getRowValuesByColumnID(rowA, rowB, columnId);

  // Force to strings (or "" for unsupported types)
  a = toString(a);
  b = toString(b);

  // Split on number groups, but keep the delimiter
  // Then remove falsey split values
  a = a.split(reSplitAlphaNumeric).filter(Boolean);
  b = b.split(reSplitAlphaNumeric).filter(Boolean);

  // While
  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();

    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);

    const combo = [an, bn].sort(compareBasic);

    // Both are string
    if (isNaN(combo[0])) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }

    // One is a string, one is a number
    if (isNaN(combo[1])) {
      return isNaN(an) ? -1 : 1;
    }

    // Both are numbers
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }

  return a.length - b.length;
};

/* istanbul ignore next */
export function datetime<D extends object>(
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>
): number {
  let [a, b] = getRowValuesByColumnID(rowA, rowB, columnId);

  a = a.getTime();
  b = b.getTime();

  return compareBasic(a, b);
}

/* istanbul ignore next */
export function basic<D extends object>(
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>
): number {
  const [a, b] = getRowValuesByColumnID(rowA, rowB, columnId);

  return compareBasic(a, b);
}

/* istanbul ignore next */
export function string<D extends object>(
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>
): number {
  let [a, b] = getRowValuesByColumnID(rowA, rowB, columnId);

  a = a.split("").filter(Boolean);
  b = b.split("").filter(Boolean);

  while (a.length && b.length) {
    const aa = a.shift();
    const bb = b.shift();

    const alower = aa.toLowerCase();
    const blower = bb.toLowerCase();

    // Case insensitive comparison until characters match
    if (alower > blower) {
      return 1;
    }
    if (blower > alower) {
      return -1;
    }
    // If lowercase characters are identical
    if (aa > bb) {
      return 1;
    }
    if (bb > aa) {
      return -1;
    }
    continue;
  }

  return a.length - b.length;
}

/* istanbul ignore next */
export function number<D extends object>(
  rowA: Row<D>,
  rowB: Row<D>,
  columnId: IdType<D>
): number {
  let [a, b] = getRowValuesByColumnID(rowA, rowB, columnId);

  const replaceNonNumeric = /[^0-9.]/gi;

  a = Number(String(a).replace(replaceNonNumeric, ""));
  b = Number(String(b).replace(replaceNonNumeric, ""));

  return compareBasic(a, b);
}

// Utils

/* istanbul ignore next */
function compareBasic(a: number, b: number): number {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

/* istanbul ignore next */
function getRowValuesByColumnID<D extends object>(
  row1: Row<D>,
  row2: Row<D>,
  columnId: IdType<D>
) {
  return [row1.values[columnId], row2.values[columnId]];
}

/* istanbul ignore next */
function toString(a: any): string {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return "";
    }
    return String(a);
  }
  if (typeof a === "string") {
    return a;
  }
  return "";
}
