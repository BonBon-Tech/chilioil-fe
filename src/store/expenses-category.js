import { requestWithAlert } from '@/utils/api';

export default {
    namespaced: true,
    state: {
        expense_categories: [],
        expense_category: null,
        error: null,
    },
    mutations: {
        setExpenseCategories(state, expense_categories) {
            state.expense_categories = expense_categories;
        },
        setExpenseCategory(state, expense_category) {
            state.expense_category = expense_category;
        },
        clearExpenseCategory(state) {
            state.expense_category = null;
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
                    '/api/v1/expense/categories',
                    {},
                    {},
                    { error: true }
                );
                commit('setExpenseCategories', res.data.data || []);
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
                    `/api/v1/expense/categories/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setExpenseCategory', res.data.data);
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
                await requestWithAlert(
                    'post',
                    '/api/v1/expense/categories',
                    {
                        name: payload.name,
                        code: payload.code,
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
                await requestWithAlert(
                    'put',
                    `/api/v1/expense/categories/${id}`,
                    {
                        name: payload.name,
                        code: payload.code,
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
                    `/api/v1/expense/categories/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Category deleted successfully', error: true }
                );
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete category');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearCategory({ commit }) {
            commit('clearExpenseCategory');
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        expense_categories: (state) => state.expense_categories,
        expense_category: (state) => state.expense_category,
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