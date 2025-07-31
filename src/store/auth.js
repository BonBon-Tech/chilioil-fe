import api from '../utils/api';

export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    },
    mutations: {
        setAuth(state, payload) {
            state.user = payload.user;
            state.token = payload.token;
            localStorage.setItem('user', JSON.stringify(payload.user));
            localStorage.setItem('token', payload.token);
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const res = await api.post('/api/v1/auth/login', credentials);
                if (res.data && res.data.data) {
                    commit('setAuth', {
                        user: res.data.data.user,
                        token: res.data.data.token,
                    });
                }
                return res;
            } catch (err) {
                let errorObj = {
                    message: 'Login failed',
                    fields: {},
                };
                if (err.response) {
                    const { status, data } = err.response;
                    errorObj.message = data.message || 'Login failed';
                    if (status === 422 && data.errors) {
                        errorObj.fields = data.errors;
                    } else if (status === 400) {
                        errorObj.fields = {};
                    }
                }
                throw errorObj;
            }
        },
        logout({ commit }) {
            commit('clearAuth');
        },
        getUser({ state }) {
            return state.user;
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    },
};