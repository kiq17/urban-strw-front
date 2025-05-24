export interface Order {
  buy: (data: Order.Params) => Promise<boolean>;
}

export namespace Order {
  export type Params = {
    productId: number;
  };
}
