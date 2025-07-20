export interface CheckCode {
  check: (params: CheckCode.Params) => Promise<CheckCode.Result>;
}

export namespace CheckCode {
  export type Params = {
    tempLink: string;
  };

  export type Result = boolean;
}
