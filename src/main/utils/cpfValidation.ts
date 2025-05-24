import { CpfValidation } from "@/data/protocols/validation/fieldsValidation";

export class CpfValidator implements CpfValidation {
  validate(cpf: string): string | void {
    if (cpf.length == 0) return "Campo obrigatório";

    if (cpf.length == 15) {
      cpf = cpf.slice(0, 14);
    }

    let value = cpf.replace(/[^a-zA-Z0-9 ]/g, "");

    let sum, i, j, rest, dv1, dv2;

    // alguns CPFs são válidos pelo algoritmo, mas não existem no registro oficial
    const notResgisterInGov = {
      "11111111111": true,
      "22222222222": true,
      "33333333333": true,
      "44444444444": true,
      "55555555555": true,
      "66666666666": true,
      "77777777777": true,
      "88888888888": true,
      "99999999999": true,
    };

    if (notResgisterInGov[value]) return "CPF inválido";

    const toNumber = value.split("").map((item) => +item);

    sum = 0;
    j = 10;

    for (let i = 0; i < 9; i++) {
      sum += toNumber[i] * j;
      j -= 1;
    }

    rest = sum % 11;

    rest < 2 ? (dv1 = 0) : (dv1 = 11 - rest);

    sum = 0;
    j = 11;

    for (let i = 0; i < 10; i++) {
      sum += toNumber[i] * j;
      j -= 1;
    }

    rest = sum % 11;

    rest < 2 ? (dv2 = 0) : (dv2 = 11 - rest);

    if (toNumber[9] == dv1 && toNumber[10] == dv2) return;

    return "CPF inválido";
  }
}
