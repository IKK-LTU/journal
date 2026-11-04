/**
 * Comparator for Array.sort: highest value first.
 *
 *   shares.sort(descendingBy((share) => share.count))   // most counted first
 */
export const descendingBy =
  <T>(getValue: (item: T) => number) =>
  (one: T, other: T): number =>
    getValue(other) - getValue(one);

/**
 * Comparator for ISO date / timestamp strings: newest first.
 * ISO strings sort correctly as plain text, so no Date parsing is needed.
 */
export const newestFirstBy =
  <T>(getIsoDate: (item: T) => string) =>
  (one: T, other: T): number =>
    getIsoDate(other).localeCompare(getIsoDate(one));
