<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Expense Category</h4>
            <h6>Manage your categories</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
               @click="refreshCategories"
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
              data-bs-target="#add-category"
          ><vue-feather type="plus-circle" class="me-2"></vue-feather>Add New
            Expense Category</a
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
                  :options="CategoryListSort"
                  id="categoryListsort"
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
                        :options="CategorySelect"
                        id="categoryselect"
                        placeholder="Choose Category"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="calendar" class="info-img"></vue-feather>
                    <div class="input-groupicon">
                      <date-picker
                          v-model="startdate"
                          placeholder="Choose Date"
                          class="form-control"
                          :editable="true"
                          :clearable="false"
                          :input-format="dateFormat"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="stop-circle" class="info-img"></vue-feather>
                    <custom-select
                        :options="CategoryStatus"
                        id="categorystatus"
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
                class="table datanew"
                :columns="columns"
                :data-source="expense_categories"
                :row-selection="{}"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <a
                          class="me-2 p-2"
                          href="javascript:void(0);"
                          data-bs-toggle="modal"
                          data-bs-target="#edit-category"
                          @click="showCategory(record.id)"
                      >
                        <i data-feather="edit" class="feather-edit"></i>
                      </a>
                      <a
                          class="confirm-text p-2"
                          @click="showConfirmation(record)"
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
  <expenses-category-modal @refresh="refreshCategories"></expenses-category-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import Swal from "sweetalert2";
const columns = [
  {
    title: "Category",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "Code",
    dataIndex: "code",
    sorter: {
      compare: (a, b) => a.code.localeCompare(b.code),
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: false,
  },
];
const data = [];
const currentDate = ref(new Date());
export default {
  data() {
    return {
      filter: false,
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
      CategoryListSort: ["Sort by Date", "Newest", "Oldest"],
      CategorySelect: ["Choose Category", "Laptop", "Electronics", "Shoe"],
      CategoryStatus: ["Choose Status", "Active", "Inactive"],
      data,
      columns,
    };
  },
  computed: {
    ...mapGetters("expenseCategory", ["expense_categories", "expense_category", "categoryError"]),
    ...mapGetters("alert", ["alertType", "alertMessage", "alertVisible"]),
    alertClass() {
      return this.alertType === "success" ? "alert-success" : "alert-danger";
    },
  },
  methods: {
    ...mapActions("expenseCategory", [
      "fetchCategories",
      "showCategory",
      "createCategory",
      "updateCategory",
      "deleteCategory",
      "clearCategory",
      "clearError",
    ]),
    ...mapActions("alert", ["triggerAlert", "closeAlert"]),
    refreshCategories() {
      this.fetchCategories();
      this.triggerAlert({ type: "success", message: "Expense Categories refreshed successfully." });
    },
    showConfirmation(record) {
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
          this.deleteCategory(record.id);
          this.refreshCategories();
          this.triggerAlert({ type: "success", message: "Category has been deleted." });
        }
      });
    },
    clearCategoryError() {
      this.clearError();
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
    this.fetchCategories();
  },
};
</script>
