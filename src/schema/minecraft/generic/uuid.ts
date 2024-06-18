export type IUUIDRef = string & {
  readonly __UUIDBrand: void;
};

export type UUIDRef = [number, number, number, number] | IUUIDRef;
