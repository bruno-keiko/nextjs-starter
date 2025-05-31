/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from 'js-cookie';
import { CustomError } from '@/shared/utils';
import { BASE_URL } from '../env';

class ApiFetcher {
  private prefix: string;
  private isServer() {
    return typeof window === 'undefined';
  }
  private async getAccessToken(): Promise<string | undefined> {
    if (this.isServer()) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { cookies } = require('next/headers');
      const cookieStore = await cookies();
      return cookieStore.get('accessToken')?.value;
    } else {
      const token = Cookies.get('accessToken');
      return token;
    }
  }

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.prefix}${endpoint}`;
    const accessToken = await this.getAccessToken();
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const error: CustomError = new Error(response.statusText);
      error.status = response.status;
      error.response = response;
      throw error;
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: T = await response.json();
      return data;
    } else {
      return response as unknown as T;
    }
  }

  // GET request
  public async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST request
  public async post<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
    const isFormData = body instanceof FormData;

    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      headers: isFormData
        ? { ...options.headers }
        : { 'Content-Type': 'application/json', ...options.headers },
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  // PUT request
  public async put<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
    const isFormData = body instanceof FormData;

    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      headers: isFormData
        ? options.headers
        : { 'Content-Type': 'application/json', ...options.headers },

      body: isFormData ? body : JSON.stringify(body),
    });
  }

  // PATCH request
  public async patch<T>(endpoint: string, body: any, options: RequestInit = {}): Promise<T> {
    const isFormData = body instanceof FormData;

    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      headers: isFormData
        ? { ...options.headers }
        : { 'Content-Type': 'application/json', ...options.headers },
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  public async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiFetcher(BASE_URL ? BASE_URL : 'localhost:3000');

export default ApiFetcher;
