import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Logger from './Logger';

export class ApiHelper {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // Request interceptor for logging
        this.axiosInstance.interceptors.request.use((config) => {
            Logger.info(`API Request: [${config.method?.toUpperCase()}] ${config.url}`);
            return config;
        }, (error) => {
            Logger.error(`API Request Error: ${error.message}`);
            return Promise.reject(error);
        });

        // Response interceptor for logging
        this.axiosInstance.interceptors.response.use((response) => {
            Logger.info(`API Response: [${response.status}] ${response.config.url}`);
            return response;
        }, (error) => {
            Logger.error(`API Response Error: ${error.message}`);
            return Promise.reject(error);
        });
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get<T>(url, config);
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.axiosInstance.delete<T>(url, config);
    }
}
