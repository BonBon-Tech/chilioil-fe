import { requestWithAlert } from '../utils/api';
import { uploadLogo } from '../utils/uploadLogo';
import router from '@/router';

export default {
    namespaced: true,
    state: {
        products: [],
        product: null,
        pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
            links: [],
        },
        loading: false,
        error: null,
    },
    mutations: {
        setProducts(state, { products, pagination }) {
            state.products = products;
            state.pagination = pagination;
        },
        setProduct(state, product) {
            state.product = product;
        },
        clearProduct(state) {
            state.product = null;
        },
        setLoading(state, loading) {
            state.loading = loading;
        },
        setError(state, error) {
            state.error = error;
        },
        clearError(state) {
            state.error = null;
        },
    },
    actions: {
        async fetchProducts({ commit, dispatch }, { page = 1, per_page = 10, product_category_id, name } = {}) {
            commit('setLoading', true);
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                // Build query string with optional params
                let query = `/api/v1/products?page=${page}&per_page=${per_page}`;
                if (product_category_id) query += `&product_category_id=${encodeURIComponent(product_category_id)}`;
                if (name) query += `&name=${encodeURIComponent(name)}`;
                const res = await requestWithAlert(
                    'get',
                    query,
                    {},
                    {},
                    { error: true }
                );
                const data = res.data.data;
                commit('setProducts', {
                    products: data.data,
                    pagination: {
                        current_page: data.current_page,
                        last_page: data.last_page,
                        per_page: data.per_page,
                        total: data.total,
                        links: data.links,
                        next_page_url: data.next_page_url,
                        prev_page_url: data.prev_page_url,
                    },
                });
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch products');
            } finally {
                commit('setLoading', false);
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async fetchProductDetail({ commit, dispatch }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                const res = await requestWithAlert(
                    'get',
                    `/api/v1/products/${id}`,
                    {},
                    {},
                    { error: true }
                );
                commit('setProduct', res.data.data);
                return { success: true };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to fetch product detail');
                return { success: false };
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async createProduct({ dispatch, commit }, payload) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                let data = { ...payload, status: !!payload.status };

                // If image is a File, upload it first and set image_path
                if (data.image instanceof File) {
                    const imagePath = await uploadLogo(data.image, 'product');
                    data.image_path = imagePath;
                    delete data.image;
                }

                const res = await requestWithAlert(
                    'post',
                    '/api/v1/products',
                    data,
                    {},
                    { success: true, successMessage: 'Product created successfully', error: true }
                );
                await dispatch('fetchProducts');
                if (res && res.status === 200) {
                    router.push('/inventory/product-list');
                }
                return { success: true };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to create product');
                return { success: false };
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async updateProduct({ dispatch, commit }, { id, payload }) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                let data = { ...payload, status: !!payload.status };

                // If image is a File, upload it first and set image_path
                if (data.image instanceof File) {
                    const imagePath = await uploadLogo(data.image, 'product');
                    data.image_path = imagePath;
                    delete data.image;
                }

                const res = await requestWithAlert(
                    'put',
                    `/api/v1/products/${id}`,
                    data,
                    {},
                    { success: true, successMessage: 'Product updated successfully', error: true }
                );
                await dispatch('fetchProducts');
                if (res && res.status === 200) {
                    router.push('/inventory/product-list');
                }
                return { success: true };
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to update product');
                return { success: false };
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        async deleteProduct({ dispatch, commit }, id) {
            commit('clearError');
            dispatch('loading/showLoading', null, { root: true });
            try {
                await requestWithAlert(
                    'delete',
                    `/api/v1/products/${id}`,
                    {},
                    {},
                    { success: true, successMessage: 'Product deleted successfully', error: true }
                );
                await dispatch('fetchProducts');
            } catch (err) {
                commit('setError', err.response?.data?.message || err.message || 'Failed to delete product');
            } finally {
                dispatch('loading/hideLoading', null, { root: true });
            }
        },
        clearProduct({ commit }) {
            commit('clearProduct');
        },
    },
    getters: {
        products: (state) => state.products,
        product: (state) => state.product,
        productError: (state) => state.error,
        productLoading: (state) => state.loading,
        pagination: (state) => state.pagination,
    },
};
