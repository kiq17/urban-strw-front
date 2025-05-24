import { CreditCardFields } from "@/data/protocols/validation/creditCard.validation";
import { CpfValidation, FiledsValidation } from "@/data/protocols/validation/fieldsValidation";
import * as yup from "yup";

export class YupFiledsAdapter implements FiledsValidation, CreditCardFields {

  constructor(
    private readonly cpfValidation: CpfValidation
  ){}

  email(email: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .email("Email inválido")
        .validateSync(email);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }
  nome(nome: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres")
        .validateSync(nome.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  fullName(fullName: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(40, "Deve ter no máximo 40 caracteres")
        .validateSync(fullName.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  password(password: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .min(6, "Deve ter no mínimo 6 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres")
        .validateSync(password);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  cpf(cpf: string): string | void {
    return this.cpfValidation.validate(cpf);
  }

  city(city: string): string | void{
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 6 caracteres")
        .max(30, "Deve ter no máximo 30 caracteres")
        .validateSync(city.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  cep(cep: string): string | void{
    try {
      const clean = cep.replace("-", "")
      yup
        .number()
        .required("Campo obrigatório")
        .min(8, "Deve ter no mínimo 8 caracteres")
        .max(8, "Deve ter no máximo 8 caracteres")
        .validateSync(+clean);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }    
  }

  houseNumber(houseNumber: number): string | void{
    try {
      console.log("numero", houseNumber)
      yup
        .number()
        .required("Campo obrigatório")
        .min(1, "Deve ter no mínimo 1 caracteres")
        .max(6, "Deve ter no máximo 6 caracteres")
        .validateSync(houseNumber);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  houseType(houseType: string): string | void{
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres")
        .validateSync(houseType);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }
  neighborhood(neighborhood: string): string | void{
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(20, "Deve ter no máximo 20 caracteres")
        .validateSync(neighborhood.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  state(state: string): string | void{
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve conter 2 caracteres")
        .validateSync(state.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  street(street: string): string | void{
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(50, "Deve ter no máximo 50 caracteres")
        .validateSync(street.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  cvv(value: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido letras ou caracteres especiais")
        .length(3, "Deve ter no máximo 3 caracteres")
        .validateSync(value);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  month(value: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve ter no mínimo 2 caracteres")
        .validateSync(value);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  name(value: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/^[a-zA-Z0-9_ ]*$/, "Não é permitido números ou caracteres especiais")
        .min(3, "Deve ter no mínimo 3 caracteres")
        .max(40, "Deve ter no máximo 40 caracteres")
        .validateSync(value.trim());
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  number(value: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .min(13, "Deve ter no mínimo 13 caracteres")
        .max(30, "Deve ter no máximo 30 caracteres")
        .validateSync(value);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }

  year(value: string): string | void {
    try {
      yup
        .string()
        .required("Campo obrigatório")
        .matches(/\d/, "Não é permitido números ou caracteres especiais")
        .length(2, "Deve ter no mínimo 2 caracteres")
        .validateSync(value);
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return yupError.message;
    }
  }
}
