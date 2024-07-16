export const forceSnakeCase = (str: string): string =>
  str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");

export function prettyString(
  str: string,
  length: number,
  padcenter: boolean = true
): string {
  if (str.length > length) return str.substring(0, length - 3) + "...";
  // center the string

  if (!padcenter) return str.padEnd(length, " ");

  const diff = length - str.length;
  const left = Math.floor(diff / 2);
  const right = Math.ceil(diff / 2);
  return " ".repeat(left) + str + " ".repeat(right);
}
