import { CreditCardModel } from "@/domain/models";

export interface CreditCardFields {
  number(value: string): void | string;
  cvv(value: string): void | string;
  month(value: string): void | string;
  year(value: string): void | string;
  name(value: string): void | string;
}

export interface CreditCardForm {
  pruchase(data: CreditCardModel): Record<string, string> | void;
}
