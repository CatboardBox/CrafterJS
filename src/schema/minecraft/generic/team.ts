export type TeamRef = string & {
  readonly __teamRef: void;
};

export function team(teamName: string): TeamRef {
  return teamName as TeamRef;
}
