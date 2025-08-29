<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>

  <div class="page-wrapper sales-list">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Sales Online List (GoFood, GrabFood, ShopeeFood)</h4>
            <h6>Manage Your Sales</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <!--          <li>-->
          <!--            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"-->
          <!--              ><img src="@/assets/img/icons/pdf.svg" alt="img"-->
          <!--            /></a>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"-->
          <!--              ><img src="@/assets/img/icons/excel.svg" alt="img"-->
          <!--            /></a>-->
          <!--          </li>-->
          <!--          <li>-->
          <!--            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"-->
          <!--              ><vue-feather type="printer" class="printer"></vue-feather-->
          <!--            ></a>-->
          <!--          </li>-->
          <li>
            <a
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Refresh"
                @click="refreshTransactions"
            ><vue-feather type="rotate-ccw" class="rotate-ccw"></vue-feather></a>
          </li>
          <!--          <li>-->
          <!--            <a-->
          <!--              ref="collapseHeader"-->
          <!--              data-bs-toggle="tooltip"-->
          <!--              data-bs-placement="top"-->
          <!--              title="Collapse"-->
          <!--              @click="toggleCollapse"-->
          <!--            >-->
          <!--              <i data-feather="chevron-up" class="feather-chevron-up"></i>-->
          <!--            </a>-->
          <!--          </li>-->
        </ul>
        <div class="page-btn">
          <router-link to="/sales-online/pos" class="btn btn-added"
          ><vue-feather type="plus-circle" class="me-2"></vue-feather>Add New
            Sales</router-link
          >
        </div>
        <!--        <div class="page-btn">-->
        <!--          <a-->
        <!--            href="javascript:void(0);"-->
        <!--            class="btn btn-added"-->
        <!--            @click="goToPos"-->
        <!--          ><vue-feather type="plus-circle" class="me-2"></vue-feather> Add New Sales</a>-->
        <!--        </div>-->
      </div>

      <!-- /product list -->
      <div class="card table-list-card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-input">
                <input
                    type="text"
                    placeholder="Search"
                    class="dark-input"
                    v-model="searchQuery"
                    @keyup.enter="applySearch"
                />
                <a href="javascript:void(0);" class="btn btn-searchset" @click="applySearch">
                  <i data-feather="search" class="feather-search"></i>
                </a>
              </div>
            </div>
            <div class="search-path">
              <div class="d-flex align-items-center">
                <a
                    class="btn btn-filter"
                    id="filter_search"
                    v-on:click="filter = !filter"
                    :class="{ setclose: filter }"
                >
                  <vue-feather type="filter" class="filter-icon"></vue-feather>
                  <span><img src="@/assets/img/icons/closes.svg" alt="img" /></span>
                </a>
              </div>
            </div>
            <div class="form-sort">
              <input
                  type="date"
                  class="form-control"
                  v-model="dateFilter"
                  @change="applyDateFilter"
              />
            </div>
          </div>
          <!-- /Filter -->
          <div
              class="card"
              id="filter_inputs"
              :style="{ display: filter ? 'block' : 'none' }"
          >
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <label>Transaction Code</label>
                    <input
                        type="text"
                        placeholder="Transaction Code"
                        class="form-control"
                        v-model="filterValues.code"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <label>Customer Name</label>
                    <input
                        type="text"
                        placeholder="Customer Name"
                        class="form-control"
                        v-model="filterValues.customer_name"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <label>Type</label>
                    <select class="form-select" v-model="filterValues.type">
                      <option value="">All Types</option>
                      <option value="ONLINE">Online</option>
                      <option value="OFFLINE">Offline</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <label>Payment Type</label>
                    <select class="form-select" v-model="filterValues.payment_type">
                      <option value="">All Payment Types</option>
                      <option value="CASH">Cash</option>
                      <option value="QRIS">QRIS</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <label>Status</label>
                    <select class="form-select" v-model="filterValues.status">
                      <option value="">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="CANCELED">Canceled</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-9 col-sm-12 col-12">
                  <div class="input-blocks">
                    <label>Date Range</label>
                    <div class="d-flex">
                      <input
                          type="date"
                          placeholder="Start Date"
                          class="form-control me-2"
                          v-model="filterValues.start_date"
                      />
                      <input
                          type="date"
                          placeholder="End Date"
                          class="form-control"
                          v-model="filterValues.from_date"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-12">
                  <div class="input-blocks">
                    <label>Total Range</label>
                    <div class="d-flex">
                      <input
                          type="number"
                          placeholder="Min"
                          class="form-control me-2"
                          v-model="filterValues.total_min"
                      />
                      <input
                          type="number"
                          placeholder="Max"
                          class="form-control"
                          v-model="filterValues.total_max"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-12">
                  <div class="input-blocks">
                    <label>Subtotal Range</label>
                    <div class="d-flex">
                      <input
                          type="number"
                          placeholder="Min"
                          class="form-control me-2"
                          v-model="filterValues.sub_total_min"
                      />
                      <input
                          type="number"
                          placeholder="Max"
                          class="form-control"
                          v-model="filterValues.sub_total_max"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-sm-12 col-12">
                  <div class="input-blocks">
                    <label>Items Range</label>
                    <div class="d-flex">
                      <input
                          type="number"
                          placeholder="Min"
                          class="form-control me-2"
                          v-model="filterValues.total_item_min"
                      />
                      <input
                          type="number"
                          placeholder="Max"
                          class="form-control"
                          v-model="filterValues.total_item_max"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="input-blocks d-flex">
                <button class="btn btn-filters ms-auto me-2" @click="applyFilters">
                  <i data-feather="search" class="feather-search"></i> Apply
                </button>
                <button class="btn btn-outline-danger" @click="resetFilters">
                  <i data-feather="x" class="feather-x"></i> Reset
                </button>
              </div>
            </div>
          </div>
          <!-- /Filter -->

          <!-- Loading state -->
          <div v-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading transactions...</p>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Empty state -->
          <div v-else-if="transactions.length === 0" class="text-center py-5">
            <vue-feather type="inbox" size="48" class="text-muted mb-3"></vue-feather>
            <p>No transactions found</p>
          </div>

          <!-- Data table -->
          <div v-else class="table-responsive">
            <table class="table datanew table-hover">
              <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Type</th>
                <th>Payment</th>
                <th>Sub Total</th>
                <th>Total</th>
                <th>Status</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="transaction in transactions" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td>{{ transaction.code }}</td>
                <td>{{ transaction.customer_name }}</td>
                <td>{{ formatDate(transaction.created_at) }}</td>
                <td>{{ transaction.total_item }}</td>
                <td>
                  <span :class="getTypeClass(transaction.type)">{{ transaction.type }}</span>
                </td>
                <td>{{ transaction.payment_type }}</td>
                <td>{{ formatCurrency(transaction.sub_total) }}</td>
                <td>{{ formatCurrency(transaction.total) }}</td>
                <td>
                  <span :class="getStatusClass(transaction.status)">{{ transaction.status }}</span>
                </td>
                <td class="text-center">
                  <div class="action-btns">
                    <router-link
                      :to="'/sales-online/detail/' + transaction.id"
                      class="btn btn-sm btn-info me-1"
                      title="View Details"
                    >
                      <vue-feather type="eye" class="feather-16"></vue-feather>
                    </router-link>
                    <!--
                    <a
                      v-if="transaction.status === 'PENDING'"
                      href="javascript:void(0);"
                      class="btn btn-sm btn-primary me-1"
                      @click="editTransaction(transaction.id)"
                      title="Edit"
                    >
                      <vue-feather type="edit" class="feather-16"></vue-feather>
                    </a>
                    <a
                      v-if="transaction.status === 'PENDING'"
                      href="javascript:void(0);"
                      class="btn btn-sm btn-danger"
                      @click="confirmDelete(transaction.id)"
                      title="Delete"
                    >
                      <vue-feather type="trash-2" class="feather-16"></vue-feather>
                    </a>
                    -->
                  </div>
                </td>
              </tr>
              </tbody>
            </table>

            <!-- Pagination -->
            <div v-if="pagination" class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
              <div class="d-flex align-items-center mb-2">
                <span class="me-2">Show</span>
                <select class="form-select form-select-sm" v-model="perPage" @change="onPerPageChange" style="width: auto;">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span class="ms-2">entries</span>
              </div>

              <div class="pagination-info mb-2">
                <span>Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of {{ pagination.total }} entries</span>
              </div>

              <ul class="pagination mb-2" v-if="pagination.last_page > 1">
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                  <a class="page-link" href="javascript:void(0);" @click="onPageChange(1)">&laquo;</a>
                </li>
                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                  <a class="page-link" href="javascript:void(0);" @click="onPageChange(pagination.current_page - 1)">&lt;</a>
                </li>

                <li
                    v-for="page in visiblePageNumbers"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === pagination.current_page }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="onPageChange(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                  <a class="page-link" href="javascript:void(0);" @click="onPageChange(pagination.current_page + 1)">&gt;</a>
                </li>
                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                  <a class="page-link" href="javascript:void(0);" @click="onPageChange(pagination.last_page)">&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- /product list -->
    </div>
  </div>

  <sales-list-modal></sales-list-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      filter: false,
      perPage: 10,
      searchQuery: '',
      dateFilter: '',
      filterValues: {
        code: '',
        customer_name: '',
        date: '',
        start_date: '',
        from_date: '',
        total_min: '',
        total_max: '',
        sub_total_min: '',
        sub_total_max: '',
        total_item_min: '',
        total_item_max: '',
        type: '',
        payment_type: '',
        status: ''
      }
    };
  },
  computed: {
    ...mapGetters('salesOnline', [
      'transactions',
      'pagination',
      'isLoading',
      'error',
      'filters'
    ]),

    // Calculate visible page numbers for pagination
    visiblePageNumbers() {
      if (!this.pagination) return [];

      const current = this.pagination.current_page;
      const last = this.pagination.last_page;

      // Show up to 5 page numbers
      if (last <= 5) {
        // If total pages are 5 or less, show all
        return Array.from({ length: last }, (_, i) => i + 1);
      } else {
        // Always include first, last, current, and 1-2 surrounding pages
        let pages = [1, last, current];

        // Add one page before and after current if possible
        if (current > 1) pages.push(current - 1);
        if (current < last) pages.push(current + 1);

        // Add second page if needed
        if (current > 3) pages.push(2);

        // Add second-to-last page if needed
        if (current < last - 2) pages.push(last - 1);

        // Sort the page numbers and remove duplicates
        return [...new Set(pages)].sort((a, b) => a - b);
      }
    }
  },
  watch: {
    // Watch for changes in store filters and update local form values
    filters: {
      handler(newFilters) {
        this.searchQuery = newFilters.search || '';
        this.dateFilter = newFilters.date || '';
        this.filterValues = { ...newFilters };
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('salesOnline', [
      'fetchTransactions',
      'updateFilters',
      'resetFilters',
      'changePerPage',
      'changePage',
      'getTransaction'
    ]),

    toggleCollapse() {
      const collapseHeader = this.$refs.collapseHeader;

      if (collapseHeader) {
        collapseHeader.classList.toggle("active");
        document.body.classList.toggle("header-collapse");
      }
    },

    // Navigate to POS page
    goToPos() {
      this.$router.push('/sales/pos');
    },

    // Refresh transaction list
    refreshTransactions() {
      this.fetchTransactions({ page: 1, perPage: this.perPage });
    },

    // Apply search filter
    applySearch() {
      this.updateFilters({ search: this.searchQuery });
    },

    // Apply date filter
    applyDateFilter() {
      if (this.dateFilter) {
        this.updateFilters({ date: this.dateFilter });
      } else {
        this.updateFilters({ date: '' });
      }
    },

    // Apply all filters
    applyFilters() {
      this.updateFilters(this.filterValues);
    },

    // Reset all filters
    resetAllFilters() {
      this.searchQuery = '';
      this.dateFilter = '';
      this.resetFilters();
      this.filterValues = {
        code: '',
        customer_name: '',
        date: '',
        start_date: '',
        from_date: '',
        total_min: '',
        total_max: '',
        sub_total_min: '',
        sub_total_max: '',
        total_item_min: '',
        total_item_max: '',
        type: '',
        payment_type: '',
        status: ''
      };
    },

    // Handle per page change
    onPerPageChange() {
      this.changePerPage(this.perPage);
    },

    // Handle page change
    onPageChange(page) {
      if (page > 0 && page <= this.pagination.last_page && page !== this.pagination.current_page) {
        this.changePage(page);
      }
    },

    // Confirm delete
    confirmDelete(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Implement delete functionality
          console.log('Delete transaction with ID:', id);

          // Show success message
          Swal.fire(
              'Deleted!',
              'The transaction has been deleted.',
              'success'
          );

          // Refresh the transaction list
          this.refreshTransactions();
        }
      });
    },

    // Format date for display
    formatDate(dateStr) {
      if (!dateStr) return '-';

      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    // Format currency
    formatCurrency(value) {
      if (value === undefined || value === null) return 'Rp 0';

      // Convert to number if it's a string
      const num = typeof value === 'string' ? parseFloat(value) : value;

      // Format the number to Indonesian Rupiah format
      return 'Rp ' + num.toLocaleString('id-ID');
    },

    // Get CSS class for status badge
    getStatusClass(status) {
      switch (status) {
        case 'PAID':
          return 'badge bg-success';
        case 'PENDING':
          return 'badge bg-warning';
        case 'CANCELED':
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    },

    // Get CSS class for type badge
    getTypeClass(type) {
      switch (type) {
        case 'ONLINE':
          return 'badge bg-info';
        case 'OFFLINE':
          return 'badge bg-primary';
        default:
          return 'badge bg-secondary';
      }
    }
  },
  mounted() {
    // Fetch transactions when component is mounted
    this.fetchTransactions({ perPage: this.perPage });

    // Synchronize local form state with store state
    this.searchQuery = this.filters.search || '';
    this.dateFilter = this.filters.date || '';
    this.filterValues = { ...this.filters };
  },
  beforeUnmount() {
    // Clear filters when navigating away from the page
    this.resetAllFilters();
  }
};
</script>

<style scoped>
.badge {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.action-btns {
  display: flex;
  justify-content: center;
}

.action-btns .btn {
  padding: 0.25rem 0.5rem;
}

.feather-16 {
  width: 16px;
  height: 16px;
}
</style>
