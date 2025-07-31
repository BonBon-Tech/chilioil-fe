import { requestWithAlert } from '../utils/api';

export default {
    namespaced: true,
    state: {
        employees: [],
        employee: null,
        error: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
    },
    mutations: {
        setEmployees(state, employees) {
            state.employees = employees;
        },
        setEmployee(state, employee) {
            state.employee = employee;
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
        async fetchEmployees({ commit, dispatch }, page = 1) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/users?page=${page}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setEmployees', res.data.data || []);
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
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch employees');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async showEmployee({ commit, dispatch }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/users/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setEmployee', res.data.data);
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch employee');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createEmployee({ dispatch, commit }, payload) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'post',
                    '/api/v1/users',
                    payload,
                    {},
                    { success: true, successMessage: 'Employee created successfully', error: true }
                );
                await dispatch('fetchEmployees');
            } catch (err) {
                let errorMsg = err.response?.data?.message || err.message || 'Failed to create employee';
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    const errors = err.response.data.errors;
                    const firstField = Object.keys(errors)[0];
                    errorMsg = errors[firstField][0];
                }
                commit('setError', errorMsg);
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateEmployee({ dispatch, commit }, { id, payload }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'put',
                    `/api/v1/users/${id}`,
                    payload,
                    {},
                    { success: true, successMessage: 'Employee updated successfully', error: true }
                );
                await dispatch('fetchEmployees');
            } catch (err) {
                let errorMsg = err.response?.data?.message || err.message || 'Failed to update employee';
                if (err.response?.status === 422 && err.response?.data?.errors) {
                    const errors = err.response.data.errors;
                    const firstField = Object.keys(errors)[0];
                    errorMsg = errors[firstField][0];
                }
                commit('setError', errorMsg);
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteEmployee({ dispatch, commit }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/users/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Employee deleted successfully', error: true }
                );
                await dispatch('fetchEmployees');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete employee');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearError({ commit }) {
            commit('clearError');
        },
    },
    getters: {
        employees: (state) => state.employees,
        employee: (state) => state.employee,
        employeeError: (state) => state.error,
        employeePagination: (state) => state.pagination,
    },
};
