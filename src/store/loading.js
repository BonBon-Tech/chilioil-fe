export default {
    namespaced: true,
    state: {
        visible: false,
    },
    mutations: {
        showLoading(state) {
            state.visible = true;
        },
        hideLoading(state) {
            state.visible = false;
        },
    },
    actions: {
        showLoading({ commit }) {
            commit('showLoading');
        },
        hideLoading({ commit }) {
            commit('hideLoading');
        },
    },
    getters: {
        loadingVisible: (state) => state.visible,
    },
};

