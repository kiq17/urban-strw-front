export interface Email {
  send: (params: Email.Params) => Promise<Email.Result>;
}

export namespace Email {
  export type Params = {
    id: number;
  };

  export type Result = {
    tempLink: string;
  };
}
