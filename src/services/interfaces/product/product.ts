export interface Product{
    id: number;
    nome: string
    descricao: string
    preco: number
    quantidade: number
    coverImg: string
    categoria: string
    a_venda: boolean
    created_at: Date
    slug: string;
    update_at: Date
    favorites: number;
}