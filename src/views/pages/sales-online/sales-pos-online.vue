<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>New Sales</h4>
            <h6>Create new sales</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <div class="page-btn">
              <router-link to="/sales-online/sales-list" class="btn btn-secondary"
              ><vue-feather type="arrow-left" class="me-2"></vue-feather>Back to
                Sales</router-link
              >
            </div>
          </li>
          <li>
            <a
                ref="collapseHeader"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Collapse"
                @click="toggleCollapse"
            >
              <i data-feather="chevron-up" class="feather-chevron-up"></i>
            </a>
          </li>
        </ul>
      </div>
      <!-- /add -->
      <form @submit.prevent="submitForm">
        <div class="card">
          <div class="card-body add-product pb-0">
            <div class="accordion-card-one accordion mt-3" id="accordionSalesInformation">
              <div class="accordion-item">
                <div class="accordion-header" id="headingSalesInformation">
                  <div
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSalesInformation"
                      aria-controls="collapseSalesInformation"
                  >
                    <div class="addproduct-icon">
                      <h5>
                        <vue-feather type="info" class="add-info"></vue-feather
                        ><span>Online Sales Information</span>
                      </h5>
                      <a href="javascript:void(0);"
                      ><vue-feather
                          type="chevron-down"
                          class="chevron-down-add"
                      ></vue-feather
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                    id="collapseSalesInformation"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingSalesInformation"
                    data-bs-parent="#accordionSalesInformation"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Sales Source</label>
                          <custom-select-form
                              :options="salesTypeOptions"
                              placeholder="Choose"
                              v-model="form.store_id"
                          />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Date</label>
                          <input type="date" class="form-control" v-model="form.date" />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">PIC Name</label>
                          <input type="text" class="form-control" v-model="form.customer_name" />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Payment Type</label>
                          <input type="text" class="form-control" v-model="form.payment_type" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Status</label>
                          <input type="text" class="form-control" v-model="form.status" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Online Sale Revenue</label>
                          <input type="number" class="form-control" v-model="form.online_transaction_revenue" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-card-one accordion mt-3" id="accordionSalesSummary">
              <div class="accordion-item">
                <div class="accordion-header" id="headingSalesSummary">
                  <div
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSalesSummary"
                      aria-controls="collapseSalesSummary"
                  >
                    <div class="addproduct-icon">
                      <h5>
                        <vue-feather type="info" class="add-info"></vue-feather
                        ><span>Online Sales Summary</span>
                      </h5>
                      <a href="javascript:void(0);"
                      ><vue-feather
                          type="chevron-down"
                          class="chevron-down-add"
                      ></vue-feather
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                    id="collapseSalesSummary"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingSalesSummary"
                    data-bs-parent="#accordionSalesSummary"
                >
                  <div class="accordion-body">
                    <template v-if="stores.length === 0">
                      <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12">
                          <p class="text-center">No Store Selected</p>
                        </div>
                      </div>
                    </template>
                    <template v-else v-for="store in stores" :key="store.id">
                      <div class="row">
                        <div class="col-lg-3 col-sm-3 col-3">
                          <div class="mb-3 add-product">
                            <label class="form-label">{{store.name}} Total</label>
                            <input type="text" class="form-control" :value="formatIDR(calculateItemByStore(store.id))" disabled />
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-3 col-3">
                          <div class="mb-3 add-product">
                            <label class="form-label">{{store.name}} % Total Transaction</label>
                            <input type="text" class="form-control" :value="percentage(store.id)" disabled />
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-3 col-3">
                          <div class="mb-3 add-product">
                            <label class="form-label">{{store.name}} Online Tax</label>
                            <input type="text" class="form-control" :value="formatIDR(calculateTax(store.id))" disabled />
                          </div>
                        </div>
                        <div class="col-lg-3 col-sm-3 col-3">
                          <div class="mb-3 add-product">
                            <label class="form-label">{{store.name}} Actual Revenue</label>
                            <input type="text" class="form-control" :value="formatIDR(calculateRevenue(store.id))" disabled />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-card-one accordion mt-3" id="accordionAddProduct">
              <div class="accordion-item">
                <div class="accordion-header" id="headingProduct">
                  <div
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseAddProduct"
                      aria-controls="collapseAddProduct"
                  >
                    <div class="addproduct-icon">
                      <h5>
                        <vue-feather type="plus" class="add-info"></vue-feather
                        ><span>Add Product</span>
                      </h5>
                      <a href="javascript:void(0);"
                      ><vue-feather
                          type="chevron-down"
                          class="chevron-down-add"
                      ></vue-feather
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                    id="collapseAddProduct"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingProduct"
                    data-bs-parent="#accordionAddProduct"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-12 col-sm-12 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Search Product</label>
                          <input @blur="fetchProductsByName" type="text" class="form-control" placeholder="Search Product" v-model="params.name" required />
                        </div>
                      </div>

                      <div class="col-lg-12 col-sm-12 col-12">
                        <table class="table table-hover table-center mb-0">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(product, index) in products" :key="index">
                              <td>{{ product.name }} <span v-if="findProductOnItems(product.id)" class="label label-success">Added</span></td>
                              <td>
                                <button
                                    class="btn btn-primary btn-sm"
                                    type="button"
                                    @click="addItem(product)"
                                >
                                  <vue-feather type="plus" class="feather-14"></vue-feather>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="products.length === 0">
                              <td colspan="2" class="text-center">Please Search Product.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div class="accordion-card-one accordion mt-3" id="accordionListProduct">
              <div class="accordion-item">
                <div class="accordion-header" id="headingListProduct">
                  <div
                      class="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseListProduct"
                      aria-controls="collapseListProduct"
                  >
                    <div class="addproduct-icon">
                      <h5>
                        <vue-feather type="list" class="add-info"></vue-feather
                        ><span>List Product</span>
                      </h5>
                      <a href="javascript:void(0);"
                      ><vue-feather
                          type="chevron-down"
                          class="chevron-down-add"
                      ></vue-feather
                      ></a>
                    </div>
                  </div>
                </div>
                <div
                    id="collapseListProduct"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingListProduct"
                    data-bs-parent="#accordionListProduct"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-12 col-sm-12 col-12">
                        <table class="table table-hover table-center mb-0">
                          <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(item, index) in items" :key="index">
                            <td>{{ item.name }}</td>
                            <td>{{ formatIDR(item.price) }}</td>
                            <td>
                              <input style="width: 100px !important;" type="number" class="form-control" v-model="item.qty" />
                            </td>
                            <td>{{ formatIDR(item.price * item.qty) }}</td>
                            <td>
                              <button
                                  class="btn btn-danger btn-sm"
                                  type="button"
                                  @click="deleteItem(item)"
                              >
                                <vue-feather type="trash" class="feather-14"></vue-feather>
                              </button>
                            </td>
                          </tr>
                          <tr v-if="items.length === 0">
                            <td colspan="5" class="text-center">Please Add Product.</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="btn-addproduct mb-4">
            <button type="button" class="btn btn-cancel me-2" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-submit">Save Sales</button>
          </div>
        </div>
      </form>
      <!-- /add -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CustomSelectForm from "@/components/select/custom-select-form.vue";

export default {
  components: {
    CustomSelectForm,
  },
  data() {
    return {
      form: {
        date: "",
        customer_name: "",
        type: "",
        payment_type: "BANK_TRANSFER",
        status: "PENDING",
        items: [],
        online_transaction_revenue: 0
      },
      items: [],
      params: {
        page: 1,
        per_page: 9999,
        name: '',
      },
      stores: []
    };
  },
  computed: {
    ...mapGetters('product', ['products']),
    salesTypeOptions() {
      return [
        {name: "Shopee Food", value: "SHOPEEFOOD"},
        {name: "Go Food", value: "GOFOOD"},
        {name: "Grab Food", value: "GRABFOOD"},
      ];
    },
    totalAmount() {
      return this.items.reduce((total, item) => {
        return total + (item.price * item.qty);
      }, 0);
    }
  },
  methods: {
    ...mapActions('product', ['fetchProducts']),
    ...mapActions('salesOnline', ['saveTransaction']),

    fetchProductsByName() {
      if (this.params.name.length >= 3) {
        this.fetchProducts(this.params);
      }
    },
    formatIDR(value) {
      if (value === undefined || value === null) return 'Rp 0,00';

      // Convert to number if it's a string
      const num = typeof value === 'string' ? parseFloat(value) : value;

      // Format the number to Indonesian Rupiah format
      return 'Rp ' + num.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    async submitForm() {
      // Validate form
      if (!this.form.store_id) {
        this.$store.dispatch('alert/triggerAlert', {
          type: 'danger',
          message: 'Please select a sales source',
        });
        return;
      }

      if (this.items.length === 0) {
        this.$store.dispatch('alert/triggerAlert', {
          type: 'danger',
          message: 'Please add at least one product',
        });
        return;
      }

      if (!this.form.date) {
        this.$store.dispatch('alert/triggerAlert', {
          type: 'danger',
          message: 'Please select a date',
        });
        return;
      }

      // Format the payload
      const payload = {
        date: this.form.date,
        customer_name: this.form.customer_name,
        type: this.form.store_id, // Use the selected store ID as type
        payment_type: this.form.payment_type,
        status: this.form.status,
        online_transaction_revenue: this.form.online_transaction_revenue,
        items: this.items.map((item) => {
          return {
            product_id: item.product_id,
            qty: item.qty,
            price: item.price,
            note: ""
          }
        })
      };

      // Call the store action to save the transaction
      const result = await this.saveTransaction(payload);

      if (result.success) {
        // Redirect to sales list on success
        this.$router.push('/sales-online/sales-list');
      }
    },
    deleteItem(product) {
      this.items = this.items.filter(item => item.product_id !== product.product_id);
    },
    addItem(product) {
      let isExist = false;

      this.items.forEach(item => {
        if (item.product_id === product.id) {
          isExist = true;
        }
      });

      if (!isExist) {
        this.items.push({
          product_id: product.id,
          name: product.name,
          price: product.price,
          qty: 0,
          store_id: product.store.id,
        });

        let isStoreExist = false;

        this.stores.forEach(store => {
          if (store.id === product.store.id) {
            isStoreExist = true;
          }
        });

        if (!isStoreExist) {
          this.stores.push({
            id: product.store.id,
            name: product.store.name
          });
        }
      }
    },
    cancel() {
      this.$router.push("/sales-online/sales-list");
    },
    toggleCollapse() {
      const collapseHeader = this.$refs.collapseHeader;

      if (collapseHeader) {
        collapseHeader.classList.toggle("active");
        document.body.classList.toggle("header-collapse");
      }
    },
    calculateItemByStore(storeId) {
      return this.items
        .filter(item => item.store_id === storeId)
        .reduce((total, item) => total + (item.price * item.qty), 0);
    },
    percentage(storeId) {
      const storeTotal = this.calculateItemByStore(storeId);
      if (storeTotal === 0) return 0;
      return Number(((storeTotal / this.totalAmount) * 100).toFixed(2));
    },
    calculateRevenue(storeId) {
      const storePercentage = this.percentage(storeId);
      if (storePercentage === 0) return 0;
      return storePercentage / 100 * this.form.online_transaction_revenue;
    },
    calculateTax(storeId) {
      const storePercentage = this.percentage(storeId);
      if (storePercentage === 0) return 0;

      const storeTotal = this.calculateItemByStore(storeId)
      const actualRevenue = this.calculateRevenue(storeId)

      return storeTotal - actualRevenue;
    },
    findProductOnItems(productId) {
      return this.items.find(item => item.product_id === productId);

    }
  },
  mounted() {
    // Initialize form date with current date
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    this.form.date = `${yyyy}-${mm}-${dd}`;
  },
};
</script>
