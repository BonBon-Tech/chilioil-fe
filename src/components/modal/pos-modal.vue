<template>
  <!-- Payment Completed -->
  <div class="modal fade modal-default" id="payment-completed" aria-labelledby="payment-completed">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body text-center">
          <form @submit.prevent="submitForm">
            <div class="icon-head">
              <a href="javascript:;">
                <vue-feather type="check-circle" class="feather-40"></vue-feather>
              </a>
            </div>
            <h4>Payment Completed</h4>
            <p class="mb-0">Do you want to Print Receipt for the Completed Order</p>
            <div class="modal-footer d-sm-flex justify-content-between">
              <button type="button" class="btn btn-primary flex-fill"
                      data-bs-toggle="modal" data-bs-target="#print-receipt" v-if="transactionData?.status === 'PAID'">Print Receipt<i
                  class="feather-arrow-right-circle icon-me-5"></i></button>
              <button type="button" class="btn btn-secondary flex-fill" data-bs-dismiss="modal" @click="handleNextOrder">Next Order<i
                  class="feather-arrow-right-circle icon-me-5"></i></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Payment Completed -->

  <!-- Print Receipt -->
  <div class="modal fade modal-default" id="print-receipt" aria-labelledby="print-receipt">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" ref="printSection">
        <div class="d-flex justify-content-end">
          <button type="button" class="close p-0" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div
                id="printable-receipt"
                :style="{
                  width: '70mm',
                  margin: '0',
                  padding: '0',
                  background: '#fff',
                  fontFamily: 'times new roman, serif',
                  fontSize: '6px',
                  lineHeight: '1.2',
                  textAlign: 'center'
                }"
            >
              <div style="margin:0;padding:0;">
                <img
                    src="@/assets/img/logo-main.png"
                    width="80"
                    height="24"
                    alt="Receipt Logo"
                    style="display:block;margin:0 auto 2px auto;padding:0;"
                    id="receipt-logo"
                />
                <div id="company-name">
                  Jajaneun Chillioil x Sate Nagihinxx
                </div>
              </div>
              <div>
                <div id="information-name">chilioilxsatenagihin@gmail.com</div>
                <div id="information-name">085117569398</div>
              </div>
              <div id="separator">
                ----------------------------------------------------------
              </div>
              <table id="width-58">
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{{ customerName }}</td>
                </tr>
                <tr>
                  <td>Invoice</td>
                  <td>:</td>
                  <td>{{ transactionData?.code }}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>:</td>
                  <td>{{ formattedDate }}</td>
                </tr>
              </table>
              <div id="separator">
                ----------------------------------------------------------
              </div>
              <table id="width-58">
                <thead>
                <tr id="width-58">
                  <th>No</th>
                  <th colspan="3">Item</th>
                  <th>Qty</th>
                  <th colspan="2">Total</th>
                </tr>
                </thead>
                <tbody>
                <template
                      v-for="(item, index) in transactionData?.transaction_items || []"
                      :key="item.product_id"
                >
                  <tr
                      id="width-58"
                  >
                    <td id="text-center">{{ index + 1 }}</td>
                    <td colspan="3" style="padding:0;">
                      {{ item.name || item.product_name || item.product_id }}
                    </td>
                    <td id="text-center">{{ item.qty ?? item.quantity ?? 0 }}</td>
                    <td colspan="2" id="text-center">{{ formatIDR(item.price * (item.qty ?? 0)) }}</td>
                  </tr>
                  <tr v-if="item.note !== '' && item.note">
                    <td colspan="7">Note : {{ item.note }}</td>
                  </tr>
                </template>
                </tbody>
              </table>
              <div id="separator">
                ----------------------------------------------------------
              </div>
              <table class="width-58">
                <tr class="width-58">
                  <td colspan="2" style="padding:0;">Sub Total</td>
                  <td colspan="2" style="text-align:right;padding:0;">{{ formatIDR(subTotal) }}</td>
                </tr>
                <tr class="width-58">
                  <td colspan="2" style="padding:0;">Total Bill</td>
                  <td colspan="2" style="text-align:right;padding:0;">{{ formatIDR(subTotal) }}</td>
                </tr>
                <tr class="width-58">
                  <td colspan="2" style="padding:0;">Payment</td>
                  <td colspan="2" style="text-align:right;padding:0;">{{ transactionData?.payment_type || '-' }}</td>
                </tr>
              </table>
              <div id="company-name">
                Thank you!
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a href="javascript:void(0);" class="btn btn-primary" @click="doPrint">Print Receipt</a>
        </div>
      </div>
    </div>
  </div>
  <!-- /Print Receipt -->

  <!-- Transaction Details Modal -->
  <div class="modal fade" id="transaction-details" tabindex="-1" aria-labelledby="transaction-details-label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="transaction-details-label">Transaction Details</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedTransaction">
            <div class="d-flex justify-content-between mb-3">
              <span class="badge bg-primary">Order ID: {{ selectedTransaction.code }}</span>
              <span class="badge" :class="getStatusBadgeClass(selectedTransaction.status)">{{ selectedTransaction.status }}</span>
            </div>

            <div class="row mb-4">
              <div class="col-md-6">
                <h6>Customer Information</h6>
                <table class="table table-sm table-borderless">
                  <tr>
                    <td width="40%">Customer</td>
                    <td>: {{ selectedTransaction.customer_name || 'N/A' }}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>: {{ formatDate(selectedTransaction.date) }}</td>
                  </tr>
                </table>
              </div>
              <div class="col-md-6">
                <h6>Payment Details</h6>
                <table class="table table-sm table-borderless">
                  <tr>
                    <td width="40%">Payment Type</td>
                    <td>: {{ selectedTransaction.payment_type }}</td>
                  </tr>
                  <tr>
                    <td>Total Amount</td>
                    <td>: {{ formatIDR(selectedTransaction.total) }}</td>
                  </tr>
                </table>
              </div>
            </div>

            <h6>Order Items</h6>
            <div class="table-responsive">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedTransaction.transaction_items" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <img
                          v-if="item.image_path"
                          :src="item.image_path"
                          alt="Product"
                          class="me-2"
                          style="width: 40px; height: 40px; object-fit: contain;"
                        >
                        <div>
                          {{ item.name }}
                          <div v-if="item.note" class="small text-muted">Note: {{ item.note }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ formatIDR(item.price) }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ formatIDR(item.total_price || (item.price * item.qty)) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-end fw-bold">Subtotal</td>
                    <td>{{ formatIDR(selectedTransaction.sub_total) }}</td>
                  </tr>
                  <tr>
                    <td colspan="4" class="text-end fw-bold">Total</td>
                    <td>{{ formatIDR(selectedTransaction.total) }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p>Loading transaction details...</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <!-- Only show Print Receipt button for PAID orders -->
          <button
            v-if="selectedTransaction && selectedTransaction.status === 'PAID'"
            type="button"
            class="btn btn-primary"
            @click="printSelectedTransaction"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- /Transaction Details Modal -->

  <div>
    <!--    <div>-->
    <!--    <div-->
    <!--      id="printable-receipt"-->
    <!--      class="printable-receipt"-->
    <!--      :style="{-->
    <!--        width: '70mm',-->
    <!--        margin: '0',-->
    <!--        padding: '0',-->
    <!--        background: '#fff',-->
    <!--        fontFamily: 'times new roman, serif',-->
    <!--        fontSize: '6px',-->
    <!--        lineHeight: '1.2',-->
    <!--        textAlign: 'center'-->
    <!--      }"-->
    <!--    >-->
    <!--      <div class="receipt-header" style="margin:0;padding:0;">-->
    <!--        <img-->
    <!--          src="@/assets/img/logo-main.png"-->
    <!--          width="80"-->
    <!--          height="24"-->
    <!--          alt="Receipt Logo"-->
    <!--          style="display:block;margin:0 auto 2px auto;padding:0;"-->
    <!--          class="receipt-logo"-->
    <!--        />-->
    <!--        <div class="company-name">-->
    <!--          Jajaneun Chillioil x Sate Nagihin-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="information-store">chilioilxsatenagihin@gmail.com</div>-->
    <!--      <div class="information-store">085117569398</div>-->
    <!--      <div class="separator">-->
    <!--        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--      </div>-->

    <!--      <div class="label-transaction-info">Name</div>-->
    <!--      <div class="label-separator">:</div>-->
    <!--      <div class="value-transaction-info">{{ customerName }}</div>-->

    <!--      <div class="label-transaction-info">Name</div>-->
    <!--      <div class="label-separator">:</div>-->
    <!--      <div class="value-transaction-info">{{ customerName }}</div>-->

    <!--      <div class="label-transaction-info">Name</div>-->
    <!--      <div class="label-separator">:</div>-->
    <!--      <div class="value-transaction-info">{{ customerName }}</div>-->
    <!--      <div class="row">-->
    <!--        -->
    <!--        <div class="label-separator">:</div>-->
    <!--        <div class="value-transaction-info">{{ customerName }}</div>-->
    <!--      </div>-->
    <!--      <div class="row">-->
    <!--        <div class="label-transaction-info">Invoice</div>-->
    <!--        <div class="label-separator">:</div>-->
    <!--        <div class="value-transaction-info">{{ transactionData?.code }}</div>-->
    <!--      </div>-->
    <!--      <div class="row">-->
    <!--        <div class="label-transaction-info">Date</div>-->
    <!--        <div class="label-separator">:</div>-->
    <!--        <div class="value-transaction-info">{{ formattedDate }}</div>-->
    <!--      </div>-->
    <!--      <div class="separator">-->
    <!--        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--      </div>-->
    <!--      <div class="row">-->
    <!--        <div class="table-number">No</div>-->
    <!--        <div class="table-item">Item</div>-->
    <!--        <div class="table-qty">Qty</div>-->
    <!--        <div class="table-total">Total</div>-->
    <!--      </div>-->
    <!--      <div-->
    <!--        v-for="(item, index) in transactionData?.transaction_items || []"-->
    <!--        :key="item.product_id"-->
    <!--        class="row"-->
    <!--      >-->
    <!--        <div class="table-number-value">{{ index + 1 }}</div>-->
    <!--        <div class="table-item">{{ item.name }}</div>-->
    <!--        <div class="table-qty-value">{{ item.qty ?? 0 }}</div>-->
    <!--        <div class="table-total">Rp{{ item.price * (item.qty ?? 0) }}</div>-->
    <!--      </div>-->
    <!--      <div-->
    <!--          class="row"-->
    <!--      >-->
    <!--        <div class="table-number-value">1</div>-->
    <!--        <div class="table-item">Wonton Bakso Basi Besar Cakung Bobi</div>-->
    <!--        <div class="table-qty-value">100</div>-->
    <!--        <div class="table-total">Rp1.700.000</div>-->
    <!--      </div>-->
    <!--      <div class="separator">-->
    <!--        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--      </div>-->
    <!--      <div class="separator">-->
    <!--        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--      </div>-->
    <!--      &lt;!&ndash; Totals &ndash;&gt;-->
    <!--      <div>-->
    <!--        <span class="label">Sub Total</span>-->
    <!--        <span class="value">Rp{{ subTotal }}</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span class="label">Total Bill</span>-->
    <!--        <span class="value">Rp{{ subTotal }}</span>-->
    <!--      </div>-->
    <!--      <div>-->
    <!--        <span class="label">Payment</span>-->
    <!--        <span class="value">{{ transactionData?.payment_type || '-' }}</span>-->
    <!--      </div>-->
    <!--      <div id="company-name" class="company-name" style="margin-top:4px;">-->
    <!--        Thank you!-->
    <!--      </div>-->
    <!--    </div>-->
  </div>

  <!-- Recent Transactions -->
  <div class="modal fade pos-modal" id="orders" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header p-4">
          <h5 class="modal-title">Today's Orders</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <div class="tabs-sets">
            <ul class="nav nav-tabs" id="myTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="pending-tab" data-bs-toggle="tab"
                        data-bs-target="#pending" type="button" aria-controls="pending" aria-selected="true"
                        role="tab" @click="fetchOrders('PENDING')">Pending
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="paid-tab" data-bs-toggle="tab" data-bs-target="#paid"
                        type="button" aria-controls="paid" aria-selected="false" role="tab" @click="fetchOrders('PAID')">Paid
                </button>
              </li>
            </ul>
            <div class="tab-content">
              <!-- PENDING ORDERS -->
              <div class="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                <div class="table-top">
                  <div class="search-set w-100 search-order">
                    <div class="search-input w-100 d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        class="form-control me-2"
                        placeholder="Search order code or customer..."
                        v-model="pendingSearchQuery"
                        @keyup.enter="searchPendingOrders"
                      />
                      <button type="button" class="btn btn-primary" @click="searchPendingOrders">
                        <vue-feather type="search" class="feather-16"></vue-feather>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="order-body">
                  <div v-if="pendingOrdersLoading" class="text-center py-5">
                    <vue-feather type="loader" class="feather-24 spin"></vue-feather>
                    <p class="mt-2">Loading pending orders...</p>
                  </div>
                  <div v-else-if="filteredPendingOrders.length === 0" class="text-center py-5">
                    <vue-feather type="alert-circle" class="feather-24"></vue-feather>
                    <p class="mt-2">No pending orders found</p>
                  </div>
                  <div
                    v-else
                    v-for="order in filteredPendingOrders"
                    :key="order.id"
                    class="default-cover p-4 mb-4"
                  >
                    <span class="badge bg-warning d-inline-block mb-4">Order ID : {{ order.code }}</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">{{ order.customer_name }}</td>
                          </tr>
                          <tr>
                            <td>Items</td>
                            <td class="colon">:</td>
                            <td class="text">{{ order.total_item }}</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">{{ formatIDR(order.total) }}</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">{{ formatDate(order.date) }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <div class="btn-row d-sm-flex align-items-center justify-content-between mt-3">
                      <a
                          href="javascript:void(0);"
                          class="btn btn-primary btn-icon flex-fill"
                          @click="toggleOrderDetails(order.id)"
                      >
                        <span v-if="expandedOrderId === order.id">Hide Details</span>
                        <span v-else>View Details</span>
                      </a>
                      <button
                          href="javascript:void(0);"
                          class="btn btn-success btn-icon flex-fill"
                          @click="updateOrderStatus(order.id, 'PAID')"
                          :disabled="orderActionLoading"
                      >
                        <vue-feather type="check-circle" class="feather-14 me-1"></vue-feather>
                        Payment
                      </button>
                      <button
                          href="javascript:void(0);"
                          class="btn btn-danger btn-icon flex-fill"
                          @click="confirmCancelOrder(order.id)"
                          :disabled="orderActionLoading"
                      >
                        <vue-feather type="x-circle" class="feather-14 me-1"></vue-feather>
                        Cancel
                      </button>
                    </div>

                    <!-- Expanded transaction items section -->
                    <div v-if="expandedOrderId === order.id && order.transaction_items && order.transaction_items.length > 0" class="mt-3 mb-3">
                      <h6 class="mb-2">Order Items</h6>
                      <div class="table-responsive">
                        <table class="table table-sm table-striped">
                          <thead class="table-light">
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Qty</th>
                              <th class="text-end">Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in order.transaction_items" :key="item.id">
                              <td>{{ index + 1 }}</td>
                              <td>
                                {{ item.name }}
                                <div v-if="item.note" class="small text-muted">Note: {{ item.note }}</div>
                              </td>
                              <td>{{ item.qty }}</td>
                              <td class="text-end">{{ formatIDR(item.total_price || (item.price * item.qty)) }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Total</td>
                              <td class="text-end fw-bold">{{ formatIDR(order.total) }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <!-- Loading items indicator -->
                    <div v-else-if="expandedOrderId === order.id && loadingItems" class="mt-3 mb-3 text-center">
                      <vue-feather type="loader" class="feather-16 spin me-1"></vue-feather>
                      <span>Loading items...</span>
                    </div>
                  </div>
                </div>
                <!-- Add refresh button at the bottom -->
                <div class="d-flex justify-content-center mt-3">
                  <button type="button" class="btn btn-outline-secondary" @click="fetchOrders('PENDING', true)">
                    <vue-feather type="refresh-cw" class="feather-16 me-1"></vue-feather> Refresh
                  </button>
                </div>
              </div>

              <!-- PAID ORDERS -->
              <div class="tab-pane fade" id="paid" role="tabpanel" aria-labelledby="paid-tab">
                <div class="table-top">
                  <div class="search-set w-100 search-order">
                    <div class="search-input w-100 d-flex justify-content-between align-items-center">
                      <input
                        type="text"
                        class="form-control me-2"
                        placeholder="Search order code or customer..."
                        v-model="paidSearchQuery"
                        @keyup.enter="searchPaidOrders"
                      />
                      <button type="button" class="btn btn-primary" @click="searchPaidOrders">
                        <vue-feather type="search" class="feather-16"></vue-feather>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="order-body">
                  <div v-if="paidOrdersLoading" class="text-center py-5">
                    <vue-feather type="loader" class="feather-24 spin"></vue-feather>
                    <p class="mt-2">Loading paid orders...</p>
                  </div>
                  <div v-else-if="filteredPaidOrders.length === 0" class="text-center py-5">
                    <vue-feather type="alert-circle" class="feather-24"></vue-feather>
                    <p class="mt-2">No paid orders found</p>
                  </div>
                  <div
                    v-else
                    v-for="order in filteredPaidOrders"
                    :key="order.id"
                    class="default-cover p-4 mb-4"
                  >
                    <span class="badge bg-success d-inline-block mb-4">Order ID : {{ order.code }}</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">{{ order.customer_name }}</td>
                          </tr>
                          <tr>
                            <td>Items</td>
                            <td class="colon">:</td>
                            <td class="text">{{ order.total_item }}</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">{{ formatIDR(order.total) }}</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">{{ formatDate(order.date) }}</td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <div class="btn-row d-sm-flex align-items-center justify-content-between mt-3">
                      <a
                          href="javascript:void(0);"
                          class="btn btn-primary btn-icon flex-fill"
                          @click="toggleOrderDetails(order.id)"
                      >
                        <span v-if="expandedOrderId === order.id">Hide Details</span>
                        <span v-else>View Details</span>
                      </a>
                      <button
                          href="javascript:void(0);"
                          class="btn btn-success btn-icon flex-fill"
                          @click="printPaidOrder(order)"
                          data-bs-toggle="modal"
                          data-bs-target="#print-receipt"
                      >
                        <vue-feather type="printer" class="feather-14 me-1"></vue-feather>
                        Print Receipt
                      </button>
                    </div>

                    <!-- Expanded transaction items section -->
                    <div v-if="expandedOrderId === order.id && order.transaction_items && order.transaction_items.length > 0" class="mt-3 mb-3">
                      <h6 class="mb-2">Order Items</h6>
                      <div class="table-responsive">
                        <table class="table table-sm table-striped">
                          <thead class="table-light">
                            <tr>
                              <th>#</th>
                              <th>Product</th>
                              <th>Qty</th>
                              <th class="text-end">Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in order.transaction_items" :key="item.id">
                              <td>{{ index + 1 }}</td>
                              <td>
                                {{ item.name }}
                                <div v-if="item.note" class="small text-muted">Note: {{ item.note }}</div>
                              </td>
                              <td>{{ item.qty }}</td>
                              <td class="text-end">{{ formatIDR(item.total_price || (item.price * item.qty)) }}</td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="3" class="text-end fw-bold">Total</td>
                              <td class="text-end fw-bold">{{ formatIDR(order.total) }}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <!-- Loading items indicator -->
                    <div v-else-if="expandedOrderId === order.id && loadingItems" class="mt-3 mb-3 text-center">
                      <vue-feather type="loader" class="feather-16 spin me-1"></vue-feather>
                      <span>Loading items...</span>
                    </div>
                  </div>
                </div>
                <!-- Add refresh button at the bottom -->
                <div class="d-flex justify-content-center mt-3">
                  <button type="button" class="btn btn-outline-secondary" @click="fetchOrders('PAID', true)">
                    <vue-feather type="refresh-cw" class="feather-16 me-1"></vue-feather> Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Recent Transactions -->
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import printJS from "print-js";
import Swal from "sweetalert2";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const pad = n => n < 10 ? '0' + n : n;
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${pad(d.getFullYear())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDateForAPI(date) {
  const d = date;
  const pad = n => n < 10 ? '0' + n : n;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default {
  data() {
    return {
      Tax: ["Exclusive", "Inclusive"],
      Discount: ["Percentage", "Early payment discounts"],
      Sale: ["Kilogram", "Grams"],
      printReady: false,
      pendingSearchQuery: '',
      paidSearchQuery: '',
      pendingOrdersLoading: false,
      paidOrdersLoading: false,
      filteredPendingOrders: [],
      filteredPaidOrders: [],
      expandedOrderId: null,
      loadingItems: false,
      orderActionLoading: false,
    }
  },
  computed: {
    ...mapGetters("transaction", [
      "lastTransaction",
      "pendingTransactions",
      "paidTransactions",
      "selectedTransaction",
      "transactionLoading"
    ]),
    transactionData() {
      // Use lastTransaction from store, fallback to empty object
      return this.lastTransaction || {};
    },
    subTotal() {
      if (!this.transactionData?.transaction_items) return 0;
      // Use qty or quantity for each item
      return this.transactionData.transaction_items.reduce((sum, item) => sum + (item.price * (item.qty ?? 0)), 0);
    },
    customerName() {
      // Use customer_name from transaction data
      return this.transactionData?.customer_name || "Walk-in Customer";
    },
    customerId() {
      // You can adjust this if you have customer id in transactionData
      return this.transactionData?.customer_id || "-";
    },
    formattedDate() {
      return formatDate(this.transactionData?.date);
    }
  },
  methods: {
    ...mapActions("transaction", [
      "fetchTransactions",
      "getTransaction",
      "updateTransactionStatus"
    ]),

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

    handleNextOrder() {
      this.$emit('next-order');
      this.$nextTick(() => {
        const modal = document.getElementById('payment-completed');
        if (modal && window.bootstrap?.Modal) {
          const modalInstance = window.bootstrap.Modal.getInstance(modal) || new window.bootstrap.Modal(modal);
          modalInstance.hide();
        }
      });
    },
    submitForm() {
      this.$router.push("/sales/pos");
    },
    printReceipt() {
      // Open the print-receipt modal
      this.$nextTick(() => {
        const modal = document.getElementById('print-receipt');
        if (modal && window.bootstrap?.Modal) {
          const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modal);
          modalInstance.show();
        } else if (window.$ && window.$(modal).modal) {
          window.$(modal).modal('show');
        }
      });
    },
    doPrint() {
      // Ensure the printable area is up-to-date and rendered before printing
      this.printReady = false;
      this.$nextTick(() => {
        this.printReady = true;
        this.$nextTick(() => {
          printJS({
            printable: 'printable-receipt',
            type: 'html',
            font_size: '11pt',
            style: `
              @media print {
                @page {
                  size: 70mm auto;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                html, body, #printable-receipt {
                  width: 70mm !important;
                  min-width: 0 !important;
                  max-width: 70mm !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  background: #fff !important;
                  box-sizing: border-box !important;
                }
                /* Prevent page breaks inside receipt */
                #printable-receipt, #printable-receipt * {
                  page-break-inside: avoid !important;
                  break-inside: avoid !important;
                }
                table {
                  margin-top: 10px !important;
                  width: 100% !important;
                  border-collapse: collapse !important;
                }
                th, td {
                  font-size: 10px !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
                #separator {
                  margin-top: 20px !important;
                  text-align: center !important;
                }
                #company-name {
                  text-align: center !important;
                  font-size: 1pt !important;
                  font-weight: bold !important;
                }
                #information-name {
                  text-align: center !important;
                  font-size: 1pt !important;
                  margin-top: 10px !important;
                }
                #transaction-info {
                  font-size: 1pt !important;
                  margin-top: 10px !important;
                }
                #receipt-logo {
                  display: block !important;
                  margin: 0 auto !important;
                  max-width: 100% !important;
                  height: auto !important;
                }
                #text-center {
                  text-align: center !important;
                }
                #width-58 {
                  width: 70mm !important;
                }
              }
            `
          });
        });
      });
    },

    // Updated fetchOrders method to handle search queries and resetting
    async fetchOrders(status, resetSearch = false) {
      // Reset expanded order when switching tabs or refreshing
      this.expandedOrderId = null;

      // Reset search query if requested
      if (resetSearch) {
        if (status === 'PENDING') {
          this.pendingSearchQuery = '';
        } else {
          this.paidSearchQuery = '';
        }
      }

      // Get today's date
      const today = new Date();

      // Set start date to today at 00:00:00
      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);

      // Set end date to today at 23:59:59
      const endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);

      // Format dates for API - use URL-compatible format
      const fromDate = formatDateForAPI(startDate);
      const toDate = formatDateForAPI(endDate);

      // Get the appropriate search query based on the status
      const searchQuery = status === 'PENDING' ? this.pendingSearchQuery : this.paidSearchQuery;

      if (status === 'PENDING') {
        this.pendingOrdersLoading = true;
        this.filteredPendingOrders = [];
      } else {
        this.paidOrdersLoading = true;
        this.filteredPaidOrders = [];
      }

      try {
        await this.fetchTransactions({
          status: status,
          fromDate: fromDate,
          toDate: toDate,
          searchQuery: searchQuery
        });

        if (status === 'PENDING') {
          this.filteredPendingOrders = [...this.pendingTransactions];
        } else {
          this.filteredPaidOrders = [...this.paidTransactions];
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        if (status === 'PENDING') {
          this.pendingOrdersLoading = false;
        } else {
          this.paidOrdersLoading = false;
        }
      }
    },

    // Search methods that trigger API calls
    searchPendingOrders() {
      this.fetchOrders('PENDING');
    },

    searchPaidOrders() {
      this.fetchOrders('PAID');
    },

    // Methods to toggle and load order details
    async toggleOrderDetails(orderId) {
      if (this.expandedOrderId === orderId) {
        // If already expanded, collapse it
        this.expandedOrderId = null;
        return;
      }

      this.expandedOrderId = orderId;
      this.loadingItems = true;

      // Find the order in the appropriate array
      const isPending = this.filteredPendingOrders.some(order => order.id === orderId);
      const isPaid = this.filteredPaidOrders.some(order => order.id === orderId);

      // Only fetch details if the transaction_items array is empty or doesn't exist
      let orderWithItems;

      if (isPending) {
        orderWithItems = this.filteredPendingOrders.find(order => order.id === orderId);
      } else if (isPaid) {
        orderWithItems = this.filteredPaidOrders.find(order => order.id === orderId);
      }

      if (!orderWithItems?.transaction_items || orderWithItems.transaction_items.length === 0) {
        try {
          const result = await this.getTransaction(orderId);
          if (result.success) {
            // Update the order in the appropriate array
            if (isPending) {
              const orderIndex = this.filteredPendingOrders.findIndex(order => order.id === orderId);
              if (orderIndex !== -1) {
                this.filteredPendingOrders.splice(orderIndex, 1, {...this.selectedTransaction});
              }
            } else if (isPaid) {
              const orderIndex = this.filteredPaidOrders.findIndex(order => order.id === orderId);
              if (orderIndex !== -1) {
                this.filteredPaidOrders.splice(orderIndex, 1, {...this.selectedTransaction});
              }
            }
          }
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }

      this.loadingItems = false;
    },

    // New method to properly handle printing paid orders
    async printPaidOrder(order) {
      try {
        // If the order doesn't have transaction_items, fetch the complete details
        if (!order.transaction_items || order.transaction_items.length === 0) {
          const result = await this.getTransaction(order.id);
          if (result.success) {
            // Set the selected transaction as the current transaction to print
            this.$store.commit('transaction/setLastTransaction', this.selectedTransaction);
          } else {
            throw new Error("Failed to fetch transaction details");
          }
        } else {
          // If order already has transaction_items, use it directly
          this.$store.commit('transaction/setLastTransaction', order);
        }
      } catch (error) {
        console.error('Error preparing order for printing:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to prepare receipt for printing. Please try again.',
        });
      }
    },

    // Method to print specific order - can be removed as it's replaced by printPaidOrder
    printOrder(orderId) {
      this.getTransaction(orderId).then(() => {
        // Set the selected transaction as the current transaction to print
        this.$store.commit('transaction/setLastTransaction', this.selectedTransaction);

        // Open the print receipt modal
        setTimeout(() => {
          const printModal = document.getElementById('print-receipt');
          if (printModal && window.bootstrap?.Modal) {
            const modalInstance = new window.bootstrap.Modal(printModal);
            modalInstance.show();
          }
        }, 400);
      });
    },

    // Methods for updating order status
    async updateOrderStatus(orderId, status) {
      if (status === 'CANCEL') {
        this.confirmCancelOrder(orderId);
        return;
      }

      this.orderActionLoading = true;

      try {
        const result = await this.updateTransactionStatus({ id: orderId, status });
        if (result.success) {
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Order has been ${status.toLowerCase()} successfully.`,
            timer: 2000,
            showConfirmButton: false
          });

          // Refresh the orders list
          await this.fetchOrders('PENDING');
          await this.fetchOrders('PAID');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      } finally {
        this.orderActionLoading = false;
      }
    },

    // Updated to use SweetAlert2 directly instead of custom modal
    confirmCancelOrder(orderId) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Are you sure you want to cancel this order? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.processCancelOrder(orderId);
        }
      });
    },

    // Keep this method for processing cancel action
    async processCancelOrder(orderId) {
      this.orderActionLoading = true;

      try {
        const result = await this.updateTransactionStatus({ id: orderId, status: 'CANCELED' });
        if (result.success) {
          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Order Cancelled',
            text: 'The order has been cancelled successfully.',
            timer: 2000,
            showConfirmButton: false
          });

          // Refresh the orders list
          await this.fetchOrders('PENDING');
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to cancel the order. Please try again.',
        });
      } finally {
        this.orderActionLoading = false;
      }
    },

    async viewOrderDetails(orderId) {
      try {
        await this.getTransaction(orderId);

        // Close the orders modal and open transaction details modal
        this.$nextTick(() => {
          // Close orders modal
          const ordersModal = document.getElementById('orders');
          if (ordersModal && window.bootstrap?.Modal) {
            const modalInstance = window.bootstrap.Modal.getInstance(ordersModal);
            if (modalInstance) {
              modalInstance.hide();
            }
          }

          // Open transaction details modal
          setTimeout(() => {
            const detailsModal = document.getElementById('transaction-details');
            if (detailsModal && window.bootstrap?.Modal) {
              const modalInstance = new window.bootstrap.Modal(detailsModal);
              modalInstance.show();
            }
          }, 400);
        });
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    },

    printSelectedTransaction() {
      // Only allow printing for PAID transactions
      if (this.selectedTransaction && this.selectedTransaction.status !== 'PAID') {
        return;
      }

      // Close the transaction details modal
      const transactionDetailsModal = document.getElementById('transaction-details');
      if (transactionDetailsModal && window.bootstrap?.Modal) {
        const modalInstance = window.bootstrap.Modal.getInstance(transactionDetailsModal);
        if (modalInstance) {
          modalInstance.hide();
        }
      }

      // Set the selected transaction as the current transaction to print
      this.$store.commit('transaction/setLastTransaction', this.selectedTransaction);

      // Open the print receipt modal
      setTimeout(() => {
        const printModal = document.getElementById('print-receipt');
        if (printModal && window.bootstrap?.Modal) {
          const modalInstance = new window.bootstrap.Modal(printModal);
          modalInstance.show();
        }
      }, 400);
    },

    formatDate(dateStr) {
      return formatDate(dateStr);
    },

    getStatusBadgeClass(status) {
      switch(status) {
        case 'PENDING': return 'bg-warning';
        case 'PAID': return 'bg-success';
        default: return 'bg-secondary';
      }
    }
  },
  mounted() {
    // Fetch pending orders when the component is mounted to have data ready
    this.fetchOrders('PENDING');

    // Add spin class for loader icon
    const style = document.createElement('style');
    style.textContent = `
      .spin {
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  },
};
</script>

<style scoped>
.search-order .form-control {
  height: 38px;
  border-radius: 5px;
}
.colon {
  padding: 0 8px;
}
.feather-36 {
  width: 36px;
  height: 36px;
}
</style>
