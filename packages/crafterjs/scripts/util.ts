export function snakeToPascal(str: string) {
  return str
    .split("_")
    .map((str) => {
      return upperFirst(str.split("/").map(upperFirst).join("/"));
    })
    .join("");
}
export function snakeToCamel(str: string) {
  return (
    snakeToPascal(str).slice(0, 1).toLowerCase() + snakeToPascal(str).slice(1)
  );
}

function upperFirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}
