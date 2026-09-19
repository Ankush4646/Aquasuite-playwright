export class ApiClient {
  async get<T>(url: string): Promise<T> {
    return { url } as T;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    return { url, body } as T;
  }
}
