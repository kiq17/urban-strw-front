import axios, { AxiosError } from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/data/protocols/http/httpClient";

export class AxiosAdapter implements HttpClient {
  async request({
    method,
    url,
    body,
    headers,
    params,
  }: HttpRequest): Promise<HttpResponse> {
    try {
      const { data, status } = await axios.request({
        method,
        url,
        data: body,
        headers,
        params,
        withCredentials: true,
      });
      return {
        statusCode: status,
        body: data,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return {
          statusCode: axiosError.response.status,
          body: axiosError.response.data,
        };
      }

      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}
