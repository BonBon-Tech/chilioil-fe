<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Warranty</h4>
            <h6>Manage your warranty</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Pdf"
              ><img src="@/assets/img/icons/pdf.svg" alt="img"
            /></a>
          </li>
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Excel"
              ><img src="@/assets/img/icons/excel.svg" alt="img"
            /></a>
          </li>
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Print"
              ><i data-feather="printer" class="feather-printer"></i
            ></a>
          </li>
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
              ><i data-feather="rotate-ccw" class="feather-rotate-ccw"></i
            ></a>
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
        <div class="page-btn">
          <a
            href="javascript:void(0);"
            class="btn btn-added"
            data-bs-toggle="modal"
            data-bs-target="#add-units"
            ><vue-feather type="plus-circle" class="me-2"></vue-feather> Add New
            Warranty</a
          >
        </div>
      </div>
      <!-- /product list -->
      <div class="card table-list-card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-input">
                <input type="text" placeholder="Search" class="dark-input" />
                <a href="" class="btn btn-searchset"
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
              <custom-select
                :options="WarrantySort"
                id="warrantysort"
                placeholder="Sort by Date"
              />
            </div>
          </div>
          <!-- /Filter -->
          <div
            class="card"
            :style="{ display: filter ? 'block' : 'none' }"
            id="filter_inputs"
          >
            <div class="card-body pb-0">
              <div class="row">
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="zap" class="info-img"></vue-feather>
                    <custom-select
                      :options="ChooseWarranty"
                      id="choosewarranty"
                      placeholder="Choose Unit"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="stop-circle" class="info-img"></vue-feather>
                    <custom-select
                      :options="WarrantyStatus"
                      id="warrantystatus"
                      placeholder="Choose Status"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12 ms-auto">
                  <div class="input-blocks">
                    <a class="btn btn-filters ms-auto">
                      <i data-feather="search" class="feather-search"></i> Search
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Filter -->
          <div class="table-responsive">
            <a-table
              class="table datanew table-hover table-center mb-0"
              :columns="columns"
              :data-source="data"
              :row-selection="{}"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Status'">
                  <span class="badge badge-linesuccess">{{
                    record.Status
                  }}</span></template
                >
                <template v-else-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <a
                        class="me-2 p-2"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-units"
                      >
                        <i data-feather="edit" class="feather-edit"></i>
                      </a>
                      <a
                        class="confirm-text p-2"
                        @click="showConfirmation"
                        href="javascript:void(0);"
                      >
                        <i data-feather="trash-2" class="feather-trash-2"></i>
                      </a>
                    </div>
                  </td>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <!-- /product list -->
    </div>
  </div>
  <warranty-modal></warranty-modal>
</template>
<script>
const columns = [
  {
    title: "Name",
    dataIndex: "Name",
    sorter: {
      compare: (a, b) => {
        a = a.Name.toLowerCase();
        b = b.Name.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Description",
    dataIndex: "Description",
    sorter: {
      compare: (a, b) => {
        a = a.Description.toLowerCase();
        b = b.Description.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Duration",
    dataIndex: "Duration",
    sorter: {
      compare: (a, b) => {
        a = a.Duration.toLowerCase();
        b = b.Duration.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    sorter: {
      compare: (a, b) => {
        a = a.Status.toLowerCase();
        b = b.Status.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
  },
];
const data = [
  {
    Name: "Express Warranty",
    Description:
      "Repairs or a replacement for a faulty product within a specified time period after it was purchased.",
    Duration: "3 Months",
    Status: "Active",
  },
  {
    Name: "Special warranty",
    Description:
      "Seller of the property(grantor) warrants only against anything that occurred during their physical ownership.",
    Duration: "6 Months",
    Status: "Active",
  },
  {
    Name: "Implied Warranty",
    Description:
      "Assurances that a product is fit for the purpose that it is intended and that it is merchantable.",
    Duration: "1 Year",
    Status: "Active",
  },
];
import Swal from "sweetalert2";
export default {
  data() {
    return {
      filter: false,
      WarrantySort: ["Sort by Date", "Newest", "Oldest"],
      ChooseWarranty: ["Choose Duration", "3 Months", "6 Months", "1 Year"],
      WarrantyStatus: ["Choose Status", "Active", "Inactive"],
      data,
      columns,
    };
  },
  methods: {
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
    toggleCollapse() {
      const collapseHeader = this.$refs.collapseHeader;

      if (collapseHeader) {
        collapseHeader.classList.toggle("active");
        document.body.classList.toggle("header-collapse");
      }
    },
  },
};
</script>
