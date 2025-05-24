export interface ProductModel {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  coverImg: string;
  categoria: string;
  id: number;
  a_venda: boolean;
  created_at: Date;
  update_at: Date;
  slug: string | null;
  favorites: number;
}
