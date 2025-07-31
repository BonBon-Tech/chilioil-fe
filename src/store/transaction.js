import { requestWithAlert } from '../utils/api';

export default {
    namespaced: true,
    state: {
        loading: false,
        error: null,
        lastTransaction: null,
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        setLastTransaction(state, transaction) {
            state.lastTransaction = transaction;
        },
    },
    actions: {
        async createTransaction({ commit, dispatch }, payload) {
            commit('clearError');
            commit('setLoading', true);
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    "post",
                    "/api/v1/transactions",
                    payload,
                    {},
                    { success: true, successMessage: "Transaction completed", error: true }
                );
                commit('setLastTransaction', res.data?.data || null);
                return { success: true, data: res.data?.data };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to create transaction');
                return { success: false, error: err };
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        transactionLoading: (state) => state.loading,
        transactionError: (state) => state.error,
        lastTransaction: (state) => state.lastTransaction,
    },
};

