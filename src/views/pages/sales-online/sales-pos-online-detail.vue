<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Transaction Details</h4>
            <h6>View transaction #{{ transactionId }}</h6>
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
      <!-- Loading state -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2">Loading transaction details...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="alert alert-danger my-4">
        {{ error }}
        <div class="mt-3">
          <button class="btn btn-sm btn-primary" @click="fetchTransactionData">Try Again</button>
        </div>
      </div>

      <!-- Transaction details -->
      <form v-else @submit.prevent="submitForm">
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
                          <label class="form-label">Transaction Code</label>
                          <input type="text" class="form-control" v-model="form.code" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Sales Source</label>
                          <input type="text" class="form-control" v-model="form.type" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Date</label>
                          <input type="date" class="form-control" v-model="form.date" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">PIC Name</label>
                          <input type="text" class="form-control" v-model="form.customer_name" disabled />
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
                          <input type="text" class="form-control" :value="formatIDR(form.online_transaction_revenue)" disabled />
                        </div>
                      </div>

                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Total</label>
                          <input type="text" class="form-control" :value="formatIDR(form.total)" disabled />
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
                          <p class="text-center">No Store Data</p>
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
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr v-for="(item, index) in items" :key="index">
                            <td>
                              <img :src="item.image_path" alt="Product" class="img-fluid" style="max-width: 50px; max-height: 50px;" />
                            </td>
                            <td>{{ item.name }}</td>
                            <td>{{ formatIDR(item.price) }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ formatIDR(item.total_price) }}</td>
                          </tr>
                          <tr v-if="items.length === 0">
                            <td colspan="5" class="text-center">No products found.</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add status update buttons after transaction information -->
            <div class="card" v-if="form.status === 'PENDING'">
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <h5 class="mb-3">Update Transaction Status</h5>
                    <div class="d-flex gap-2">
                      <button type="button" class="btn btn-success" @click="updateStatus('PAID')">
                        <vue-feather type="check-circle" class="me-2"></vue-feather>Mark as PAID
                      </button>
                      <button type="button" class="btn btn-danger" @click="updateStatus('CANCELED')">
                        <vue-feather type="x-circle" class="me-2"></vue-feather>Mark as CANCELED
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="btn-addproduct mb-4">
            <button type="button" class="btn btn-cancel" @click="cancel">Back to List</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  components: {
  },
  data() {
    return {
      transactionId: null,
      loading: true,
      error: null,
      form: {
        code: "",
        date: "",
        customer_name: "",
        type: "",
        payment_type: "",
        status: "",
        total: 0,
        sub_total: 0,
        total_item: 0,
        online_transaction_revenue: 0
      },
      items: [],
      stores: []
    };
  },
  computed: {
    totalAmount() {
      return this.items.reduce((total, item) => {
        return total + parseFloat(item.total_price);
      }, 0);
    }
  },
  methods: {
    ...mapActions('salesOnline', ['getTransaction', 'updateTransactionStatus']),

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

    async fetchTransactionData() {
      this.loading = true;
      this.error = null;

      try {
        const result = await this.getTransaction(this.transactionId);

        if (result.success) {
          const transaction = result.data;

          // Format date from ISO to YYYY-MM-DD for input
          const dateObj = new Date(transaction.date);
          const formattedDate = dateObj.toISOString().split('T')[0];

          // Set form data
          this.form = {
            code: transaction.code,
            date: formattedDate,
            customer_name: transaction.customer_name,
            type: transaction.type,
            payment_type: transaction.payment_type,
            status: transaction.status,
            total: transaction.total,
            sub_total: transaction.sub_total,
            total_item: transaction.total_item,
            online_transaction_revenue: transaction.online_transaction_revenue
          };

          // Set items
          this.items = transaction.transaction_items.map(item => ({
            ...item,
            store_id: item.store.id
          }));

          // Extract unique stores from items
          const storeMap = {};
          transaction.transaction_items.forEach(item => {
            if (item.store && !storeMap[item.store.id]) {
              storeMap[item.store.id] = {
                id: item.store.id,
                name: item.store.name
              };
            }
          });

          this.stores = Object.values(storeMap);
        } else {
          this.error = "Failed to load transaction data";
        }
      } catch (err) {
        this.error = err.message || "An error occurred while fetching transaction data";
      } finally {
        this.loading = false;
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
        .reduce((total, item) => total + parseFloat(item.total_price), 0);
    },

    percentage(storeId) {
      const storeTotal = this.calculateItemByStore(storeId);
      if (storeTotal === 0 || this.totalAmount === 0) return 0;
      return Number(((storeTotal / this.totalAmount) * 100).toFixed(2));
    },

    calculateRevenue(storeId) {
      const storePercentage = this.percentage(storeId);
      if (storePercentage === 0 || this.totalAmount === 0) return 0;
      return storePercentage / 100 * parseFloat(this.form.online_transaction_revenue);
    },

    calculateTax(storeId) {
      const storePercentage = this.percentage(storeId);
      if (storePercentage === 0) return 0;

      const storeTotal = this.calculateItemByStore(storeId);
      const actualRevenue = this.calculateRevenue(storeId);

      return storeTotal - actualRevenue;
    },

    async updateStatus(newStatus) {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: 'Update Status',
        text: `Are you sure you want to mark this transaction as ${newStatus}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: newStatus === 'PAID' ? '#3085d6' : '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: `Yes, mark as ${newStatus}!`
      });

      if (!result.isConfirmed) {
        return;
      }

      this.loading = true;

      try {
        const apiResult = await this.updateTransactionStatus({
          id: this.transactionId,
          status: newStatus
        });

        if (apiResult.success) {
          // Refetch the entire transaction data to ensure everything is in sync
          await this.fetchTransactionData();

          // Show success message
          Swal.fire({
            title: 'Status Updated!',
            text: `Transaction has been marked as ${newStatus}`,
            icon: 'success',
            confirmButtonColor: '#3085d6'
          });
        }
      } catch (err) {
        console.error('Error updating status:', err);

        // Show error message
        Swal.fire({
          title: 'Error',
          text: 'Failed to update transaction status',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    this.transactionId = this.$route.params.id;
    this.fetchTransactionData();
  }
};
</script>

<style scoped>
.badge {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
