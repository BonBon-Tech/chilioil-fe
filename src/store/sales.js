import { requestWithAlert } from '../utils/api';

export default {
    namespaced: true,
    state: {
        loading: false,
        error: null,
        transactions: [],
        transaction: null,
        pagination: null,
        filters: {
            search: '',
            code: '',
            customer_name: '',
            date: '',
            start_date: '',
            from_date: '',
            total_min: '',
            total_max: '',
            sub_total_min: '',
            sub_total_max: '',
            total_item_min: '',
            total_item_max: '',
            type: '',
            payment_type: '',
            status: ''
        }
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
        setTransactions(state, transactions) {
            state.transactions = transactions;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
        setFilters(state, filters) {
            state.filters = { ...state.filters, ...filters };
        },
        setSelectedTransaction(state, transaction) {
          state.transaction = transaction;
        },
        resetFilters(state) {
            state.filters = {
                search: '',
                code: '',
                customer_name: '',
                date: '',
                start_date: '',
                from_date: '',
                total_min: '',
                total_max: '',
                sub_total_min: '',
                sub_total_max: '',
                total_item_min: '',
                total_item_max: '',
                type: '',
                payment_type: '',
                status: ''
            };
        }
    },
    actions: {
        async fetchTransactions({ commit, state }, { page = 1, perPage = 10 } = {}) {
            commit('setLoading', true);
            commit('clearError');

            try {
                // Build query parameters
                let url = `/api/v1/transactions?page=${page}&per_page=${perPage}`;

                // Add filter params if they have values
                Object.keys(state.filters).forEach(key => {
                    if (state.filters[key] !== '' && state.filters[key] !== null) {
                        url += `&${key}=${encodeURIComponent(state.filters[key])}`;
                    }
                });

                const response = await requestWithAlert(
                    'get',
                    url,
                    {},
                    {},
                    { error: true }
                );

                const { data } = response.data;

                commit('setTransactions', data.data || []);
                commit('setPagination', {
                    current_page: data.current_page,
                    from: data.from,
                    last_page: data.last_page,
                    per_page: data.per_page,
                    to: data.to,
                    total: data.total,
                    links: data.links
                });

                return { success: true, data: data };
            } catch (error) {
                commit('setError', error.response?.data?.message || error.message || 'Failed to fetch transactions');
                return { success: false, error };
            } finally {
                commit('setLoading', false);
            }
        },

        updateFilters({ commit, dispatch }, filters) {
            commit('setFilters', filters);
            // Fetch with new filters, reset to page 1
            dispatch('fetchTransactions', { page: 1 });
        },

        resetFilters({ commit, dispatch }) {
            commit('resetFilters');
            dispatch('fetchTransactions', { page: 1 });
        },

        changePerPage({ dispatch }, perPage) {
            dispatch('fetchTransactions', { page: 1, perPage });
        },

        changePage({ dispatch, state }, page) {
            dispatch('fetchTransactions', { page, perPage: state.pagination?.per_page || 10 });
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
    },
    getters: {
        transaction: state => state.transaction,
        transactions: state => state.transactions,
        pagination: state => state.pagination,
        isLoading: state => state.loading,
        error: state => state.error,
        filters: state => state.filters
    }
};

