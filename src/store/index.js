import { createStore } from 'vuex';
import auth from './auth';
import category from './category';
import loading from './loading';
import alert from './alert';
import product from './product';
import storeModule from './store';
import expenseCategory from './expenses-category';
import expense from './expense';
import designation from './designation'; // <-- add this line
import employee from './employee';
import transaction from './transaction';

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
        designation, // <-- add this line
        employee,
        transaction, // <-- add this line
    },
});

export default store;

// product module is already imported and registered
