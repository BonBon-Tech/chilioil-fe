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
                      data-bs-toggle="modal" data-bs-target="#print-receipt">Print Receipt<i
                  class="feather-arrow-right-circle icon-me-5"></i></button>
              <button type="button" class="btn btn-secondary flex-fill" @click="handleNextOrder">Next Order<i
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
                    <td colspan="2" id="text-center">Rp{{ item.price * (item.qty ?? 0) }}</td>
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
                  <td colspan="2" style="text-align:right;padding:0;">Rp{{ subTotal }}</td>
                </tr>
                <tr class="width-58">
                  <td colspan="2" style="padding:0;">Total Bill</td>
                  <td colspan="2" style="text-align:right;padding:0;">Rp{{ subTotal }}</td>
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

  <!-- Products -->
  <div class="modal fade modal-default pos-modal" id="products" aria-labelledby="products">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header p-4 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <h5 class="me-4">Products</h5>
            <span class="badge bg-info d-inline-block mb-0">Order ID : #666614</span>
          </div>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="submitForm">
            <div class="product-wrap">
              <div class="product-list d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center flex-fill">
                  <a href="javascript:void(0);" class="img-bg me-2">
                    <img src="@/assets/img/products/pos-product-16.png" alt="Products">
                  </a>
                  <div class="info d-flex align-items-center justify-content-between flex-fill">
                    <div>
                      <span>PT0005</span>
                      <h6><a href="javascript:void(0);">Red Nike Laser</a></h6>
                    </div>
                    <p>$2000</p>
                  </div>
                </div>

              </div>
              <div class="product-list d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center flex-fill">
                  <a href="javascript:void(0);" class="img-bg me-2">
                    <img src="@/assets/img/products/pos-product-17.png" alt="Products">
                  </a>
                  <div class="info d-flex align-items-center justify-content-between flex-fill">
                    <div>
                      <span>PT0235</span>
                      <h6><a href="javascript:void(0);">Iphone 14</a></h6>
                    </div>
                    <p>$3000</p>
                  </div>
                </div>
              </div>
              <div class="product-list d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center flex-fill">
                  <a href="javascript:void(0);" class="img-bg me-2">
                    <img src="@/assets/img/products/pos-product-16.png" alt="Products">
                  </a>
                  <div class="info d-flex align-items-center justify-content-between flex-fill">
                    <div>
                      <span>PT0005</span>
                      <h6><a href="javascript:void(0);">Red Nike Laser</a></h6>
                    </div>
                    <p>$2000</p>
                  </div>
                </div>
              </div>
              <div class="product-list d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center flex-fill">
                  <a href="javascript:void(0);" class="img-bg me-2">
                    <img src="@/assets/img/products/pos-product-17.png" alt="Products">
                  </a>
                  <div class="info d-flex align-items-center justify-content-between flex-fill">
                    <div>
                      <span>PT0005</span>
                      <h6><a href="javascript:void(0);">Red Nike Laser</a></h6>
                    </div>
                    <p>$2000</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer d-sm-flex justify-content-end">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Products -->

  <div class="modal fade" id="create" tabindex="-1" aria-labelledby="create" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>Customer Name</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>Email</label>
                  <input type="email" class="form-control">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>Phone</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>Country</label>
                  <input type="text" class="form-control">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>City</label>
                  <input type="text">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks">
                  <label>Address</label>
                  <input type="text">
                </div>
              </div>
            </div>
            <div class="modal-footer d-sm-flex justify-content-end">
              <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-submit me-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Hold -->
  <div class="modal fade modal-default pos-modal" id="hold-order" aria-labelledby="hold-order">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header p-4">
          <h5>Hold order</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="submitForm">
            <h2 class="text-center p-4">4500.00</h2>
            <div class="input-block">
              <label>Order Reference</label>
              <input class="form-control" type="text" value="" placeholder="">
            </div>
            <p>The current order will be set on hold. You can retreive this order from the pending order button.
              Providing a reference to it might help you to identify the order more quickly.</p>
            <div class="modal-footer d-sm-flex justify-content-end">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Hold -->

  <!-- Edit Product -->
  <div class="modal fade modal-default pos-modal" id="edit-product" aria-labelledby="edit-product">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header p-4">
          <h5>Red Nike Laser</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Product Name <span>*</span></label>
                  <input type="text" placeholder="45">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Tax Type <span>*</span></label>
                  <custom-select
                      :options="Tax"
                      id="taxtype"
                      placeholder="Exclusive"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Tax <span>*</span></label>
                  <input type="text" placeholder="% 15">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Discount Type <span>*</span></label>
                  <custom-select
                      :options="Discount"
                      placeholder="Percentage"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Discount <span>*</span></label>
                  <input type="text" placeholder="15">
                </div>
              </div>
              <div class="col-lg-6 col-sm-12 col-12">
                <div class="input-blocks add-product">
                  <label>Sale Unit <span>*</span></label>
                  <custom-select
                      :options="Sale"
                      id="saleunit"
                      placeholder="Kilogram"
                  />
                </div>
              </div>
            </div>

            <div class="modal-footer d-sm-flex justify-content-end">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- /Edit Product -->

  <!-- Recent Transactions -->
  <div class="modal fade pos-modal" id="recents" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header p-4">
          <h5 class="modal-title">Recent Transactions</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <div class="tabs-sets">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="purchase-tab" data-bs-toggle="tab"
                        data-bs-target="#purchase" type="button" aria-controls="purchase" aria-selected="true"
                        role="tab">Purchase
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment"
                        type="button" aria-controls="payment" aria-selected="false" role="tab">Payment
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="return-tab" data-bs-toggle="tab" data-bs-target="#return"
                        type="button" aria-controls="return" aria-selected="false" role="tab">Return
                </button>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="purchase" role="tabpanel"
                   aria-labelledby="purchase-tab">
                <div class="table-top">
                  <div class="search-set">
                    <div class="search-input">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>
                  <div class="wordset">
                    <ul>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img
                            src="@/assets/img/icons/pdf.svg" alt="img"></a>
                      </li>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img
                            src="@/assets/img/icons/excel.svg" alt="img"></a>
                      </li>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
                          <vue-feather
                              type="printer" class="printer"></vue-feather>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table datanew">
                    <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th class="no-sort">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0101</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0102</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0103</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0104</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0105</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0106</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0107</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="payment" role="tabpanel">
                <div class="table-top">
                  <div class="search-set">
                    <div class="search-input">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>
                  <div class="wordset">
                    <ul>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"><img
                            src="@/assets/img/icons/pdf.svg" alt="img"></a>
                      </li>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"><img
                            src="@/assets/img/icons/excel.svg" alt="img"></a>
                      </li>
                      <li>
                        <a class="d-flex align-items-center justify-content-center"
                           data-bs-toggle="tooltip" data-bs-placement="top" title="Print">
                          <vue-feather
                              type="printer" class="printer"></vue-feather>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table datanew">
                    <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th class="no-sort">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0101</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0102</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0103</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0104</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0105</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0106</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0107</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane fade" id="return" role="tabpanel">
                <div class="table-top">
                  <div class="search-set">
                    <div class="search-input">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>
                  <div class="wordset">
                    <ul>
                      <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"
                           class="d-flex align-items-center justify-content-center"><img
                            src="@/assets/img/icons/pdf.svg" alt="img"></a>
                      </li>
                      <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"
                           class="d-flex align-items-center justify-content-center"><img
                            src="@/assets/img/icons/excel.svg" alt="img"></a>
                      </li>
                      <li>
                        <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"
                           class="d-flex align-items-center justify-content-center">
                          <vue-feather
                              type="printer" class="printer"></vue-feather>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table datanew">
                    <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reference</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th class="no-sort">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0101</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0102</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0103</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0104</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0105</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0106</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>19 Jan 2023</td>
                      <td>INV/SL0107</td>
                      <td>Walk-in Customer</td>
                      <td>$1500.00</td>
                      <td class="action-table-data">
                        <div class="edit-delete-action">
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather type="eye"
                                         class="feather-eye"></vue-feather>
                          </a>
                          <a class="me-2 p-2" href="javascript:void(0);">
                            <vue-feather
                                type="edit" class="feather-edit"></vue-feather>
                          </a>
                          <a class="p-2 confirm-text" href="javascript:void(0);">
                            <vue-feather
                                type="trash-2" class="feather-trash-2"></vue-feather>
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
  <!-- /Recent Transactions -->

  <!-- Recent Transactions -->
  <div class="modal fade pos-modal" id="orders" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header p-4">
          <h5 class="modal-title">Orders</h5>
          <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body p-4">
          <div class="tabs-sets">
            <ul class="nav nav-tabs" id="myTabs" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="onhold-tab" data-bs-toggle="tab"
                        data-bs-target="#onhold" type="button" aria-controls="onhold" aria-selected="true"
                        role="tab">Onhold
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="unpaid-tab" data-bs-toggle="tab" data-bs-target="#unpaid"
                        type="button" aria-controls="unpaid" aria-selected="false" role="tab">Unpaid
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="paid-tab" data-bs-toggle="tab" data-bs-target="#paid"
                        type="button" aria-controls="paid" aria-selected="false" role="tab">Paid
                </button>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="onhold" role="tabpanel" aria-labelledby="onhold-tab">
                <div class="table-top">
                  <div class="search-set w-100 search-order">
                    <div class="search-input w-100">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>
                </div>
                <div class="order-body">
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-secondary d-inline-block mb-4">Order ID : #666659</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Botsford</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$900</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">29-08-2023 13:39:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-sm-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-secondary d-inline-block mb-4">Order ID : #666660</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Smith</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$15000</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">30-08-2023 15:59:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4">
                    <span class="badge bg-secondary d-inline-block mb-4">Order ID : #666661</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">John David</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$2000</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">01-09-2023 13:15:00</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4 mb-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                </div>

              </div>
              <div class="tab-pane fade" id="unpaid" role="tabpanel">
                <div class="table-top">
                  <div class="search-set w-100 search-order">
                    <div class="search-input">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>

                </div>
                <div class="order-body">
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-info d-inline-block mb-4">Order ID : #666662</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Anastasia</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$2500</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">10-09-2023 17:15:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-info d-inline-block mb-4">Order ID : #666663</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Lucia</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$1500</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">11-09-2023 14:50:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-info d-inline-block mb-4">Order ID : #666664</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Diego</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$30000</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">12-09-2023 17:22:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4 mb-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="paid" role="tabpanel">
                <div class="table-top">
                  <div class="search-set w-100 search-order">
                    <div class="search-input">
                      <a class="btn btn-searchset d-flex align-items-center h-100"><img
                          src="@/assets/img/icons/search-white.svg" alt="img"></a>
                    </div>
                  </div>
                </div>
                <div class="order-body">
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-primary d-inline-block mb-4">Order ID : #666665</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Hugo</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$5000</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">13-09-2023 19:39:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-primary d-inline-block mb-4">Order ID : #666666</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">Antonio</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$7000</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">15-09-2023 18:39:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
                    </div>
                  </div>
                  <div class="default-cover p-4 mb-4">
                    <span class="badge bg-primary d-inline-block mb-4">Order ID : #666667</span>
                    <div class="row">
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr class="mb-3">
                            <td>Cashier</td>
                            <td class="colon">:</td>
                            <td class="text">admin</td>
                          </tr>
                          <tr>
                            <td>Customer</td>
                            <td class="colon">:</td>
                            <td class="text">MacQuoid</td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-sm-12 col-md-6 record mb-3">
                        <table>
                          <tr>
                            <td>Total</td>
                            <td class="colon">:</td>
                            <td class="text">$7050</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                            <td class="colon">:</td>
                            <td class="text">17-09-2023 19:39:11</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <p class="p-4 mb-4">Customer need to recheck the product once</p>
                    <div class="btn-row d-flex align-items-center justify-content-between">
                      <a href="javascript:void(0);" class="btn btn-info btn-icon flex-fill">Open</a>
                      <a href="javascript:void(0);"
                         class="btn btn-danger btn-icon flex-fill">Products</a>
                      <a href="javascript:void(0);"
                         class="btn btn-success btn-icon flex-fill">Print</a>
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
  <!-- /Recent Transactions -->
</template>

<script>
import {mapGetters} from "vuex";
import printJS from "print-js";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const pad = n => n < 10 ? '0' + n : n;
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default {
  data() {
    return {
      Tax: ["Exclusive", "Inclusive"],
      Discount: ["Percentage", "Early payment discounts"],
      Sale: ["Kilogram", "Grams"],
      printReady: false,
    }
  },
  computed: {
    ...mapGetters("transaction", ["lastTransaction"]),
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
          // printJS({
          //   printable: 'printable-receipt',
          //   type: 'html',
          //   font_size: '11pt',
          //   style: `
          //     @media print {
          //       @page {
          //         size: 70mm auto;
          //         margin: 0 !important;
          //         padding: 0 !important;
          //       }
          //       html, body, #printable-receipt, .printable-receipt {
          //         width: 70mm !important;
          //         min-width: 0 !important;
          //         max-width: 70mm !important;
          //         margin: 0 !important;
          //         padding: 0 !important;
          //         // background: #fff !important;
          //         // box-sizing: border-box !important;
          //         // font-family: 'Times New Roman', Times, serif !important;
          //         // font-size: 10px !important;
          //         // line-height: 1.2 !important;
          //         // text-align: center !important;
          //       }
          //       .receipt-logo {
          //         display: block !important;
          //         margin: 0 auto !important;
          //         max-width: 100% !important;
          //         height: auto !important;
          //       }
          //       .company-name {
          //         text-align: center !important;
          //         font-size: 1pt !important;
          //         font-weight: bold !important;
          //       }
          //       .information-store {
          //         text-align: center !important;
          //         font-size: 1pt !important;
          //         margin-top: 10px !important;
          //       }
          //       .separator {
          //         margin-top: 5px !important;
          //         text-align: center !important;
          //       }
          //       // .row {
          //       //   display: flex;
          //       //   flex-direction: row;
          //       //   word-break: break-word;
          //       //   width: 70mm !important;
          //       //   margin-top: 5px;
          //       // }
          //       .row {
          //         display: flex;
          //         flex-direction: row;
          //         width: 70mm !important;
          //         margin: 5px 0 0 0 !important;
          //         padding: 0 0 0 0 !important;
          //         // align-items: flex-start; /* align items to top in case they wrap */
          //         // page-break-inside: avoid;
          //         // white-space: normal !important; /* allow wrapping */
          //         // overflow-wrap: break-word !important; /* for long strings with no spaces */
          //         // height: auto !important; /* allow height to adjust based on content */
          //       }
          //       .label-transaction-info {
          //         width: 15mm !important;
          //         text-align: left !important;
          //       }
          //       .label-separator {
          //         width: 2mm !important;
          //         text-align: left !important;
          //       }
          //       .value-transaction-info {
          //         width: 53mm !important;
          //         text-align: left !important;
          //       }
          //       .table-number {
          //         width: 8mm !important;
          //         text-align: left !important;
          //       }
          //       .table-number-value {
          //         width: 8mm !important;
          //         text-align: center !important;
          //       }
          //       // .table-item {
          //       //   width: 27mm !important;
          //       //   text-align: left !important;
          //       // }
          //       .table-item {
          //         width: 27mm !important;
          //         text-align: left !important;
          //         word-wrap: break-word; /* wrap long words */
          //         white-space: normal !important; /* allow wrapping */
          //         overflow-wrap: break-word !important; /* for long strings with no spaces */
          //         padding: 0 0 0 0 !important;
          //         margin: 0 0 0 0 !important;
          //       }
          //       .table-qty {
          //         width: 8mm !important;
          //         text-align: left !important;
          //       }
          //       .table-qty-value {
          //         width: 8mm !important;
          //         text-align: center !important;
          //       }
          //       .table-total {
          //         width: 27mm !important;
          //         text-align: center !important;
          //       }
          //       .table-number-value,
          //       .table-number,
          //       .table-qty,
          //       .table-qty-value,
          //       .table-total {
          //         padding: 0 0 0 0 !important;
          //         margin: 0 0 0 0 !important;
          //         display: flex;
          //         align-items: flex-start; /* align with wrapping text */
          //       }
          //     }
          //   `
          // });
        });
      });
    }
  },
};
</script>
