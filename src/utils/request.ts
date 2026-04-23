import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export async function request<T = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  try {
    const response = await axiosInstance({
      url,
      ...options,
    });
    return response;
  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}