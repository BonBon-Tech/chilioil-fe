<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>New Product</h4>
            <h6>Create new product</h6>
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
      <!-- /add -->
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
                      <div
                        class="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <div class="row select-color-add">
                          <div class="col-lg-6 col-sm-6 col-12">
                            <div class="input-blocks add-product">
                              <label>Variant Attribute</label>
                              <div class="row">
                                <div class="col-lg-10 col-sm-10 col-10">
                                  <custom-select
                                    :options="VariantChoose"
                                    id="varianchoose"
                                    placeholder="Choose"
                                  />
                                </div>
                                <div class="col-lg-2 col-sm-2 col-2 ps-0">
                                  <div class="add-icon tab">
                                    <a
                                      class="btn btn-filter"
                                      data-bs-toggle="modal"
                                      data-bs-target="#add-units"
                                      ><i class="feather feather-plus-circle"></i
                                    ></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="selected-hide-color" id="input-show">
                              <div class="row align-items-center">
                                <div class="col-sm-10">
                                  <div class="input-blocks">
                                    <vue3-tags-input
                                      class="input-tags form-control"
                                      type="text"
                                      data-role="tagsinput"
                                      name="inputBox"
                                      id="inputBox"
                                      :tags="tags"
                                    />
                                  </div>
                                </div>
                                <div class="col-lg-2">
                                  <div class="input-blocks">
                                    <a href="javascript:void(0);" class="remove-color"
                                      ><i class="far fa-trash-alt"></i
                                    ></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="modal-body-table variant-table" id="variant-table">
                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>Variantion</th>
                                  <th>Variant Value</th>
                                  <th>SKU</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th class="no-sort">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="color"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="red"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="1234"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="product-quantity">
                                      <span class="quantity-btn"
                                        ><i
                                          data-feather="minus-circle"
                                          class="feather-search"
                                        ></i
                                      ></span>
                                      <input
                                        type="text"
                                        class="quntity-input"
                                        value="2"
                                      />
                                      <span class="quantity-btn"
                                        >+<i
                                          data-feather="plus-circle"
                                          class="plus-circle"
                                        ></i
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="50000"
                                      />
                                    </div>
                                  </td>
                                  <td class="action-table-data">
                                    <div class="edit-delete-action">
                                      <div class="input-block add-lists">
                                        <label class="checkboxs">
                                          <input type="checkbox" checked />
                                          <span class="checkmarks"></span>
                                        </label>
                                      </div>
                                      <a
                                        class="me-2 p-2"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#add-variation"
                                      >
                                        <i data-feather="plus" class="feather-edit"></i>
                                      </a>
                                      <a
                                        class="confirm-text p-2"
                                        @click="showConfirmation"
                                        href="javascript:void(0);"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          class="feather-trash-2"
                                        ></i>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="color"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="black"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="2345"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <div class="product-quantity">
                                      <span class="quantity-btn"
                                        ><i
                                          data-feather="minus-circle"
                                          class="feather-search"
                                        ></i
                                      ></span>
                                      <input
                                        type="text"
                                        class="quntity-input"
                                        value="3"
                                      />
                                      <span class="quantity-btn"
                                        >+<i
                                          data-feather="plus-circle"
                                          class="plus-circle"
                                        ></i
                                      ></span>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="add-product">
                                      <input
                                        type="text"
                                        class="form-control"
                                        value="50000"
                                      />
                                    </div>
                                  </td>
                                  <td class="action-table-data">
                                    <div class="edit-delete-action">
                                      <div class="input-block add-lists">
                                        <label class="checkboxs">
                                          <input type="checkbox" checked />
                                          <span class="checkmarks"></span>
                                        </label>
                                      </div>
                                      <a
                                        class="me-2 p-2"
                                        href="javascript:void(0);"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-units"
                                      >
                                        <i data-feather="plus" class="feather-edit"></i>
                                      </a>
                                      <a
                                        class="confirm-text p-2"
                                        @click="showConfirmation"
                                        href="javascript:void(0);"
                                      >
                                        <i
                                          data-feather="trash-2"
                                          class="feather-trash-2"
                                        ></i>
                                      </a>
                                    </div>
                                  </td>
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
          </div>
        </div>
        <div class="col-lg-12">
          <div class="btn-addproduct mb-4">
            <button type="button" class="btn btn-cancel me-2" @click="cancel">Cancel</button>
            <button type="submit" class="btn btn-submit">Save Product</button>
          </div>
        </div>
      </form>
      <!-- /add -->
    </div>
  </div>
  <add-product-modal></add-product-modal>
</template>
<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import CustomSelectForm from "@/components/select/custom-select-form.vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
import Vue3TagsInput from "vue3-tags-input";
import Swal from "sweetalert2";
export default {
  components: {
    Vue3TagsInput,
    CustomSelectForm,
  },
  data() {
    return {
      isVisible: true,
      isVisible1: true,
      Distype: ["Choose", "Percentage", "Cash"],
      VariantChoose: ["Choose", "Color", "Red", "Black"],
      ChooseTypeDis: ["Choose", "Percentage", "Cash"],
      ExclusiveType: ["Exclusive", "Sales Tax"],
      ChooseCode: ["Choose", "Code34", "Code35", "Code36"],
      // SellingType: ["Choose", "Transactional selling", "Solution selling"],
      ChooseAddNew: ["Choose", "Kg", "Pc"],
      ChooseAdd: ["Choose", "Nike", "Bolt"],
      SubSubCategory: ["Choose", "Fruits", "Computers", "Shoes"],
      SubCategory: ["Choose", "Lenovo", "Electronics"],
      ChooseNew: ["Choose", "Lenovo", "Electronics"],
      WarhouseStore: ["Choose", "Legendary", "Determined", "Sincere"],
      ThomasStore: ["Choose", "Thomas", "Rasmussen", "Fred john"],
      tags: ["red", "black"],
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
      // Product form fields
      form: {
        name: "",
        code: "",
        store_id: "",
        product_category_id: "",
        selling_type: "",
        price: 0,
        image: null,
        status: true, // default to active
      },
      imagePreview: null,
    };
  },
  computed: {
    ...mapGetters("store", ["stores"]),
    ...mapGetters("category", ["categories"]),
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
    ...mapActions("product", ["createProduct"]),
    ...mapActions("store", ["fetchStores"]),
    ...mapActions("category", ["fetchCategories"]),
    hideProduct() {
      this.isVisible = false;
    },
    hideProduct1() {
      this.isVisible1 = false;
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
    async submitForm() {
      const payload = {
        name: this.form.name || "",
        code: this.form.code || "",
        store_id: this.form.store_id !== undefined && this.form.store_id !== null ? this.form.store_id : "",
        product_category_id: this.form.product_category_id !== undefined && this.form.product_category_id !== null ? this.form.product_category_id : "",
        selling_type: this.form.selling_type || "",
        price: this.form.price || 0,
        image: this.form.image || null,
        status: this.form.status,
      };

      await this.createProduct(payload);
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
  },
  mounted() {
    this.fetchStores();
    this.fetchCategories();
  },
};
</script>
