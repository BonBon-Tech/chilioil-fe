import { requestWithAlert } from '../utils/api';

export default {
    namespaced: true,
    state: {
        loading: false,
        error: null,
        lastTransaction: null,
        pendingTransactions: [],
        paidTransactions: [],
        selectedTransaction: null,
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
        setPendingTransactions(state, transactions) {
            state.pendingTransactions = transactions;
        },
        setPaidTransactions(state, transactions) {
            state.paidTransactions = transactions;
        },
        setSelectedTransaction(state, transaction) {
            state.selectedTransaction = transaction;
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

        async fetchTransactions({ commit, dispatch }, { status, fromDate, toDate, searchQuery }) {
            commit('clearError');
            commit('setLoading', true);
            dispatch('loading/showLoading', null, { root: true });

            try {
                // Build the URL with query parameters
                let url = `/api/v1/transactions?status=${status}`;

                // Append date filters if provided
                if (fromDate) {
                    url += `&start_date=${encodeURIComponent(fromDate)}`;
                }

                if (toDate) {
                    url += `&end_date=${encodeURIComponent(toDate)}`;
                }

                // Add search query if provided
                if (searchQuery) {
                    url += `&search=${encodeURIComponent(searchQuery)}`;
                }

                const res = await requestWithAlert(
                    "get",
                    url,
                    {},  // Empty data object since params are in URL
                    {},
                    { error: true }
                );

                if (status === 'PENDING') {
                    commit('setPendingTransactions', res.data?.data?.data || []);
                } else if (status === 'PAID') {
                    commit('setPaidTransactions', res.data?.data?.data || []);
                }

                return { success: true, data: res.data?.data };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch transactions');
                return { success: false, error: err };
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },

        async getTransaction({ commit, dispatch }, id) {
            commit('clearError');
            commit('setLoading', true);
            dispatch('loading/showLoading', null, { root: true });

            try {
                const res = await requestWithAlert(
                    "get",
                    `/api/v1/transactions/${id}`,
                    {},
                    {},
                    { error: true }
                );

                commit('setSelectedTransaction', res.data?.data || null);
                return { success: true, data: res.data?.data };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to get transaction details');
                return { success: false, error: err };
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },

        async updateTransactionStatus({ commit, dispatch, state }, { id, status }) {
            commit('clearError');
            commit('setLoading', true);
            dispatch('loading/showLoading', null, { root: true });

            try {
                // Updated to use the correct endpoint
                const res = await requestWithAlert(
                    "put",
                    `/api/v1/transactions/${id}`,
                    { status },  // Send the status update
                    {},
                    {
                        success: true,
                        successMessage: status === 'CANCEL'
                            ? 'Transaction cancelled successfully'
                            : `Transaction ${status.toLowerCase()} successfully`, error: true }
                );

                // Update in local state if successful
                if (res.data?.data) {
                    commit('setSelectedTransaction', res.data.data);

                    // If this was a PENDING transaction that changed status, remove it from pendingTransactions
                    if (status !== 'PENDING') {
                        commit('setPendingTransactions',
                            state.pendingTransactions.filter(t => t.id !== id)
                        );
                    }

                    // If status changed to PAID, add to paidTransactions
                    if (status === 'PAID') {
                        const exists = state.paidTransactions.some(t => t.id === id);
                        if (!exists) {
                            commit('setPaidTransactions', [res.data.data, ...state.paidTransactions]);
                        }
                    }
                }

                return { success: true, data: res.data?.data };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to update transaction status');
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
        pendingTransactions: (state) => state.pendingTransactions,
        paidTransactions: (state) => state.paidTransactions,
        selectedTransaction: (state) => state.selectedTransaction,
    },
};
