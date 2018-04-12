export function arrToMap(arr) {
  return arr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur,
    }),
    {},
  );
}
