import { requestWithAlert } from '@/utils/api';

export default {
    namespaced: true,
    state: {
        expenses: [],
        expenseDetail: null, // <-- add this
        pagination: {
            current_page: 1,
            per_page: 10,
            total: 0,
            last_page: 1,
        },
        error: null,
    },
    mutations: {
        setExpenses(state, expenses) {
            state.expenses = expenses;
        },
        setExpenseDetail(state, expense) { // <-- add this
            state.expenseDetail = expense;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        async fetchExpenses({ commit, dispatch }, { page = 1, per_page = 10 } = {}) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    '/api/v1/expenses',
                    { page, per_page },
                    {},
                    { error: true }
                );
                // If response is paginated, handle accordingly
                const data = res.data.data;
                if (Array.isArray(data)) {
                    commit('setExpenses', data);
                    commit('setPagination', {
                        current_page: page,
                        per_page,
                        total: data.length,
                        last_page: 1,
                    });
                } else {
                    commit('setExpenses', data.data || []);
                    commit('setPagination', {
                        current_page: data.current_page,
                        per_page: data.per_page,
                        total: data.total,
                        last_page: data.last_page,
                    });
                }
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch expenses');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createExpense({ dispatch, commit }, payload) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'post',
                    '/api/v1/expenses',
                    payload,
                    {},
                    { success: true, successMessage: 'Expense created successfully', error: true }
                );
                await dispatch('fetchExpenses');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to create expense');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async fetchExpenseDetail({ commit, dispatch }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/expenses/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setExpenseDetail', res.data.data);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch expense detail');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateExpense({ dispatch, commit }, { id, payload }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'put',
                    `/api/v1/expenses/${id}`,
                    payload,
                    {},
                    { success: true, successMessage: 'Expense updated successfully', error: true }
                );
                await dispatch('fetchExpenses');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to update expense');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteExpense({ dispatch, commit }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/expenses/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Expense deleted successfully', error: true }
                );
                await dispatch('fetchExpenses');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete expense');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        expenses: (state) => state.expenses,
        expenseError: (state) => state.error,
        expenseDetail: (state) => state.expenseDetail, // <-- add this
        pagination: (state) => state.pagination,
    },
};
