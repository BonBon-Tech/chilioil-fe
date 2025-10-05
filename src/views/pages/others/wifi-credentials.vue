<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Wifi Credentials</h4>
            <h6>Manage your wifi credentials</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
               @click="refreshCredentials"
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
              data-bs-target="#add-credential"
          ><vue-feather type="plus-circle" class="me-2"></vue-feather>Add New
            Credential</a
          >
        </div>
      </div>
      <!-- /list -->
      <div class="card table-list-card">
        <div class="card-body">
          <div class="table-top">
            <div class="search-set">
              <div class="search-input">
                <input
                    type="text"
                    placeholder="Search"
                    class="dark-input"
                    v-model="searchQuery"
                    @keyup.enter="searchCredentials"
                />
                <a href="javascript:void(0);" class="btn btn-searchset" @click="searchCredentials">
                  <i data-feather="search" class="feather-search"></i>
                </a>
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
                :data-source="credentials"
                :row-selection="{}"
                :pagination="false"
                :loading="loading"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Status'">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :checked="record.is_active"
                      @change="toggleStatus(record, $event)"
                    />
                    <span class="ms-2 badge" :class="record.is_active ? 'badge-linesuccess' : 'badge-linedanger'">
                      {{ record.is_active ? 'Active' : 'Non Active' }}
                    </span>
                  </div>
                </template>
                <template v-else-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <!-- Match style: call store action like showCategory -->
<!--                      <a-->
<!--                          class="me-2 p-2"-->
<!--                          href="javascript:void(0);"-->
<!--                          data-bs-toggle="modal"-->
<!--                          data-bs-target="#edit-credential-status"-->
<!--                          @click="showCredential(record.id)"-->
<!--                      >-->
<!--                        <i data-feather="edit" class="feather-edit"></i>-->
<!--                      </a>-->
                      <!-- Delete -->
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
                <template v-else-if="column.dataIndex === 'logo'">
                  <img v-if="record.logo_url" :src="record.logo_url" alt="logo" style="height:32px;" />
                </template>
              </template>
            </a-table>

            <!-- Pagination Controls -->
            <div class="d-flex justify-content-between align-items-center flex-wrap mt-3" v-if="pagination && pagination.last_page > 0">
              <div class="d-flex align-items-center mb-2">
                <span class="me-2">Show</span>
                <select
                    class="form-select form-select-sm"
                    v-model="itemsPerPage"
                    @change="changeItemsPerPage"
                    style="width: auto;"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span class="ms-2">entries</span>
              </div>

              <div class="pagination-info mb-2">
                <span>Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of {{ pagination.total }} entries</span>
              </div>

              <ul class="pagination mb-2">
                <li
                    class="page-item"
                    :class="{ disabled: pagination.current_page === 1 }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="changePage(1)">&laquo;</a>
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: pagination.current_page === 1 }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="changePage(pagination.current_page - 1)">&lt;</a>
                </li>

                <li
                    v-for="page in visiblePageNumbers"
                    :key="page"
                    class="page-item"
                    :class="{ active: page === pagination.current_page }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="changePage(page)">{{ page }}</a>
                </li>

                <li
                    class="page-item"
                    :class="{ disabled: pagination.current_page === pagination.last_page }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="changePage(pagination.current_page + 1)">&gt;</a>
                </li>
                <li
                    class="page-item"
                    :class="{ disabled: pagination.current_page === pagination.last_page }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="changePage(pagination.last_page)">&raquo;</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- /list -->
    </div>
  </div>
  <!-- Mount modal (no props, same as expenses-category-modal usage) -->
  <wifi-credential-modal @refresh="refreshCredentials"></wifi-credential-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import Swal from "sweetalert2";
import WifiCredentialModal from "@/components/modal/wifi-credential-modal.vue";
const columns = [
  {
    title: "Code",
    dataIndex: "code",
    sorter: {
      compare: (a, b) => (a.code || '').localeCompare(b.code || ''),
    },
  },
  {
    title: "Status",
    dataIndex: "is_active",
    key: "Status",
    sorter: {
      compare: (a, b) => Number(!!a.is_active) - Number(!!b.is_active),
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
  components: {
    WifiCredentialModal,
  },
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
      loading: false,
      itemsPerPage: 10,
      currentPage: 1,
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters("wifiCredential", ["credentials", "credential", "wifiCredentialError", "pagination"]),
    ...mapGetters("alert", ["alertType", "alertMessage", "alertVisible"]),
    ...mapGetters("loading", ["loadingVisible"]),
    alertClass() {
      return this.alertType === "success" ? "alert-success" : "alert-danger";
    },
    // Compute visible page numbers for pagination
    visiblePageNumbers() {
      if (!this.pagination) return [];

      const current = this.pagination.current_page;
      const last = this.pagination.last_page;

      // Show up to 5 page numbers
      if (last <= 5) {
        // If total pages are 5 or less, show all
        return Array.from({ length: last }, (_, i) => i + 1);
      } else {
        // Always include first, last, current, and 1-2 surrounding pages
        let pages = [1, last, current];

        // Add one page before and after current if possible
        if (current > 1) pages.push(current - 1);
        if (current < last) pages.push(current + 1);

        // Add second page if needed
        if (current > 3) pages.push(2);

        // Add second-to-last page if needed
        if (current < last - 2) pages.push(last - 1);

        // Sort the page numbers and remove duplicates
        return [...new Set(pages)].sort((a, b) => a - b);
      }
    }
  },
  methods: {
    ...mapActions("wifiCredential", [
      "fetchCredentials",
      "createCredential",
      "updateCredentialStatus",
      "deleteCredential",
      "clearError",
      "showCredential",
    ]),
    ...mapActions("alert", ["triggerAlert", "closeAlert"]),

    // return the promise so callers can await
    refreshCredentials() {
      this.loading = true;
      const p = this.fetchCredentials({
        page: this.currentPage,
        per_page: this.itemsPerPage,
        search: this.searchQuery
      }).finally(() => {
        this.loading = false;
      });
      this.triggerAlert({ type: "success", message: "Credentials refreshed successfully." });
      return p;
    },

    changePage(page) {
      if (page > 0 && page <= this.pagination.last_page && page !== this.pagination.current_page) {
        this.currentPage = page;
        this.loading = true;
        this.fetchCredentials({
          page,
          per_page: this.itemsPerPage,
          search: this.searchQuery
        }).finally(() => {
          this.loading = false;
        });
      }
    },

    changeItemsPerPage() {
      this.currentPage = 1;
      this.loading = true;
      this.fetchCredentials({
        page: 1,
        per_page: this.itemsPerPage,
        search: this.searchQuery
      }).finally(() => {
        this.loading = false;
      });
    },

    searchCredentials() {
      this.currentPage = 1;
      this.loading = true;
      this.fetchCredentials({
        page: 1,
        per_page: this.itemsPerPage,
        search: this.searchQuery
      }).finally(() => {
        this.loading = false;
      });
    },

    async toggleStatus(record, evt) {
      // Preserve previous state
      const prev = !!record.is_active;
      const next = !prev;

      // Attempt update; include code as requested
      const ok = await this.updateCredentialStatus({
        id: record.id,
        is_active: next,
        code: record.code,
      });

      // Revert the visual toggle if request failed (e.g., 422)
      if (!ok && evt && evt.target) {
        evt.target.checked = prev;
      } else if (ok) {
        await this.refreshCredentials();
      }
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
      }).then(async (result) => {
        if (result.value) {
          await this.deleteCredential(record.id);
          await this.refreshCredentials();
          this.triggerAlert({ type: "success", message: "Credential has been deleted." });
        }
      });
    },
    clearCredentialError() {
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
    this.loading = true;
    this.fetchCredentials({
      page: this.currentPage,
      per_page: this.itemsPerPage
    }).finally(() => {
      this.loading = false;
    });
  },
  watch: {
    // Update itemsPerPage when pagination changes
    'pagination.per_page'(newValue) {
      if (newValue && newValue !== this.itemsPerPage) {
        this.itemsPerPage = newValue;
      }
    },
    // Update currentPage when pagination changes
    'pagination.current_page'(newValue) {
      if (newValue && newValue !== this.currentPage) {
        this.currentPage = newValue;
      }
    },
    // Watch for loading state changes
    loadingVisible(newValue) {
      this.loading = newValue;
    }
  }
};
</script>

<style scoped>
.pagination {
  margin-bottom: 0;
}
.form-select {
  min-width: 70px;
}
</style>
