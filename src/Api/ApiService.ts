import axios, { AxiosInstance } from 'axios';
import {API_BASE_URL} from './config';
import Swal from 'sweetalert2';

class ApiService {
  private client: AxiosInstance;

  private endpoints = {
    register: "",
    login: "",
    validateToken: ""
  };

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000,

    });
    this.endpoints = {
      register: '/api/auth/register',
      login: '/api/auth/login',
      validateToken : '/api/auth/validate-token',
      // profile: (userId) => `/users/${userId}`, // Example of dynamic endpoint
    };

    this.client.interceptors.request.use(
      (config) => {
        // Skip adding the token for specific endpoints
        if (
          config.url !== this.endpoints.register &&
          config.url !== this.endpoints.login &&
          config.url !== this.endpoints.validateToken
        ) {

          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
          // Handle unauthorized access (e.g., redirect to login page)
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  async get<T>(endpoint: string, params: Record<string, any> = {}, headers: Record<string, string> = {}) {
    try {
      const response = await this.client.get<T>(endpoint, { params, headers });

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic POST request
  async post<T>(endpoint: string, data: any = {}, headers: Record<string, string> = {}) {
    try {
      const response = await this.client.post<T>(endpoint, data, {headers});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic PUT request
  async put(endpoint:string, data = {}, config = {}) {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic DELETE request
  async delete(endpoint:string, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized error handling
  handleError(error:any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      showConfirmButton : false,
      timer: 1500,
      text: error.response?.data?.message || error.message,
    });

    console.error('API Error:', error.response?.data || error.message);
    throw error; // Re-throw the error to handle it at the call site
  }


}

export default ApiService;
