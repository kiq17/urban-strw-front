import { CreditCardForm } from "@/data/protocols/validation/creditCard.validation";
import { FormsValidation } from "@/data/protocols/validation/formsValidation";
import { CreditCardModel, DeliveryData, SelfData } from "@/domain/models";
import { Authentication } from "@/domain/usecases";
import { SignUp } from "@/domain/usecases/signUp.case";
import * as yup from "yup";

export class YupFormsAdapter implements FormsValidation, CreditCardForm {
  auth(data: Authentication.Params): void | Record<string, string> {
    try {
      this.genereteAuthSchema().validateSync(data, { abortEarly: false });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      return objectErros;
    }
  }

  signUp(data: SignUp.Params): void | Record<string, string> {
    try {
      this.genereteSignUpSchema().validateSync(data, { abortEarly: false });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      return objectErros;
    }
  }

  selfData(data: SelfData): void | Record<string, string> {
    try {
      this.genereteSelfDataSchema().validateSync(data, {
        abortEarly: false,
      });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      return objectErros;
    }
  }

  deliveryData(data: DeliveryData): void | Record<string, string> {
    try {
      this.genereteDeliveryDataSchema().validateSync(data, {
        abortEarly: false,
      });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      return objectErros;
    }
  }

  pruchase(data: CreditCardModel): void | Record<string, string> {
    try {
      this.genereteCreditCardSchema().validateSync(data, {
        abortEarly: false,
      });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      const objectErros: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;

        objectErros[error.path] = error.message;
      });

      return objectErros;
    }
  }

  private genereteAuthSchema(): yup.ObjectSchema<Authentication.Params> {
    return yup.object({
      senha: yup
        .string()
        .required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
      email: yup.string().required("Campo obrigatório").email("Email inválido"),
    });
  }

  private genereteSignUpSchema(): yup.ObjectSchema<
    Omit<SignUp.Params, "preferences">
  > {
    return yup.object({
      nome: yup
        .string()
        .trim()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
      senha: yup
        .string()
        .trim()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
      email: yup.string().required("Campo obrigatório").email("Email inválido"),
      preferences: yup
        .array(yup.string())
        .min(1, "Deve ter no mínimo 1 item")
        .max(3, "Deve ter no máximo 3 itens"),
    });
  }

  private genereteSelfDataSchema(): yup.ObjectSchema<SelfData> {
    return yup.object({
      fullName: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .min(6, "Deve conter no mínimo 6 caracteres"),
      email: yup.string().required("Campo obrigatório").email("Email inválido"),
      cpf: yup.string().required("Campo obrigatório"),
    });
  }

  private genereteDeliveryDataSchema(): yup.ObjectSchema<DeliveryData> {
    return yup.object({
      street: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(50, "Deve ter no máximo 50 caracteres"),
      city: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 6 caracteres")
        .max(30, "Deve ter no máximo 30 caracteres"),
      state: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve ter no mínimo 2 caracteres"),
      neighborhood: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
      houseNumber: yup
        .number()
        .required("Campo obrigatório")
        .min(1, "Deve ter no mínimo 1 caracteres")
        .max(6, "Deve ter no máximo 6 caracteres"),
      houseType: yup
        .string()
        .required("Campo obrigatório")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres"),
      cep: yup
        .string()
        .required("Campo obrigatório")
        .min(8, "Deve ter no mínimo 8 caracteres")
        .max(8, "Deve ter no máximo 8 caracteres"),
    });
  }

  private genereteCreditCardSchema(): yup.ObjectSchema<CreditCardModel> {
    return yup.object({
      cvv: yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .length(3, "Deve ter no mínimo 3 caracteres"),
      month: yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve ter no mínimo 2 caracteres"),
      name: yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-z]+$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(40, "Deve ter no máximo 40 caracteres"),
      number: yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .min(13, "Deve ter no mínimo 13 caracteres")
        .max(30, "Deve ter no máximo 30 caracteres"),
      year: yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve ter no mínimo 2 caracteres"),
    });
  }
}
