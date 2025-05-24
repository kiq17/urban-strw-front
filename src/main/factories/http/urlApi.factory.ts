const api =
  import.meta.env.MODE == "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;

export const makeApiUrl = (path: string): string => `${api}` + path;
