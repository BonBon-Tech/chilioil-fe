import axios from 'axios';
import store from '@/store';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Helper for global alert handling
async function requestWithAlert(method, url, data = {}, config = {}, alertOptions = {}) {
    try {
        const res = await api[method](url, data, config);

        if (alertOptions.success && (!res.data?.errors || res.status < 400)) {
            store.dispatch('alert/triggerAlert', {
                type: 'success',
                message: alertOptions.successMessage || 'Action successful',
            });
        }
        return res;
    } catch (err) {
        let errorMsg = err.response?.data?.message || err.message || 'Request failed';
        if (err.response?.status === 422 && err.response?.data?.errors) {
            const errors = err.response.data.errors;
            const firstField = Object.keys(errors)[0];
            errorMsg = errors[firstField][0];
        }
        if (err.response?.status === 401) {
            errorMsg = err?.response.data?.message;
            // Trigger logout action on 401
            store.dispatch('auth/logout');
        }
        if (alertOptions.error) {
            store.dispatch('alert/triggerAlert', {
                type: 'danger',
                message: errorMsg,
            });
        }
        throw err;
    }
}

export { api, requestWithAlert };
export default api;
