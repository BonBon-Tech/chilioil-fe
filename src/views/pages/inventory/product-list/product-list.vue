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
                <input type="text" placeholder="Search" class="dark-input" />
                <a href="javascript:void(0);" class="btn btn-searchset"
                  ><i data-feather="search" class="feather-search"></i
                ></a>
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
              <custom-select :options="Sortby" id="sortby" placeholder="Sort by Date" />
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
            <!-- Pagination -->
            <div class="pagination-container mt-3" v-if="pagination && pagination.last_page > 1">
              <ul class="pagination">
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === 1 }"
                  @click="changePage(pagination.current_page - 1)"
                >
                  <a class="page-link" href="javascript:void(0);">&laquo;</a>
                </li>
                <li
                  v-for="link in pagination.links"
                  :key="link.label"
                  class="page-item"
                  :class="{ active: link.active, disabled: !link.url }"
                  @click="link.url && changePage(getPageFromUrl(link.url))"
                >
                  <a class="page-link" href="javascript:void(0);" v-html="link.label"></a>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: pagination.current_page === pagination.last_page }"
                  @click="changePage(pagination.current_page + 1)"
                >
                  <a class="page-link" href="javascript:void(0);">&raquo;</a>
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
    };
  },
  computed: {
    ...mapGetters("product", ["products", "pagination", "productError", "productLoading"]),
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
      if (page > 0 && page <= this.pagination.last_page && page !== this.pagination.current_page) {
        this.fetchProducts(page);
      }
    },
    getPageFromUrl(url) {
      const match = url && url.match(/page=(\d+)/);
      return match ? parseInt(match[1], 10) : 1;
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
