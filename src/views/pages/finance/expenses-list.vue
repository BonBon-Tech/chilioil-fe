<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Expense List</h4>
            <h6>Manage Your Expenses</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
              @click="refreshExpenses"
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
            Expense</a
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
                  ><vue-feather type="search" class="feather-search"></vue-feather
                ></a>
              </div>
            </div>
            <div class="search-path">
              <div class="d-flex align-items-center">
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
            </div>
            <div class="form-sort">
              <vue-feather type="sliders" class="info-img"></vue-feather>
              <custom-select
                :options="Sortbyexp"
                id="sortbyexp"
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
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="user" class="info-img"></vue-feather>
                    <custom-select
                      :options="ChooseMacbook"
                      id="choosemackbook"
                      placeholder="Choose Name"
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="stop-circle" class="info-img"></vue-feather>
                    <custom-select
                      :options="ChooseComputers"
                      id="choosecomputers"
                      placeholder="Choose Status"
                    />
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="calendar" class="info-img"></vue-feather>
                    <div class="input-groupicon">
                      <date-picker
                        v-model="startdateOne"
                        placeholder="From Date - To Date"
                        class="form-control"
                        :editable="true"
                        :clearable="false"
                        :input-format="dateFormat"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="file-text" class="info-img"></vue-feather>
                    <div class="input-groupicon">
                      <date-picker
                        v-model="startdateOne"
                        placeholder="Enter Reference"
                        class="form-control"
                        :editable="true"
                        :clearable="false"
                        :input-format="dateFormat"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-6 col-12">
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
              class="table datanew"
              :columns="columns"
              :data-source="expenseRows"
              :row-selection="{}"
              :pagination="paginationConfig"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <a
                        class="me-2 p-2 mb-0"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-units"
                        @click="openEditModal(record.id)"
                      >
                        <i data-feather="edit" class="feather-edit"></i>
                      </a>
                      <a
                        class="me-3 confirm-text p-2 mb-0"
                        href="javascript:void(0);"
                        @click="showDeleteConfirmation(record.id)"
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
  <expenses-list-modal ref="expensesListModal"></expenses-list-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import Swal from "sweetalert2";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
const columns = [
  {
    title: "Category Name",
    dataIndex: "CategoryName",
    sorter: {
      compare: (a, b) => a.CategoryName.localeCompare(b.CategoryName),
    },
  },
  {
    title: "Reference",
    dataIndex: "Reference",
    sorter: {
      compare: (a, b) => a.Reference.localeCompare(b.Reference),
    },
  },
  {
    title: "Date",
    dataIndex: "Date",
    sorter: {
      compare: (a, b) => a.Date.localeCompare(b.Date),
    },
  },
  {
    title: "Amount",
    dataIndex: "Amount",
    sorter: {
      compare: (a, b) => a.Amount.localeCompare(b.Amount),
    },
  },
  {
    title: "Description",
    dataIndex: "Description",
    sorter: {
      compare: (a, b) => a.Description.localeCompare(b.Description),
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: true,
  },
];

export default {
  data() {
    return {
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
      filter: false,
      Sortbyexp: ["Sort by Date", "11 09 23", "20 09 23"],
      ChooseMacbook: ["Choose Name", "Mackbook pro", "Orange"],
      ChooseComputers: ["Choose Status", "Computers", "Fruits"],
      columns,
    };
  },
  computed: {
    ...mapGetters("expense", ["expenses", "expenseError", "pagination"]),
    expenseRows() {
      // Map API data to table format
      return this.expenses.map(exp => ({
        CategoryName: exp.expense_category?.name || "",
        Reference: exp.reference,
        Date: exp.date ? new Date(exp.date).toLocaleDateString() : "",
        Status: "Active", // Adjust if you have status field
        StatusClass: "badge badge-linesuccess", // Adjust if you have status field
        Amount: exp.amount,
        Description: exp.description,
        id: exp.id,
      }));
    },
    paginationConfig() {
      return {
        current: this.pagination.current_page,
        pageSize: this.pagination.per_page,
        total: this.pagination.total,
        onChange: this.handlePageChange,
      };
    },
  },
  methods: {
    ...mapActions("expense", ["fetchExpenses", "fetchExpenseDetail", "deleteExpense"]),
    handlePageChange(page) {
      this.fetchExpenses({ page });
    },
    openEditModal(id) {
      this.$refs.expensesListModal.openEditModal(id);
    },
    showDeleteConfirmation(id) {
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
          this.deleteExpense(id);
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
    refreshExpenses() {
      this.fetchExpenses();
    },
  },
  mounted() {
    this.fetchExpenses();
  },
};
</script>
