import { requestWithAlert } from '../utils/api';

export default {
    namespaced: true,
    state: {
        designations: [],
        designation: null,
        error: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
    },
    mutations: {
        setDesignations(state, designations) {
            state.designations = designations;
        },
        setDesignation(state, designation) {
            state.designation = designation;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },
    actions: {
        async fetchDesignations({ commit, dispatch }, page = 1) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/roles?page=${page}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setDesignations', res.data.data || []);
                // If paginated, update pagination state
                if (res.data.current_page) {
                    commit('setPagination', {
                        current_page: res.data.current_page,
                        last_page: res.data.last_page,
                        per_page: res.data.per_page,
                        total: res.data.total,
                    });
                } else {
                    // fallback for non-paginated
                    commit('setPagination', {
                        current_page: 1,
                        last_page: 1,
                        per_page: res.data.data?.length || 10,
                        total: res.data.data?.length || 0,
                    });
                }
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch designations');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createDesignation({ dispatch, commit }, payload) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'post',
                    '/api/v1/roles',
                    payload,
                    {},
                    { success: true, successMessage: 'Designation created successfully', error: true }
                );
                await dispatch('fetchDesignations');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to create designation');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateDesignation({ dispatch, commit }, { id, payload }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'put',
                    `/api/v1/roles/${id}`,
                    payload,
                    {},
                    { success: true, successMessage: 'Designation updated successfully', error: true }
                );
                await dispatch('fetchDesignations');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to update designation');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async showDesignation({ commit, dispatch }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/roles/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setDesignation', res.data.data);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch designation');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteDesignation({ dispatch, commit }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/roles/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Designation deleted successfully', error: true }
                );
                await dispatch('fetchDesignations');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete designation');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        designations: (state) => state.designations,
        designation: (state) => state.designation,
        designationError: (state) => state.error,
        designationPagination: (state) => state.pagination,
    },
};
