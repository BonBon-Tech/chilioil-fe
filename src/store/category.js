import { requestWithAlert } from '../utils/api';
import { uploadLogo } from '../utils/uploadLogo';

export default {
    namespaced: true,
    state: {
        categories: [],
        category: null,
        error: null,
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategory(state, category) {
            state.category = category;
        },
        clearCategory(state) {
            state.category = null;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        async fetchCategories({ commit, dispatch }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    '/api/v1/product/categories',
                    {},
                    {},
                    { error: true }
                );
                commit('setCategories', res.data.data || []);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch categories');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async showCategory({ commit, dispatch }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/product/categories/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setCategory', res.data.data);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch category');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createCategory({ dispatch, commit }, payload) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const categoryPayload = await prepareCategoryPayload(payload);
                await requestWithAlert(
                    'post',
                    '/api/v1/product/categories',
                    {
                        name: categoryPayload.get('name'),
                        slug: categoryPayload.get('slug'),
                        status: categoryPayload.get('status'),
                        logo: categoryPayload.get('logo') || null,
                    },
                    {},
                    { success: true, successMessage: 'Category created successfully', error: true }
                );
                // await dispatch('fetchCategories');
            } catch (err) {
                commit('setError', extractErrorMessage(err, 'Failed to create category'));
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateCategory({ dispatch, commit }, { id, payload }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const categoryPayload = await prepareCategoryPayload(payload, true);
                await requestWithAlert(
                    'put',
                    `/api/v1/product/categories/${id}`,
                    {
                        name: categoryPayload.get('name'),
                        slug: categoryPayload.get('slug'),
                        status: categoryPayload.get('status'),
                        logo: categoryPayload.get('logo') || null,
                    },
                    {},
                    { success: true, successMessage: 'Category updated successfully', error: true }
                );
                await dispatch('fetchCategories');
            } catch (err) {
                commit('setError', extractErrorMessage(err, 'Failed to update category'));
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteCategory({ dispatch, commit }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/product/categories/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Category deleted successfully', error: true }
                );
                // await dispatch('fetchCategories');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete category');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearCategory({ commit }) {
            commit('clearCategory');
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        categories: (state) => state.categories,
        category: (state) => state.category,
        categoryError: (state) => state.error,
    },
};

// Helper to extract error message
function extractErrorMessage(err, fallback) {
    let errorMsg = err.response?.data?.message || err.message || fallback;
    if (err.response?.status === 422 && err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstField = Object.keys(errors)[0];
        errorMsg = errors[firstField][0];
    }
    return errorMsg;
}

// Helper to prepare payload for category creation/update
async function prepareCategoryPayload(payload, isUpdate = false) {
    if (payload instanceof FormData && payload.get("logo")) {
        const logoFile = payload.get("logo");
        // For update, only upload if logoFile is a File (new upload)
        if (!isUpdate || (logoFile && typeof logoFile === "object" && logoFile instanceof File)) {
            const logoPath = await uploadLogo(logoFile, 'category');
            payload.delete("logo");
            payload.append("logo", logoPath);
        }
        // If update and logo is not a File, keep existing logo value (do nothing)
    }
    return payload;
}
