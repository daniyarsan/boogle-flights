import { ApiResponse } from "@/types";

class Requester {
  private async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    body?: Record<string, unknown> | FormData,
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        "x-rapidapi-key": "c191fca683msh78d34e3f6cd192dp1cf4fbjsnffb75128b755",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      };

      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body),
        credentials: "include",
      });

      const responseData = await response.json();
      return responseData as ApiResponse<T>;
    } catch (err) {
      console.log(err);
      return {
        status: false,
        message: "Произошла неизвестная ошибка: " + (err as Error).message,
        errors: [],
      };
    }
  }

  async get<T>(url: string) {
    return this.request<T>("GET", url);
  }

  async post<T>(url: string, body: Record<string, unknown> | FormData) {
    return this.request<T>("POST", url, body);
  }

  async put<T>(url: string, body: Record<string, unknown> | FormData) {
    return this.request<T>("PUT", url, body);
  }

  async delete<T>(url: string) {
    return this.request<T>("DELETE", url);
  }
}

export const apiClient = new Requester();
