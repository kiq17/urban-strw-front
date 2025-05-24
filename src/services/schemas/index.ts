import * as yup from "yup";


export const selfData = yup.object({
    nome: yup.string().max(100, "Nome inválido").min(3, "Nome inválido"),
    email: yup.string().matches(/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/, { message: "Email inválido" }),
    cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Numero de CPF inválido")
});

export const deliveryPlace = yup.object({
    endereco: yup.string().max(100, "Endereço inválido").min(3, "Endereço inválido"),
    cep: yup.string().min(8, "Cep inválido"),
    cidade: yup.string().min(3, "Dado inválido").max(100, "Dado inválido"),
    estado: yup.string().min(2, "Dado inválido").max(100, "Dado inválido"),
    bairro: yup.string().min(3, "Dado inválido").max(100, "Dado inválido"),
    numero: yup.string().min(2, "Dado inválido").max(5, "Dado inválido"),
    complemento: yup.string().min(3, "Dado inválido").max(100, "Dado inválido"),
});

