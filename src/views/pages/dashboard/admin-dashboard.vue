<template>
  <div>
    <layout-header></layout-header>
    <layout-sidebar></layout-sidebar>
    <div class="page-wrapper" style="text-align: center !important;">
      <div class="content">
        <div class="row">
          <div class="col-xl-6 col-sm-6 col-12 d-flex">
            <div class="dash-widget w-100">
              <div class="dash-widgetimg">
                <span><img src="@/assets/img/icons/dash1.svg" alt="img" /></span>
              </div>
              <div class="dash-widgetcontent">
                <h5>
                  Rp
                  <vue3-autocounter
                    class="counters"
                    ref="counter"
                    :startAmount="0"
                    :delay="1"
                    :endAmount="summary.expense_total"
                    :duration="1"
                    :autoinit="true"
                  />
                </h5>
                <h6>Total Expense</h6>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-sm-6 col-12 d-flex">
            <div class="dash-widget dash1 w-100">
              <div class="dash-widgetimg">
                <span><img src="@/assets/img/icons/dash2.svg" alt="img" /></span>
              </div>
              <div class="dash-widgetcontent">
                <h5>
                  Rp
                  <vue3-autocounter
                    class="counters"
                    ref="counter"
                    :startAmount="0"
                    :delay="1"
                    :endAmount="summary.transaction_total"
                    :duration="1"
                    :autoinit="true"
                  />
                </h5>
                <h6>Total Transaction</h6>
              </div>
            </div>
          </div>
          <template v-for="store in store_sales" :key="store.store_id">
            <div class="col-xl-4 col-sm-4 col-12 d-flex">
              <div class="dash-widget dash1 w-100">
                <div class="dash-widgetimg">
                  <span><img src="@/assets/img/icons/dash2.svg" alt="img" /></span>
                </div>
                <div class="dash-widgetcontent">
                  <h5>
                    Rp
                    <vue3-autocounter
                        class="counters"
                        ref="counter"
                        :startAmount="0"
                        :delay="1"
                        :endAmount="store.total_sales"
                        :duration="1"
                        :autoinit="true"
                    />
                  </h5>
                  <h6>Total Sales {{ store.store_name }}</h6>
                </div>
              </div>
            </div>
          </template>
<!--          <div class="col-xl-3 col-sm-6 col-12 d-flex">-->
<!--            <div class="dash-widget dash2 w-100">-->
<!--              <div class="dash-widgetimg">-->
<!--                <span><img src="@/assets/img/icons/dash3.svg" alt="img" /></span>-->
<!--              </div>-->
<!--              <div class="dash-widgetcontent">-->
<!--                <h5>-->
<!--                  $-->
<!--                  <vue3-autocounter-->
<!--                    class="counters"-->
<!--                    ref="counter"-->
<!--                    :startAmount="185656.5"-->
<!--                    :delay="3"-->
<!--                    :endAmount="385656.5"-->
<!--                    :duration="5"-->
<!--                    :autoinit="true"-->
<!--                  />-->
<!--                </h5>-->
<!--                <h6>Total Sale Amount</h6>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-xl-3 col-sm-6 col-12 d-flex">-->
<!--            <div class="dash-widget dash3 w-100">-->
<!--              <div class="dash-widgetimg">-->
<!--                <span><img src="@/assets/img/icons/dash4.svg" alt="img" /></span>-->
<!--              </div>-->
<!--              <div class="dash-widgetcontent">-->
<!--                <h5>-->
<!--                  $-->
<!--                  <vue3-autocounter-->
<!--                    class="counters"-->
<!--                    ref="counter"-->
<!--                    :startAmount="10000.0"-->
<!--                    :delay="3"-->
<!--                    :endAmount="40000.0"-->
<!--                    :duration="5"-->
<!--                    :autoinit="true"-->
<!--                  />-->
<!--                </h5>-->
<!--                <h6>Total Expense Amount</h6>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="col-xl-6 col-sm-6 col-12 d-flex">
            <div class="dash-count">
              <div class="dash-counts">
                <h4>{{ summary.user_count }}</h4>
                <h5>Employees</h5>
              </div>
              <div class="dash-imgs">
                <vue-feather type="user"></vue-feather>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-sm-6 col-12 d-flex">
            <div class="dash-count das1">
              <div class="dash-counts">
                <h4>{{ summary.product_count }}</h4>
                <h5>Products</h5>
              </div>
              <div class="dash-imgs">
                <vue-feather type="gift"></vue-feather>
              </div>
            </div>
          </div>
<!--          <div class="col-xl-3 col-sm-6 col-12 d-flex">-->
<!--            <div class="dash-count das2">-->
<!--              <div class="dash-counts">-->
<!--                <h4>150</h4>-->
<!--                <h5>Purchase Invoice</h5>-->
<!--              </div>-->
<!--              <div class="dash-imgs">-->
<!--                <img-->
<!--                  src="@/assets/img/icons/file-text-icon-01.svg"-->
<!--                  class="img-fluid"-->
<!--                  alt="icon"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="col-xl-3 col-sm-6 col-12 d-flex">-->
<!--            <div class="dash-count das3">-->
<!--              <div class="dash-counts">-->
<!--                <h4>170</h4>-->
<!--                <h5>Sales Invoice</h5>-->
<!--              </div>-->
<!--              <div class="dash-imgs">-->
<!--                <vue-feather type="file"></vue-feather>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <!-- Button trigger modal -->

        <div class="row">
          <div class="col-xl-12 col-sm-12 col-12 d-flex">
            <div class="card flex-fill">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">Purchase & Sales</h5>
                <div class="graph-sets">
                  <ul class="mb-0">
                    <li class="d-flex">
                      ChiliOil <div style="color: #28C76F !important; font-weight: 900;">X</div>
                    </li>
                    <li class="d-flex">
                      Sate Nagihin<div style="color: #EA5455 !important; font-weight: 900;">X</div>
                    </li>
                    <li class="d-flex">
                      Minuman<div style="color: #F5D010FF !important; font-weight: 900;">X</div>
                    </li>
                  </ul>
                  <div class="dropdown dropdown-wraper">
                    <button
                      class="btn btn-light btn-sm dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      2024
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item">2024</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item">2023</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" class="dropdown-item">2022</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div id="sales_charts"></div>
                <apexchart
                  type="bar"
                  height="300"
                  :options="basicAreaChart.sline"
                  :series="basicAreaChart.series"
                ></apexchart>
              </div>
            </div>
          </div>
<!--          <div class="col-xl-5 col-sm-12 col-12 d-flex">-->
<!--            <div class="card flex-fill default-cover mb-4">-->
<!--              <div class="card-header d-flex justify-content-between align-items-center">-->
<!--                <h4 class="card-title mb-0">Recent Products</h4>-->
<!--                <div class="view-all-link">-->
<!--                  <a-->
<!--                    href="javascript:void(0);"-->
<!--                    class="view-all d-flex align-items-center"-->
<!--                  >-->
<!--                    View All<span class="ps-2 d-flex align-items-center"-->
<!--                      ><vue-feather type="arrow-right" class="feather-16"></vue-feather-->
<!--                    ></span>-->
<!--                  </a>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="card-body">-->
<!--                <div class="table-responsive dataview">-->
<!--                  <table class="table dashboard-recent-products">-->
<!--                    <thead>-->
<!--                      <tr>-->
<!--                        <th>#</th>-->
<!--                        <th>Products</th>-->
<!--                        <th>Price</th>-->
<!--                      </tr>-->
<!--                    </thead>-->
<!--                    <tbody>-->
<!--                      <tr v-for="item in AdminProducts" :key="item.id">-->
<!--                        <td>{{ item.id }}</td>-->
<!--                        <td class="productimgname">-->
<!--                          <router-link to="/inventory/product-list" class="product-img">-->
<!--                            <img-->
<!--                              :src="require(`@/assets/img/products/${item.Image}`)"-->
<!--                              alt="product"-->
<!--                            />-->
<!--                          </router-link>-->
<!--                          <router-link to="/inventory/product-list">{{-->
<!--                            item.Title-->
<!--                          }}</router-link>-->
<!--                        </td>-->
<!--                        <td>{{ item.Price }}</td>-->
<!--                      </tr>-->
<!--                    </tbody>-->
<!--                  </table>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="col-xl-4 col-sm-12 col-12 d-flex">
            <div class="card flex-fill default-cover">
              <div class="card-header">
                <h4 class="card-title">Product Sales ChiliOil</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive dataview">
                  <table class="table dashboard-expired-products">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in product_sales_chilioil" :key="item.product_id">
                      <td>
                        <div class="productimgname">
                          <a href="javascript:void(0);" class="product-img stock-img">
                            <img
                                :src="item.product?.image_url"
                                alt="product"
                            />
                          </a>
                          <a href="javascript:void(0);">{{ item.product?.name }} </a>
                        </div>
                      </td>
                      <td>{{ item.total_qty }}</td>
                      <td>{{ formatIDR(item.total_sales) }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-12 col-12 d-flex">
            <div class="card flex-fill default-cover">
              <div class="card-header">
                <h4 class="card-title">Product Sales Sate</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive dataview">
                  <table class="table dashboard-expired-products">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in product_sales_sate" :key="item.product_id">
                      <td>
                        <div class="productimgname">
                          <a href="javascript:void(0);" class="product-img stock-img">
                            <img
                                :src="item.product?.image_url"
                                alt="product"
                            />
                          </a>
                          <a href="javascript:void(0);">{{ item.product?.name }} </a>
                        </div>
                      </td>
                      <td>{{ item.total_qty }}</td>
                      <td>{{ formatIDR(item.total_sales) }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-12 col-12 d-flex">
            <div class="card flex-fill default-cover">
              <div class="card-header">
                <h4 class="card-title">Product Sales Minuman</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive dataview">
                  <table class="table dashboard-expired-products">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in product_sales_minuman" :key="item.product_id">
                      <td>
                        <div class="productimgname">
                          <a href="javascript:void(0);" class="product-img stock-img">
                            <img
                                :src="item.product?.image_url"
                                alt="product"
                            />
                          </a>
                          <a href="javascript:void(0);">{{ item.product?.name }} </a>
                        </div>
                      </td>
                      <td>{{ item.total_qty }}</td>
                      <td>{{ formatIDR(item.total_sales) }}</td>
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
</template>

<script>
import { basicAreaChart } from "./data";
import AdminProducts from "@/assets/json/admin-products.json";
import AdminExpired from "@/assets/json/admin-expired.json";
import Swal from "sweetalert2";
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      basicAreaChart: basicAreaChart,
      AdminProducts: AdminProducts,
      AdminExpired: AdminExpired,
    };
  },
  computed: {
    ...mapState('dashboard', ['summary', 'product_sales_sate', 'product_sales_chilioil', 'product_sales_minuman', 'store_sales'])
  },
  methods: {
    ...mapActions('dashboard', ['fetchSummary', 'fetchProductSales', 'fetchStoreSales']),
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

    showConfirmation() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        confirmButtonClass: "btn btn-primary",
        cancelButtonClass: "btn btn-danger ml-1",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your file has been deleted.",
            confirmButtonClass: "btn btn-success",
          });
        }
      });
    },
  },
  mounted() {
    this.fetchSummary();
    this.fetchProductSales({ store_id: 1 });
    this.fetchProductSales({ store_id: 2 });
    this.fetchProductSales({ store_id: 3 });
    this.fetchStoreSales()
  }
};
</script>
