/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */

interface MostFrequentElement {
  mostFrequent: string;
  quantity: number;
}

interface LessFrequentElement {
  lessFrequent: string;
  quantity: number;
}

export function lessFrequentElementInArray(
  array: any[],
): LessFrequentElement | null {
  const result = [
    ...array.reduce(
      (
        r,
        n, // create a map of occurrences
      ) => r.set(n.id, (r.get(n.id) || 0) + 1),
      new Map(),
    ),
  ].reduce((r, v) => (v[1] < r[1] ? v : r)); // get the the item that appear less times

  return { lessFrequent: result[0], quantity: result[1] };
}

export function mostFrequentElementInArray(
  array: any[],
): MostFrequentElement | null {
  const result = [
    ...array.reduce(
      (
        r,
        n, // create a map of occurrences
      ) => r.set(n.id, (r.get(n.id) || 0) + 1),
      new Map(),
    ),
  ].reduce((r, v) => (v[1] > r[1] ? v : r)); // get the the item that appear less times

  return { mostFrequent: result[0], quantity: result[1] };
}
