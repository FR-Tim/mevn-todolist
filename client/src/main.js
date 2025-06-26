import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

// Après la connexion, stockez le JWT dans le localStorage
// localStorage.setItem('jwt', token);

// Configurez Axios pour ajouter automatiquement le JWT dans l'en-tête Authorization
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

createApp(App).mount('#app')
