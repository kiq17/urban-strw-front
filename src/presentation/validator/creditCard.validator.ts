import {
  CreditCardFields,
  CreditCardForm,
} from "@/data/protocols/validation/creditCard.validation";
import { CreditCardModel } from "@/domain/models";

export class CreditCardValidator implements CreditCardFields, CreditCardForm {
  constructor(
    private readonly validatorField: CreditCardFields,
    private readonly validatorForm: CreditCardForm
  ) {}

  cvv(value: string): string | void {
    return this.validatorField.cvv(value);
  }

  month(value: string): string | void {
    return this.validatorField.month(value);
  }

  name(value: string): string | void {
    return this.validatorField.name(value);
  }

  number(value: string): string | void {
    return this.validatorField.number(value);
  }

  year(value: string): string | void {
    return this.validatorField.year(value);
  }
  pruchase(data: CreditCardModel): void | Record<string, string> {
    return this.validatorForm.pruchase(data);
  }
}
