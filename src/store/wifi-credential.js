import { requestWithAlert } from '../utils/api';

export default {
  namespaced: true,
  state: {
    credentials: [],
    credential: null,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
  },
  mutations: {
    setCredentials(state, list) {
      state.credentials = list;
    },
    setCredential(state, item) {
      state.credential = item;
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
    updateItemStatus(state, { id, is_active, code }) {
      const idx = state.credentials.findIndex(i => i.id === id);
      if (idx !== -1) {
        state.credentials[idx].is_active = is_active;
        if (typeof code !== 'undefined') state.credentials[idx].code = code;
      }
    },
  },
  actions: {
    async fetchCredentials({ commit, dispatch }, { page = 1, per_page = 10, search = '' } = {}) {
      commit('clearError');
      dispatch('loading/showLoading', null, { root: true });
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('per_page', per_page);
        if (search) params.append('search', search);

        const res = await requestWithAlert(
          'get',
          `/api/v1/wifi-credentials?${params.toString()}`,
          {},
          {},
          { error: true }
        );

        const data = res.data?.data || res.data?.results || [];
        commit('setCredentials', Array.isArray(data) ? data : []);

        // Handle pagination whether provided at root or within data wrapper
        const pg = {
          current_page: res.data?.current_page || res.data?.meta?.current_page || 1,
          last_page: res.data?.last_page || res.data?.meta?.last_page || 1,
          per_page: res.data?.per_page || res.data?.meta?.per_page || per_page,
          total: res.data?.total || res.data?.meta?.total || (Array.isArray(data) ? data.length : 0),
        };
        commit('setPagination', pg);
      } catch (err) {
        commit('setError', err.response?.data?.message || err.message || 'Failed to fetch wifi credentials');
      } finally {
        dispatch('loading/hideLoading', null, { root: true });
      }
    },

    async createCredential({ dispatch, commit }, payload) {
      // payload: { code: string, is_active: boolean }
      commit('clearError');
      dispatch('loading/showLoading', null, { root: true });
      try {
        await requestWithAlert(
          'post',
          '/api/v1/wifi-credentials',
          payload,
          {},
          { success: true, successMessage: 'Credential created successfully', error: true }
        );
        await dispatch('fetchCredentials', {});
      } catch (err) {
        commit('setError', err.response?.data?.message || err.message || 'Failed to create credential');
      } finally {
        dispatch('loading/hideLoading', null, { root: true });
      }
    },

    async updateCredentialStatus({ dispatch, commit }, { id, is_active, code }) {
      // Include code in payload as requested
      commit('clearError');
      dispatch('loading/showLoading', null, { root: true });
      try {
        await requestWithAlert(
          'put',
          `/api/v1/wifi-credentials/${id}`,
          { is_active, code },
          {},
          { success: true, successMessage: 'Status updated successfully', error: true }
        );
        commit('updateItemStatus', { id, is_active, code });
        return true; // indicate success to caller
      } catch (err) {
        commit('setError', err.response?.data?.message || err.message || 'Failed to update credential status');
        return false; // indicate failure to caller
      } finally {
        dispatch('loading/hideLoading', null, { root: true });
      }
    },

    async deleteCredential({ dispatch, commit }, id) {
      commit('clearError');
      dispatch('loading/showLoading', null, { root: true });
      try {
        await requestWithAlert(
          'delete',
          `/api/v1/wifi-credentials/${id}`,
          {},
          {},
          { success: true, successMessage: 'Credential deleted successfully', error: true }
        );
        await dispatch('fetchCredentials', {});
      } catch (err) {
        commit('setError', err.response?.data?.message || err.message || 'Failed to delete credential');
      } finally {
        dispatch('loading/hideLoading', null, { root: true });
      }
    },

    // New: set current credential for editing (style parity with showCategory)
    showCredential({ commit, state }, idOrItem) {
      const item = typeof idOrItem === 'object'
        ? idOrItem
        : state.credentials.find(i => i.id === idOrItem) || null;
      commit('setCredential', item);
    },

    clearError({ commit }) {
      commit('clearError');
    },
  },
  getters: {
    credentials: (state) => state.credentials,
    credential: (state) => state.credential,
    wifiCredentialError: (state) => state.error,
    pagination: (state) => state.pagination,
  },
};
