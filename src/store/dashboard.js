import { requestWithAlert } from '@/utils/api';

export default {
    namespaced: true,
    state: {
        summary: {
            expense_total: 0,
            transaction_total: 0,
            user_count: 0,
            product_count: 0
        },
        product_sales_chilioil: [],
        product_sales_sate: [],
        product_sales_minuman: [],
        store_sales: [],
        loading: false,
        error: null
    },
    mutations: {
        SET_SUMMARY(state, data) {
            state.summary = data;
        },
        SET_PRODUCT_SALES_CHILIOIL(state, data) {
          state.product_sales_chilioil = data;
        },
        SET_PRODUCT_SALES_SATE(state, data) {
            state.product_sales_sate = data;
        },
        SET_PRODUCT_SALES_MINUMAN(state, data) {
            state.product_sales_minuman = data;
        },
        SET_LOADING(state, isLoading) {
            state.loading = isLoading;
        },
        SET_STORE_SALES(state, data) {
            state.store_sales = data;
        },
        SET_ERROR(state, error) {
            state.error = error;
        }
    },
    actions: {
        async fetchSummary({ commit, dispatch }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                dispatch('loading/showLoading', null, { root: true });

                const response = await requestWithAlert(
                    'get',
                    '/api/v1/dashboard/summary',
                    {},
                    {},
                    {
                        error: true,
                        success: false,
                        errorMessage: 'Failed to load dashboard data'
                    }
                );

                commit('SET_SUMMARY', response.data.data);
                return response.data;
            } catch (error) {
                commit('SET_ERROR', error.message || 'Failed to fetch dashboard summary');
                throw error;
            } finally {
                commit('SET_LOADING', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async fetchStoreSales({ commit, dispatch }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                dispatch('loading/showLoading', null, { root: true });

                const response = await requestWithAlert(
                    'get',
                    '/api/v1/dashboard/store-sales',
                    {},
                    {},
                    {
                        error: true,
                        success: false,
                        errorMessage: 'Failed to load dashboard data'
                    }
                );

                commit('SET_STORE_SALES', response.data.data);
                return response.data;
            } catch (error) {
                commit('SET_ERROR', error.message || 'Failed to fetch dashboard store sales');
                throw error;
            } finally {
                commit('SET_LOADING', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async fetchProductSales({ commit, dispatch }, { store_id = 1 } = {}) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);
            try {
                dispatch('loading/showLoading', null, { root: true });

                const response = await requestWithAlert(
                    'get',
                    `/api/v1/dashboard/product-sales?store_id=${store_id}`,
                    {},
                    {},
                    {
                        error: true,
                        success: false,
                        errorMessage: 'Failed to load dashboard data'
                    }
                );

                switch (store_id) {
                    case 1:
                        commit('SET_PRODUCT_SALES_CHILIOIL', response.data.data);
                        break;
                    case 2:
                        commit('SET_PRODUCT_SALES_SATE', response.data.data);
                        break;
                    case 3:
                        commit('SET_PRODUCT_SALES_MINUMAN', response.data.data);
                        break;
                }
                return response.data;
            } catch (error) {
                commit('SET_ERROR', error.message || 'Failed to fetch dashboard product sales');
                throw error;
            } finally {
                commit('SET_LOADING', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        }
    },
    getters: {
        summary: state => state.summary,
        loading: state => state.loading,
        error: state => state.error,
        product_sales_chilioil: state => state.product_sales_chilioil,
        product_sales_sate: state => state.product_sales_sate,
        product_sales_minuman: state => state.product_sales_minuman,
        store_sales: state => state.store_sales,
    }
};
