export default {
    namespaced: true,
    state: {
        type: null, // 'success' or 'danger'
        message: '',
        visible: false,
    },
    mutations: {
        showAlert(state, { type, message }) {
            state.type = type;
            state.message = message;
            state.visible = true;
        },
        hideAlert(state) {
            state.visible = false;
            state.message = '';
            state.type = null;
        },
    },
    actions: {
        triggerAlert({ commit }, payload) {
            commit('showAlert', payload);
            setTimeout(() => {
                commit('hideAlert');
            }, 4000); // auto-hide after 4s
        },
        closeAlert({ commit }) {
            commit('hideAlert');
        },
    },
    getters: {
        alertType: (state) => state.type,
        alertMessage: (state) => state.message,
        alertVisible: (state) => state.visible,
    },
};