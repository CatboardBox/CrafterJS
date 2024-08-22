export enum Colors {
  White = "white", // #FFFFFF
  Black = "black", // #000000
  DarkBlue = "dark_blue", // #0000AA
  DarkGreen = "dark_green", // #00AA00
  DarkAqua = "dark_aqua", // #00AAAA
  DarkRed = "dark_red", // #AA0000
  DarkPurple = "dark_purple", // #AA00AA
  Gold = "gold", // #FFAA00
  Gray = "gray", // #AAAAAA
  DarkGray = "dark_gray", // #555555
  Blue = "blue", // #5555FF
  Green = "green", // #55FF55
  Aqua = "aqua", // #55FFFF
  Red = "red", // #FF5555
  LightPurple = "light_purple", // #FF55FF
  Yellow = "yellow", // #FFFF55
}
// string that starts with # and is followed by 6 hexadecimal characters
export type ColorHex = `#${string}`;
