export type IFixedLengthArray<T, L extends number> = {
  0: T;
  length: L;
} & ReadonlyArray<T>;

type acceptedTypes = string | null;

// type IPattern = ReadonlyArray<ReadonlyArray<acceptedTypes>>;

export type IPattern<
  Height extends number = number,
  Width extends number = number
> = IFixedLengthArray<IFixedLengthArray<acceptedTypes, Width>, Height>;

const emptyChar = " ";

export function parsePattern(pattern: IPattern): {
  keyMap: Record<string, string>;
  craftingPattern: string[];
} {
  let charCode = 33;
  const keyMap: Record<string, string> = {};
  const craftingPattern: string[] = [];
  for (let i = 0; i < pattern.length; i++) {
    const row = pattern[i];
    let vanillaRow = "";
    for (let j = 0; j < row.length; j++) {
      const name: acceptedTypes = row[j];
      if (
        name === null ||
        name === undefined ||
        name === "" ||
        name === emptyChar
      ) {
        vanillaRow += emptyChar;
      } else {
        if (keyMap[name] === undefined) {
          keyMap[name] = String.fromCharCode(
            Object.keys(keyMap).length + charCode
          );
          charCode++;
        }
        vanillaRow += keyMap[name];
      }
    }
    craftingPattern.push(vanillaRow);
  }
  if (charCode > 126) throw new Error("Pattern is too complex");

  return {
    keyMap,
    craftingPattern,
  };
}
