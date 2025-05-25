import axios, { AxiosError } from "axios";
import { User } from "./interfaces/user/user";

const apiUrl =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

export async function loginUser(
  email: string,
  senha: string
): Promise<AxiosError | any> {
  try {
    const { data } = await api.post("/users/login", { email, senha });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getProducts(page: string, limit: string) {
  try {
    const { data } = await api.get(`/products/list/${page}/${limit}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getProductById(params) {
  try {
    const { data } = await api.get(`/products/${params}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function createUser(params: User): Promise<User | any> {
  try {
    const { data } = await api.post(`/users`, params);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getImagesPorduct(
  slug: string
): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(`/products/images/${slug}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getDetailsProduct(id: number): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(`/products/details/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function searchProducts(value: string): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(`/products/?name=${value}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function searchQuery(query: string): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(query);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getFavorites(): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(`/favorites`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function toggleFavorites(
  productId: number
): Promise<Array<any> | any> {
  try {
    const { data } = await api.post(`/favorites/toggle/${productId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function toggleCart(
  productId: number
): Promise<Array<any> | any> {
  try {
    const { data } = await api.post(`/cart/toggle/${productId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}

export async function getCart(): Promise<Array<any> | any> {
  try {
    const { data } = await api.get(`/cart`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error;
    }
  }
}
