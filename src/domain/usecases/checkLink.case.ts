export interface CheckLink {
  check: (params: CheckLink.Params) => Promise<CheckLink.Result>;
}

export namespace CheckLink {
  export type Params = string

  export type Result = boolean;
}
