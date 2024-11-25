import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';

import { VITE_SERVER_ENDPOINT_URL } from '@/config/env';

export interface HttpResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface HttpError extends Error {
    code?: string;
    details?: Record<string, any>;
}

export class HttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = VITE_SERVER_ENDPOINT_URL) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // You can add auth token here if needed
                return config;
            },
            (error) => {
                return Promise.reject(new Error(error.message));
            },
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error: AxiosError) => {
                const httpError = new Error(error.message) as HttpError;
                httpError.code = `HTTP_${error.response?.status || 'UNKNOWN'}`;
                httpError.details = {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                };
                return Promise.reject(httpError);
            },
        );
    }

    async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
        return this.axiosInstance.get<any, HttpResponse<T>>(endpoint, config);
    }

    async post<T>(
        endpoint: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<HttpResponse<T>> {
        return this.axiosInstance.post<any, HttpResponse<T>>(endpoint, data, config);
    }

    async put<T>(
        endpoint: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<HttpResponse<T>> {
        return this.axiosInstance.put<any, HttpResponse<T>>(endpoint, data, config);
    }

    async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<HttpResponse<T>> {
        return this.axiosInstance.delete<any, HttpResponse<T>>(endpoint, config);
    }
}

// Create a singleton instance
export const httpClient = new HttpClient();
