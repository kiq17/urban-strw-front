export interface ISelf {
    nome: string;
    cpf: string;
    email: string
}

export interface IDelivery {
    endereco: string,
    cep: string,
    cidade: string,
    estado: string,
    bairro: string,
    numero: string,
    complemento: string,
}