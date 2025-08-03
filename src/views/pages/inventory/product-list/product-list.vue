<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <product-header></product-header>
      <div class="card table-list-card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-input">
                <input
                  type="text"
                  placeholder="Search product name"
                  class="dark-input"
                  v-model="searchQuery"
                  @keyup.enter="searchProducts"
                />
                <a
                  href="javascript:void(0);"
                  class="btn btn-searchset"
                  @click="searchProducts"
                >
                  <i data-feather="search" class="feather-search"></i>
                </a>
              </div>
            </div>
            <div class="search-path">
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
            <div class="form-sort">
              <vue-feather type="sliders" class="info-img"></vue-feather>
              <custom-select
                :options="Sortby"
                id="sortby"
                placeholder="Sort by Date"
              />
            </div>
          </div>
          <!-- /Filter -->
          <div
            class="card mb-0"
            :style="{ display: filter ? 'block' : 'none' }"
            id="filter_inputs"
          >
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-lg-12 col-sm-12">
                  <div class="row">
                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <vue-feather type="box" class="info-img"></vue-feather>
                        <custom-select
                          :options="ChooseFilter"
                          id="choosefilter"
                          placeholder="Choose Product"
                        />
                      </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <vue-feather type="stop-circle" class="info-img"></vue-feather>
                        <custom-select
                          :options="CategroyFilter"
                          id="categroyfilter"
                          placeholder="Choose Categroy"
                        />
                      </div>
                    </div>

                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <vue-feather type="git-merge" class="info-img"></vue-feather>
                        <custom-select
                          :options="CategroySubFilter"
                          id="categroysubfilter"
                          placeholder="Choose Sub Categroy"
                        />
                      </div>
                    </div>

                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <vue-feather type="stop-circle" class="info-img"></vue-feather>
                        <custom-select
                          :options="BrandFilter"
                          id="brandfilter"
                          placeholder="All Brand"
                        />
                      </div>
                    </div>

                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <i class="fas fa-money-bill info-img"></i>
                        <custom-select
                          :options="PriceFilter"
                          id="Pricefilter"
                          placeholder="Price"
                        />
                      </div>
                    </div>
                    <div class="col-lg-2 col-sm-6 col-12">
                      <div class="input-blocks">
                        <a class="btn btn-filters ms-auto">
                          <i data-feather="search" class="feather-search"></i>
                          Search
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Filter -->
          <div class="table-responsive product-list">
            <a-table
              class="table datanew table-hover table-center mb-0"
              :columns="columns"
              :data-source="products"
              :row-selection="{}"
              :pagination="false"
              :loading="productLoading"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Product'">
                  <div class="productimgname">
                    <a href="javascript:void(0);" class="product-img stock-img">
                      <img
                        :src="record.image_url"
                        alt="product"
                      />
                    </a>
                    <a href="javascript:void(0);">{{ record.name }} </a>
                  </div>
                </template>
                <template v-else-if="column.key === 'SKU'">
                  {{ record.code }}
                </template>
                <template v-else-if="column.key === 'Category'">
                  {{ record.product_category?.name || '-' }}
                </template>
                <template v-else-if="column.key === 'Price'">
                  Rp. {{ record.price }}
                </template>
                <template v-else-if="column.key === 'Store'">
                  <td class="userimgname">
                    <a href="javascript:void(0);">{{ record.store?.name || '-' }}</a>
                  </td>
                </template>
                <template v-else-if="column.key === 'Status'">
                  <span
                    :class="{
                      'badge badge-linesuccess': record.status === 1,
                      'badge badge-linedanger': record.status === 0
                    }"
                  >
                    {{ record.status === 1 ? 'Active' : 'Inactive' }}
                  </span>
                </template>
                <template v-else-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <router-link
                        class="me-2 edit-icon p-2"
                        :to="`/inventory/product-details/${record.id}`"
                      >
                        <i data-feather="eye" class="feather-eye"></i>
                      </router-link>
                      <router-link
                        class="me-2 p-2"
                        :to="`/inventory/edit-product/${record.id}`"
                      >
                        <i data-feather="edit" class="feather-edit"></i>
                      </router-link>
                      <a
                        class="confirm-text p-2"
                        @click="showConfirmation(record.id, record.name)"
                        href="javascript:void(0);"
                      >
                        <vue-feather type="trash-2" class="trash-2"></vue-feather>
                      </a>
                    </div>
                  </td>
                </template>
              </template>
            </a-table>

            <!-- Pagination with Items Per Page -->
            <div
              class="d-flex justify-content-between align-items-center flex-wrap mt-3"
              v-if="pagination && pagination.last_page > 0"
            >
              <div class="d-flex align-items-center mb-2">
                <span class="me-2">Show</span>
                <select
                  class="form-select form-select-sm"
                  v-model="itemsPerPage"
                  @change="changeItemsPerPage"
                  style="width: auto;"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span class="ms-2">entries</span>
              </div>

              <div class="pagination-info mb-2">
                <span
                  >Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of
                  {{ pagination.total }} entries</span
                >
              </div>

              <ul class="pagination mb-2">
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === 1 }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0);"
                    @click="changePage(1)"
                    >&laquo;</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === 1 }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0);"
                    @click="changePage(pagination.current_page - 1)"
                    >&lt;</a
                  >
                </li>

                <li
                  v-for="page in visiblePageNumbers"
                  :key="page"
                  class="page-item"
                  :class="{ active: page === pagination.current_page }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0);"
                    @click="changePage(page)"
                    >{{ page }}</a
                  >
                </li>

                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === pagination.last_page }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0);"
                    @click="changePage(pagination.current_page + 1)"
                    >&gt;</a
                  >
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === pagination.last_page }"
                >
                  <a
                    class="page-link"
                    href="javascript:void(0);"
                    @click="changePage(pagination.last_page)"
                    >&raquo;</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- /product list -->
    </div>
  </div>
  <product-list-modal></product-list-modal>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
const columns = [
  {
    title: "Product",
    dataIndex: "Product",
    key: "Product",
  },
  {
    title: "SKU",
    dataIndex: "SKU",
    key: "SKU",
  },
  {
    title: "Category",
    dataIndex: "Category",
    key: "Category",
  },
  {
    title: "Price",
    dataIndex: "Price",
    key: "Price",
  },
  {
    title: "Store",
    dataIndex: "Store",
    key: "Store",
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
  },
  {
    title: "Action",
    key: "action",
  },
];
export default {
  data() {
    return {
      filter: false,
      Sortby: ["Sort by Date", "14 09 23", "11 09 23"],
      ChooseFilter: ["Choose Product", "Lenovo 3rd Generation", "Nike Jordan"],
      CategroyFilter: ["Laptop", "Shoe"],
      CategroySubFilter: ["Choose Sub Categroy", "Computers", "Fruits"],
      BrandFilter: ["Lenovo", "Nike"],
      PriceFilter: ["Price", "$12500.00", "$12500.00"],
      columns,
      itemsPerPage: 10, // Default items per page
      searchQuery: "", // For product name search
      selectedCategoryId: null, // For category filter
    };
  },
  computed: {
    ...mapGetters("product", [
      "products",
      "pagination",
      "productError",
      "productLoading",
    ]),

    // Compute visible page numbers for pagination
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
    },
  },
  methods: {
    ...mapActions("product", ["fetchProducts", "deleteProduct"]),

    showConfirmation(productId, productName) {
      Swal.fire({
        title: "Are you sure?",
        text: `You want to delete "${productName}"? This action cannot be undone!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-danger ml-1",
        buttonsStyling: false,
      }).then(async (result) => {
        if (result.value) {
          await this.deleteProduct(productId);
        }
      });
    },

    changePage(page) {
      if (
        page > 0 &&
        page <= this.pagination.last_page &&
        page !== this.pagination.current_page
      ) {
        this.fetchProducts({
          page,
          per_page: this.itemsPerPage,
          product_category_id: this.selectedCategoryId,
          name: this.searchQuery || undefined,
        });
      }
    },

    changeItemsPerPage() {
      // When changing items per page, go back to page 1
      this.fetchProducts({
        page: 1,
        per_page: this.itemsPerPage,
        product_category_id: this.selectedCategoryId,
        name: this.searchQuery || undefined,
      });
    },

    searchProducts() {
      // Reset to page 1 when searching
      this.fetchProducts({
        page: 1,
        per_page: this.itemsPerPage,
        product_category_id: this.selectedCategoryId,
        name: this.searchQuery || undefined,
      });
    },

    getPageFromUrl(url) {
      const match = url && url.match(/page=(\d+)/);
      return match ? parseInt(match[1], 10) : 1;
    },
  },
  mounted() {
    // Initial fetch with default values
    this.fetchProducts({
      page: 1,
      per_page: this.itemsPerPage,
    });
  },
  watch: {
    // Update itemsPerPage when pagination changes
    "pagination.per_page"(newValue) {
      if (newValue && newValue !== this.itemsPerPage) {
        this.itemsPerPage = newValue;
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  margin-bottom: 0;
}
.form-select {
  min-width: 70px;
}
</style>

