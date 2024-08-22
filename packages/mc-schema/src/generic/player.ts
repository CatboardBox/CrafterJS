export type PlayerRef = string & {
  readonly __playerRef: void;
};

export function player(playerName: string): PlayerRef {
  return playerName as PlayerRef;
}
