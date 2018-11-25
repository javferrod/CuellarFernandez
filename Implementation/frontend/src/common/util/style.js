export function combineStyle() {
  const arg = Array.from(arguments);
  return arg.reduce((acc, value) => `${acc} ${value}`,
    '');
}
