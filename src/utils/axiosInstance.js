// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL da API
    timeout: 10000, // Tempo máximo de espera para a resposta
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
