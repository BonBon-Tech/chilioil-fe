<template>
  <layout-header></layout-header>
  <div class="page-wrapper pos-pg-wrapper ms-0">
    <div class="content pos-design p-0">
      <div class="btn-row d-sm-flex align-items-center">
        <a
          href="javascript:void(0);"
          class="btn btn-secondary mb-xs-3"
          data-bs-toggle="modal"
          data-bs-target="#orders"
          @click="loadOrders"
          ><span class="me-1 d-flex align-items-center"
            ><vue-feather type="shopping-cart" class="feather-16"></vue-feather></span
          >View Orders</a
        >
<!--        <a-->
<!--          href="javascript:void(0);"-->
<!--          class="btn btn-primary"-->
<!--          data-bs-toggle="modal"-->
<!--          data-bs-target="#recents"-->
<!--          ><span class="me-1 d-flex align-items-center"-->
<!--            ><vue-feather type="refresh-ccw" class="feather-16"></vue-feather></span-->
<!--          >Transaction</a-->
<!--        >-->
      </div>

      <div class="row align-items-start pos-wrapper">
        <div class="col-md-12 col-lg-8">
          <!-- Search and Reset Controls - Better positioned -->
          <div class="card table-list-card border-0 mb-3">
            <div class="card-body">
              <div class="table-top">
                <div class="search-set">
                  <div class="search-input">
                    <input
                      type="text"
                      placeholder="Search Products"
                      class="form-control"
                      v-model="searchProductName"
                      @keyup.enter="searchProducts"
                    />
                    <a
                      href="javascript:void(0);"
                      class="btn btn-searchset"
                      @click="searchProducts"
                    >
                      <vue-feather type="search" class="feather-search"></vue-feather>
                    </a>
                  </div>
                </div>
                <div class="search-path">
                  <a
                    href="javascript:void(0);"
                    class="btn btn-primary"
                    @click="resetProductFilter"
                  >
                    <span class="me-1 d-flex align-items-center">
                      <vue-feather type="rotate-cw" class="feather-16"></vue-feather>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="pos-categories tabs_wrapper">
            <h5>Categories</h5>
            <p>Select From Below Categories</p>
            <ul class="tabs owl-carousel pos-category">
              <Carousel
                :wrap-around="false"
                :settings="settings"
                :breakpoints="breakpoints"
              >
                <Slide v-for="item in categories" :key="item.id">
                  <li
                    :id="item.slug"
                    :class="{ active: selectedCategoryId === item.id }"
                    @click="selectCategory(item.id)"
                    style="cursor:pointer"
                  >
                    <a href="javascript:void(0);">
                      <img
                        v-if="item.logo_url"
                        :src="item.logo_url"
                        alt="Categories"
                        style="height:48px;width:48px;object-fit:contain;"
                      />
                      <span v-else class="d-inline-block bg-light border rounded" style="height:48px;width:48px;"></span>
                    </a>
                    <h6>
                      <a href="javascript:void(0);">{{ item.name }}</a>
                    </h6>
<!--                    <span>{{ item.slug }}</span>-->
                  </li>
                </Slide>
<!--                <template #addons>-->
<!--                  <Navigation />-->
<!--                </template>-->
              </Carousel>
            </ul>
            <div class="pos-products">
              <div class="d-flex align-items-center justify-content-between">
                <h5 class="mb-3">Products</h5>
              </div>
              <div class="tabs_container">
                <div class="tab_content active" data-tab="all">
                  <div class="row">
                    <div
                      v-for="product in products"
                      :key="product.id"
                      class="col-sm-4 col-md-4 col-lg-4 col-xl-4 pe-2"
                    >
                      <div class="product-info default-cover card" @click="addToCart(product)" style="cursor:pointer; position:relative;">
                        <a href="javascript:void(0);" class="img-bg">
                          <img
                            v-if="product.image_url"
                            :src="product.image_url"
                            alt="Products"
                            style="width:100%;height:120px;object-fit:contain;display:block;"
                          />
                        </a>
                        <!-- Quantity badge -->
                        <span
                          v-if="getCartQty(product.id) > 0"
                          class="badge bg-primary"
                          style="position:absolute;top:8px;right:8px;z-index:2;"
                        >
                          {{ getCartQty(product.id) }}
                        </span>
                        <h7 class="product-name">
                          <a href="javascript:void(0);">{{ product.name }}</a>
                        </h7>
                        <div class="d-flex align-items-center justify-content-between price">
                          <p>{{ formatIDR(product.price) }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-4 ps-0">
          <aside class="product-order-list">
<!--            <div class="head d-flex align-items-center justify-content-between w-100">-->
<!--              <div class="">-->
<!--                <h5>Order List</h5>-->
<!--                <span>Transaction ID : #65565</span>-->
<!--              </div>-->
<!--              <div class="">-->
<!--                <a-->
<!--                  class="confirm-text"-->
<!--                  @click="showConfirmation"-->
<!--                  href="javascript:void(0);"-->
<!--                  ><vue-feather-->
<!--                    type="trash-2"-->
<!--                    class="feather-16 text-danger"-->
<!--                  ></vue-feather-->
<!--                ></a>-->
<!--                <a href="javascript:void(0);" class="text-default"-->
<!--                  ><vue-feather type="more-vertical" class="feather-16"></vue-feather-->
<!--                ></a>-->
<!--              </div>-->
<!--            </div>-->
            <div class="customer-info block-section">
              <h6>Customer Information</h6>
              <div class="input-block d-flex align-items-center">
                <div class="flex-grow-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Customer Name"
                    v-model="customerName"
                  />
                </div>
<!--                <a-->
<!--                  href="javascript:void(0);"-->
<!--                  class="btn btn-primary btn-icon"-->
<!--                  data-bs-toggle="modal"-->
<!--                  data-bs-target="#create"-->
<!--                  ><vue-feather type="user-plus" class="feather-16"></vue-feather-->
<!--                ></a>-->
              </div>
            </div>

            <div class="product-added block-section">
              <div class="head-text d-flex align-items-center justify-content-between">
                <h6 class="d-flex align-items-center mb-0">
                  Product Added<span class="count">{{ cart.length }}</span>
                </h6>
                <a
                  href="javascript:void(0);"
                  class="d-flex align-items-center text-danger"
                  @click="clearCart"
                ><span class="me-1"
                  ><vue-feather type="x" class="feather-16"></vue-feather></span
                >Clear all</a>
              </div>
              <div class="product-wrap">
                <div
                  v-for="item in cart"
                  :key="item.id"
                  class="product-list-container"
                >
                  <div class="product-list d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center product-info">
                      <a href="javascript:void(0);" class="img-bg">
                        <img
                          :src="item.image_url"
                          alt="Products"
                          style="width:48px;height:48px;object-fit:contain;"
                        />
                      </a>
                      <div class="info">
                        <span>{{ item.sku || item.code || item.id }}</span>
                        <h6><a href="javascript:void(0);">{{ item.name }}</a></h6>
                        <div v-if="item.note" style="font-size:11px;color:#666;font-style:italic;margin:2px 0;">
                          Note: {{ item.note }}
                        </div>
                        <p>{{ formatIDR(item.price) }}</p>
                      </div>
                    </div>
                    <div class="qty-item text-center">
                      <a
                        href="javascript:void(0);"
                        class="dec d-flex justify-content-center align-items-center"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="minus"
                        @click="decrementQty(item)"
                      ><vue-feather type="minus-circle" class="feather-14"></vue-feather></a>
                      <input
                        type="text"
                        class="form-control text-center"
                        name="qty"
                        :value="item.qty"
                        readonly
                      />
                      <a
                        href="javascript:void(0);"
                        class="inc d-flex justify-content-center align-items-center"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="plus"
                        @click="incrementQty(item)"
                      ><vue-feather type="plus-circle" class="feather-14"></vue-feather></a>
                    </div>
                    <div class="d-flex align-items-center action">
                      <a
                        class="btn-icon note-icon me-2"
                        href="javascript:void(0);"
                        @click="toggleNoteInput(item)"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add Note"
                      >
                        <vue-feather type="edit-3" class="feather-14"></vue-feather>
                      </a>
                      <a
                        class="btn-icon delete-icon confirm-text"
                        href="javascript:void(0);"
                        @click="removeFromCart(item)"
                      >
                        <vue-feather type="trash-2" class="feather-14"></vue-feather>
                      </a>
                    </div>
                  </div>
                  <!-- Note input - appears when note button is clicked -->
                  <div v-if="item.showNoteInput" class="mt-2" style="width:100%;">
                    <div class="input-group input-group-sm">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Add your note here..."
                        v-model="item.note"
                        @keyup.enter="saveNote(item)"
                        @blur="saveNote(item)"
                        :ref="`noteInput_${item.id}`"
                      />
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                        @click="saveNote(item)"
                      >
                        <vue-feather type="check" class="feather-12"></vue-feather>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="block-section">
              <div class="order-total">
                <table class="table table-responsive table-borderless">
                  <tr>
                    <td>Sub Total</td>
                    <td class="text-end">{{ formatIDR(subTotal) }}</td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td class="text-end">{{ formatIDR(subTotal) }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="text-end">{{ formatIDR(total) }}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div class="block-section payment-method">
              <h6>Payment Method</h6>
              <div class="row d-flex align-items-center justify-content-center methods">
                <div
                  v-for="method in paymentMethods"
                  :key="method.value"
                  class="col-md-6 col-lg-4 item"
                >
                  <div
                    class="default-cover position-relative"
                    :class="{ 'border-primary': selectedPaymentMethod === method.value }"
                    style="cursor:pointer;"
                    @click="selectPaymentMethod(method.value)"
                  >
                    <a href="javascript:void(0);">
                      <img :src="method.icon" :alt="method.label" />
                      <span>{{ method.label }}</span>
                    </a>
                    <span
                      v-if="selectedPaymentMethod === method.value"
                      class="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-success"
                      style="z-index:2;"
                    >
                      <vue-feather type="check" class="feather-12"></vue-feather>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-grid btn-block">
              <a class="btn btn-secondary" href="javascript:void(0);">
                Grand Total : {{ formatIDR(total) }}
              </a>
            </div>
            <div class="btn-row d-sm-flex align-items-center justify-content-between">
              <a
                href="javascript:void(0);"
                class="btn btn-success btn-icon flex-fill"
                @click="handlePayment('PAID')"
                :disabled="cart.length === 0 || paymentLoading"
                ><span class="me-1 d-flex align-items-center"
                  ><vue-feather
                    type="credit-card"
                    class="feather-16 me-1"
                  ></vue-feather></span
                >Payment</a
              >

              <a
                href="javascript:void(0);"
                class="btn btn-primary btn-icon flex-fill"
                @click="handlePayment('PENDING')"
                :disabled="cart.length === 0 || paymentLoading"
                ><span class="me-1 d-flex align-items-center"
                  ><vue-feather
                    type="pause"
                    class="feather-16 me-1"
                  ></vue-feather></span
                >Pending</a
              >
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
  <!-- Hidden button to trigger payment-completed modal -->
  <button
    ref="openPaymentCompletedBtn"
    type="button"
    style="display:none"
    data-bs-toggle="modal"
    data-bs-target="#payment-completed"
  ></button>
  <pos-modal @next-order="resetOrder" ref="posModal"></pos-modal>

  <!-- Note Modal -->
  <div class="modal fade" id="note-modal" tabindex="-1" aria-labelledby="note-modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Note</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Product: {{ selectedItem?.name }}</label>
          </div>
          <div class="mb-3">
            <label class="form-label">Note</label>
            <textarea
              class="form-control"
              rows="3"
              v-model="noteText"
              placeholder="Add your note here..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" @click="saveNote">Save Note</button>
        </div>
      </div>
    </div>
  </div>
  <!-- /Note Modal -->
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      Walk: ["Walk in Customer", "John", "Smith", "Ana", "Elza"],
      Airpod: [
        "Search Products",
        "IPhone 14 64GB",
        "MacBook Pro",
        "Rolex Tribute V3",
        "Red Nike Angelo",
        "Airpod 2",
        "Oldest",
      ],
      GST: ["GST 5%", "GST 10%", "GST 15%", "GST 20%", "GST 25%", "GST 30%"],
      Shipping: ["15", "20", "25", "30"],
      Discount: ["10%", "10%", "15%", "20%", "25%", "30%"],
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
        loop: true,
      },
      breakpoints: {
        575: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 4,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
      selectedCategoryId: null,
      cart: [],
      paymentMethods: [
        {
          value: "CASH",
          label: "Cash",
          icon: require("@/assets/img/icons/cash-pay.svg"),
        },
        {
          value: "QRIS",
          label: "Qris",
          icon: require("@/assets/img/icons/qr-scan.svg"),
        },
      ],
      selectedPaymentMethod: "",
      searchProductName: "",
      customerName: "",
      selectedItem: null,
      noteText: "",
    }
  },
  computed: {
    ...mapGetters("category", ["categories"]),
    ...mapGetters("product", ["products"]),
    ...mapGetters("transaction", ["transactionLoading"]),
    subTotal() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },
    total() {
      return this.subTotal;
    },
    paymentLoading() {
      return this.transactionLoading;
    }
  },
  components: {
    Carousel,
    Slide,
    // Navigation,
  },
  methods: {
    ...mapActions("category", ["fetchCategories"]),
    ...mapActions("product", ["fetchProducts"]),
    ...mapActions("transaction", ["createTransaction"]),

    // Add formatIDR function to format prices
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
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      this.fetchProducts({
        product_category_id: categoryId,
        per_page: 9999 // Load all products for the selected category
      });
    },
    addToCart(product) {
      const idx = this.cart.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        // Already in cart, increment qty
        if (this.cart[idx].qty < (product.stock || 99999)) {
          this.cart[idx].qty += 1;
        }
      } else {
        this.cart.push({
          ...product,
          qty: 1,
          note: "", // Add note field
          showNoteInput: false, // Add field to control note input visibility
        });
      }
    },
    toggleNoteInput(item) {
      const idx = this.cart.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        this.cart[idx].showNoteInput = !this.cart[idx].showNoteInput;
        // Focus on the input after it becomes visible
        if (this.cart[idx].showNoteInput) {
          this.$nextTick(() => {
            const input = this.$refs[`noteInput_${item.id}`];
            if (input && input[0]) {
              input[0].focus();
            }
          });
        }
      }
    },
    saveNote(item) {
      const idx = this.cart.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        // Hide the note input after saving
        this.cart[idx].showNoteInput = false;
      }
    },
    incrementQty(item) {
      const idx = this.cart.findIndex(i => i.id === item.id);
      if ((idx !== -1) && this.cart[idx].qty < (item.stock || 99999)) {
        this.cart[idx].qty += 1;
      }
    },
    decrementQty(item) {
      const idx = this.cart.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        if (this.cart[idx].qty > 1) {
          this.cart[idx].qty -= 1;
        } else {
          this.cart.splice(idx, 1);
        }
      }
    },
    removeFromCart(item) {
      const idx = this.cart.findIndex(i => i.id === item.id);
      if (idx !== -1) {
        this.cart.splice(idx, 1);
      }
    },
    clearCart() {
      this.cart = [];
    },
    selectPaymentMethod(method) {
      this.selectedPaymentMethod = method;
    },
    searchProducts() {
      const params = {
        per_page: 9999 // Load all matching products
      };

      if (this.searchProductName && this.searchProductName.trim() !== "") {
        params.name = this.searchProductName.trim();
      }
      if (this.selectedCategoryId) {
        params.product_category_id = this.selectedCategoryId;
      }
      this.fetchProducts(params);
    },
    resetOrder() {
      this.cart = [];
      this.selectedPaymentMethod = this.paymentMethods[0]?.value || null;
      this.searchProductName = "";
      this.customerName = "";
      // Optionally reset other fields if needed
    },
    resetProductFilter() {
      this.selectedCategoryId = null;
      this.searchProductName = "";
      this.fetchProducts({ per_page: 9999 }); // Load all products when resetting filter
    },
    async handlePayment(status) {
      if (this.cart.length === 0) return;
      const payload = {
        date: new Date().toISOString().slice(0, 19).replace("T", " "),
        type: "OFFLINE",
        payment_type: this.selectedPaymentMethod,
        status: status,
        customer_name: this.customerName || "Walk-in Customer",
        items: this.cart.map(item => ({
          product_id: item.id,
          qty: item.qty,
          price: item.price,
          note: item.note || null, // Send note field for each transaction item
        })),
      };
      const result = await this.createTransaction(payload);
      if (result && result.success) {
        this.resetOrder();
        // Trigger the hidden button to open the modal
        this.$nextTick(() => {
          if (this.$refs.openPaymentCompletedBtn) {
            this.$refs.openPaymentCompletedBtn.click();
          }
        });
      }
    },
    getCartQty(productId) {
      const item = this.cart.find(i => i.id === productId);
      return item ? item.qty : 0;
    },
    loadOrders() {
      // Ensure the orders are refreshed when the modal is opened
      if (this.$refs.posModal) {
        this.$refs.posModal.fetchOrders('PENDING');
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts({ per_page: 9999 }); // Load all products on initial mount

    // Initialize payment method
    if (this.paymentMethods.length > 0) {
      this.selectedPaymentMethod = this.paymentMethods[0].value;
    }
  },
};
</script>
