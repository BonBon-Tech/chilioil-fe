import { createStore } from 'vuex';
import auth from './auth';
import category from './category';
import loading from './loading';
import alert from './alert';
import product from './product';
import storeModule from './store';
import expenseCategory from './expenses-category';
import expense from './expense';
import designation from './designation';
import employee from './employee';
import transaction from './transaction';
import sales from './sales'; // Import the new sales module

const store = createStore({
    modules: {
        auth,
        category,
        alert,
        loading,
        product,
        store: storeModule,
        expenseCategory,
        expense,
        designation,
        employee,
        transaction,
        sales // Add the new sales module
    },
});

export default store;

// product module is already imported and registered
