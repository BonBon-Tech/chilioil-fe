import { api } from './api';
import store from '@/store';

export async function uploadLogo(file, category) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    try {
        const res = await api.post('/api/v1/images', formData);
        if (res.data && res.data.data && res.data.data.path) {
            return res.data.data.path;
        }
        // If no path, treat as error
        const errorMsg = 'No image path returned';
        store.dispatch('alert/triggerAlert', {
            type: 'danger',
            message: errorMsg,
        });
        throw errorMsg;
    } catch (err) {
        let errorMsg = err.response?.data?.message || err.message || 'Failed to upload image';
        if (err.response?.status === 422 && err.response?.data?.errors) {
            const errors = err.response.data.errors;
            const firstField = Object.keys(errors)[0];
            errorMsg = errors[firstField][0];
        }
        store.dispatch('alert/triggerAlert', {
            type: 'danger',
            message: errorMsg,
        });
        throw errorMsg;
    }
}
