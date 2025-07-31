<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="page-title">
          <h4>Product Details</h4>
          <h6>Full details of a product</h6>
        </div>
        <ul class="table-top-head">
          <li>
            <div class="page-btn">
              <router-link to="/inventory/product-list" class="btn btn-secondary"
                ><vue-feather type="arrow-left" class="me-2"></vue-feather>Back to
                Product</router-link
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- /add -->
      <div class="row" v-if="product">
        <div class="col-lg-8 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="bar-code-view">
                <img src="@/assets/img/barcode/barcode1.png" alt="barcode" />
                <a class="printimg">
                  <img src="@/assets/img/icons/printer.svg" alt="print" />
                </a>
              </div>
              <div class="productdetails">
                <ul class="product-bar">
                  <li>
                    <h4>Product</h4>
                    <h6>{{ product.name }}</h6>
                  </li>
                  <li>
                    <h4>Category</h4>
                    <h6>{{ product.product_category?.name || 'None' }}</h6>
                  </li>
                  <li>
                    <h4>Store</h4>
                    <h6>{{ product.store?.name || 'None' }}</h6>
                  </li>
                  <li>
                    <h4>SKU</h4>
                    <h6>{{ product.code }}</h6>
                  </li>
                  <li>
                    <h4>Selling Type</h4>
                    <h6>{{ product.selling_type }}</h6>
                  </li>
                  <li>
                    <h4>Price</h4>
                    <h6>Rp. {{ product.price }}</h6>
                  </li>
                  <li>
                    <h4>Created Date</h4>
                    <h6>{{ formatDate(product.created_at) }}</h6>
                  </li>
                  <li>
                    <h4>Updated Date</h4>
                    <h6>{{ formatDate(product.updated_at) }}</h6>
                  </li>
                  <li>
                    <h4>Status</h4>
                    <h6>
                      <span
                        :class="{
                          'badge badge-linesuccess': product.status === true,
                          'badge badge-linedanger': product.status === false
                        }"
                      >
                        {{ product.status === true ? 'Active' : 'Inactive' }}
                      </span>
                    </h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-sm-12">
          <div class="card">
            <div class="card-body">
              <div class="slider-product-details">
                <div class="product-slide">
                  <div class="slider-product" v-if="product.image_url">
                    <img :src="product.image_url" alt="product" />
                    <h4>{{ product.name }}.jpg</h4>
                  </div>
                  <div class="slider-product" v-else>
                    <img src="@/assets/img/products/product69.jpg" alt="no image" />
                    <h4>No Image Available</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-12">
          <div class="card">
            <div class="card-body text-center">
              <h4>Product not found</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- /add -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      productId: null,
    };
  },
  computed: {
    ...mapGetters("product", ["product"]),
  },
  methods: {
    ...mapActions("product", ["fetchProductDetail", "clearProduct"]),
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    async loadProductData() {
      if (!this.productId) {
        this.$router.push("/inventory/product-list");
        return;
      }

      const result = await this.fetchProductDetail(this.productId);
      if (!result.success) {
        this.$router.push("/inventory/product-list");
      }
    },
  },
  async mounted() {
    this.productId = this.$route.params.id;
    if (this.productId) {
      await this.loadProductData();
    } else {
      this.$router.push("/inventory/product-list");
    }
  },
  beforeUnmount() {
    this.clearProduct();
  },
};
</script>
