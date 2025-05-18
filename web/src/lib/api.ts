const API_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'feccb20344dc479f84945038251305';

interface IApi {
  get<TResponse>(endpoint: URL): Promise<TResponse>;
  post<TResponse>(endpoint: URL, body?: object): Promise<TResponse>;
  put<TResponse>(endpoint: URL, body?: object): Promise<TResponse>;
  delete<TResponse>(endpoint: URL): Promise<TResponse>;
  patch<TResponse>(endpoint: URL, body?: object): Promise<TResponse>;
}

const COMMON_HEADERS = {
  'Content-Type': 'application/json',
};

class Api implements IApi {
  async get<TResponse>(endpoint: URL): Promise<TResponse> {
    endpoint.searchParams.append('key', API_KEY);
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: COMMON_HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data: TResponse = await response.json();
    return data;
  }

  async post<TResponse>(endpoint: URL, body?: object): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: COMMON_HEADERS,
      body: JSON.stringify(body),
    });
    const data: TResponse = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return data;
  }

  async put<TResponse>(endpoint: URL, body?: object): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: COMMON_HEADERS,
      body: JSON.stringify(body),
    });
    const data: TResponse = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return data;
  }

  async delete<TResponse>(endpoint: URL): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: COMMON_HEADERS,
    });
    const data: TResponse = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return data;
  }

  async patch<TResponse>(endpoint: URL, body?: object): Promise<TResponse> {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: COMMON_HEADERS,
      body: JSON.stringify(body),
    });
    const data: TResponse = await response.json();
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return data;
  }
}

export const api = new Api();

export function apiUrl(path: string): URL {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  return new URL(`${API_URL}${path}`);
}
