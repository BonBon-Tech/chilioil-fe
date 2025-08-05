<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Edit Product</h4>
            <h6>Update product information</h6>
          </div>
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
      <!-- /edit -->
      <form @submit.prevent="submitForm">
        <div class="card">
          <div class="card-body add-product pb-0">
            <div class="accordion-card-one accordion" id="accordionExample">
              <div class="accordion-item">
                <div class="accordion-header" id="headingOne">
                  <div
                    class="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-controls="collapseOne"
                  >
                    <div class="addproduct-icon">
                      <h5>
                        <vue-feather type="info" class="add-info"></vue-feather
                        ><span>Product Information</span>
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
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Store</label>
                          <custom-select-form
                            :options="storeOptions"
                            id="thomasstore"
                            placeholder="Choose"
                            v-model="form.store_id"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Product Name</label>
                          <input type="text" class="form-control" v-model="form.name" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <label class="form-label">Code</label>
                          <input type="text" class="form-control" v-model="form.code" />
                        </div>
                      </div>
                      <div class="col-lg-4 col-sm-6 col-12">
                        <div class="mb-3 add-product">
                          <div class="add-newplus">
                            <label class="form-label">Category</label>
                          </div>
                          <custom-select-form
                            :options="categoryOptions"
                            id="choosenew"
                            placeholder="Choose"
                            v-model="form.product_category_id"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="add-product-new">
                      <div class="row">
                        <div class="col-lg-4 col-sm-6 col-12">
                          <div class="mb-3 add-product">
                            <label class="form-label">Selling Type</label>
                            <custom-select-form
                              :options="sellingTypeOptions"
                              id="sellingtype"
                              placeholder="Choose"
                              v-model="form.selling_type"
                            />
                          </div>
                        </div>

                        <div class="col-lg-4 col-sm-6 col-12">
                          <div class="mb-3 add-product">
                            <label class="form-label">Status</label>
                            <select class="form-control" v-model="form.status">
                              <option :value="true">Active</option>
                              <option :value="false">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-card-one accordion" id="accordionExample2">
              <div class="accordion-item">
                <div class="accordion-header" id="headingTwo">
                  <div
                    class="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-controls="collapseTwo"
                  >
                    <div class="text-editor add-list">
                      <div class="addproduct-icon list icon">
                        <h5>
                          <vue-feather type="life-buoy" class="add-info"></vue-feather
                          ><span>Pricing & Stocks</span>
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
                </div>
                <div
                  id="collapseTwo"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample2"
                >
                  <div class="accordion-body">
                    <div class="input-blocks add-products">
                      <label class="d-block">Product Type</label>
                      <div class="single-pill-product">
                        <ul class="nav nav-pills" id="pills-tab1" role="tablist">
                          <li class="nav-item" role="presentation">
                            <span
                              class="custom_radio me-4 mb-0 active"
                              id="pills-home-tab"
                              data-bs-toggle="pill"
                              data-bs-target="#pills-home"
                              role="tab"
                              aria-controls="pills-home"
                              aria-selected="true"
                            >
                              <input type="radio" class="form-control" name="payment" />
                              <span class="checkmark"></span> Single Product</span
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="tab-content" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div class="row">
                          <div class="col-lg-4 col-sm-6 col-12">
                            <div class="input-blocks add-product">
                              <label>Price</label>
                              <input type="number" class="form-control" v-model="form.price" />
                            </div>
                          </div>
                        </div>
                        <div class="accordion-card-one accordion" id="accordionExample3">
                          <div class="accordion-item">
                            <div class="accordion-header" id="headingThree">
                              <div
                                class="accordion-button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-controls="collapseThree"
                              >
                                <div class="addproduct-icon list">
                                  <h5>
                                    <vue-feather
                                      type="image"
                                      class="add-info"
                                    ></vue-feather
                                    ><span>Images</span>
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
                              id="collapseThree"
                              class="accordion-collapse collapse show"
                              aria-labelledby="headingThree"
                              data-bs-parent="#accordionExample3"
                            >
                              <div class="accordion-body">
                                <div class="text-editor add-list add">
                                  <div class="col-lg-12">
                                    <div class="add-choosen">
                                      <div class="input-blocks">
                                        <div class="image-upload">
                                          <input type="file" @change="onImageChange" />
                                          <div class="image-uploads">
                                            <i
                                              data-feather="plus-circle"
                                              class="plus-down-add me-0"
                                            ></i>
                                            <h4>Add Images</h4>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="phone-img" v-if="imagePreview">
                                        <img
                                          :src="imagePreview"
                                          alt="image"
                                        />
                                        <a href="javascript:void(0);" @click="removeImage"
                                          ><vue-feather
                                            type="x"
                                            class="x-square-add remove-product"
                                          ></vue-feather
                                        ></a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
            <button type="submit" class="btn btn-submit">Update Product</button>
          </div>
        </div>
      </form>
      <!-- /edit -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CustomSelectForm from "@/components/select/custom-select-form.vue";
import Swal from "sweetalert2";

export default {
  components: {
    CustomSelectForm,
  },
  data() {
    return {
      productId: null,
      form: {
        name: "",
        code: "",
        store_id: "",
        product_category_id: "",
        selling_type: "",
        price: 0,
        image: null,
        image_path: "",
        status: true, // default to active
      },
      imagePreview: null,
    };
  },
  computed: {
    ...mapGetters("store", ["stores"]),
    ...mapGetters("category", ["categories"]),
    ...mapGetters("product", ["product"]),
    storeOptions() {
      return this.stores.map(s => ({
        name: s.name,
        value: s.id,
      }));
    },
    categoryOptions() {
      return this.categories.map(c => ({
        name: c.name,
        value: c.id,
      }));
    },
    sellingTypeOptions() {
      return [
        { name: "Ingredient", value: "Ingredient" },
        { name: "Sale", value: "Sale" },
        { name: "Employee", value: "Employee" },
      ];
    },
  },
  methods: {
    ...mapActions("product", ["fetchProductDetail", "updateProduct", "clearProduct"]),
    ...mapActions("store", ["fetchStores"]),
    ...mapActions("category", ["fetchCategories"]),
    onImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.form.image = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    removeImage() {
      this.form.image = null;
      this.imagePreview = null;
    },
    populateForm() {
      if (this.product) {
        this.form = {
          name: this.product.name || "",
          code: this.product.code || "",
          store_id: this.product.store_id || "",
          product_category_id: this.product.product_category_id || "",
          selling_type: this.product.selling_type || "",
          price: this.product.price || 0,
          image: null,
          image_path: this.product.image_path || "",
          status: typeof this.product.status === "boolean" ? this.product.status : !!this.product.status,
        };
        // Set image preview to existing image
        if (this.product.image_url) {
          this.imagePreview = this.product.image_url;
        }
      }
    },
    async submitForm() {
      const payload = {
        name: this.form.name || "",
        code: this.form.code || "",
        store_id: this.form.store_id !== undefined && this.form.store_id !== null ? this.form.store_id : "",
        product_category_id: this.form.product_category_id !== undefined && this.form.product_category_id !== null ? this.form.product_category_id : "",
        selling_type: this.form.selling_type || "",
        price: this.form.price || 0,
        image: this.form.image || null,
        image_path: this.form.image_path || "",
        status: this.form.status,
      };

      await this.updateProduct({ id: this.productId, payload });
    },
    cancel() {
      this.$router.push("/inventory/product-list");
    },
    toggleCollapse() {
      const collapseHeader = this.$refs.collapseHeader;
      if (collapseHeader) {
        collapseHeader.classList.toggle("active");
        document.body.classList.toggle("header-collapse");
      }
    },
    async loadProductData() {
      if (!this.productId) {
        console.error('Product ID is missing');
        this.$router.push("/inventory/product-list");
        return;
      }

      const result = await this.fetchProductDetail(this.productId);
      if (result.success) {
        this.populateForm();
      } else {
        // Redirect to product list if product not found
        this.$router.push("/inventory/product-list");
      }
    },
  },
  async mounted() {
    this.productId = this.$route.params.id;
    console.log('Product ID from route:', this.productId); // Debug log

    await this.fetchStores();
    await this.fetchCategories();

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
