import { requestWithAlert } from '../utils/api';
import { uploadLogo } from '../utils/uploadLogo';

export default {
    namespaced: true,
    state: {
        stores: [],
        error: null,
        loading: false,
    },
    mutations: {
        setStores(state, stores) {
            state.stores = stores;
        },
        setError(state, error) {
            state.error = error;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        async fetchStores({ commit, dispatch }) {
            commit('setLoading', true);
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    '/api/v1/stores',
                    {},
                    {},
                    { error: true }
                );
                commit('setStores', res.data.data || []);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch stores');
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createStore({ dispatch, commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                let data = { name: payload.name };
                if (payload.logo instanceof File) {
                    const logoPath = await uploadLogo(payload.logo, 'store');
                    data.logo = logoPath;
                }
                await requestWithAlert(
                    'post',
                    '/api/v1/stores',
                    data,
                    {},
                    { success: true, successMessage: 'Store created successfully', error: true }
                );
                await dispatch('fetchStores');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to create store');
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateStore({ dispatch, commit }, { id, payload }) {
            commit('setLoading', true);
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                let data = { name: payload.name };
                if (payload.logo instanceof File) {
                    const logoPath = await uploadLogo(payload.logo, 'store');
                    data.logo = logoPath;
                }
                await requestWithAlert(
                    'put',
                    `/api/v1/stores/${id}`,
                    data,
                    {},
                    { success: true, successMessage: 'Store updated successfully', error: true }
                );
                await dispatch('fetchStores');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to update store');
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteStore({ dispatch, commit }, id) {
            commit('setLoading', true);
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/stores/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Store deleted successfully', error: true }
                );
                await dispatch('fetchStores');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete store');
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
    },
    getters: {
        stores: (state) => state.stores,
        storeError: (state) => state.error,
        storeLoading: (state) => state.loading,
    },
};
