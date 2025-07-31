<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Designation</h4>
            <h6>Manage your designation</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Refresh"
              @click="refreshDesignations"
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
            data-bs-target="#add-department"
            ><vue-feather type="plus-circle" class="me-2"></vue-feather>Add New
            Designation</a
          >
        </div>
      </div>
      <!-- /designation list -->
      <div class="card table-list-card">
        <div class="card-body pb-0">
          <div class="table-top table-top-new">
            <div class="search-set mb-0">
              <div class="search-input">
                <input type="text" placeholder="Search" class="dark-input" />
                <a href="" class="btn btn-searchset"
                  ><i data-feather="search" class="feather-search"></i
                ></a>
              </div>
            </div>
            <div class="search-path d-flex align-items-center search-path-new">
              <div class="d-flex">
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
                  :options="SortbyNewest"
                  id="sortbynewest"
                  placeholder="Sort by Date"
                />
              </div>
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
                    <vue-feather type="file-text" class="info-img"></vue-feather>
                    <custom-select
                      :options="DesignationCh"
                      id="designationch"
                      placeholder="Choose Designation"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="users" class="info-img"></vue-feather>
                    <custom-select :options="DesHod" id="deshod" placeholder="Choose HOD" />
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
              :data-source="designationRows"
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
                        data-bs-target="#edit-department"
                        @click="showDesignation(record.id)"
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
      <!-- /designation list -->
    </div>
  </div>
  <designation-modal @refresh="refreshDesignations"></designation-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
const columns = [
  {
    title: "Designation",
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    sorter: {
      compare: (a, b) => (a.description || '').localeCompare(b.description || ''),
    },
  },
  {
    title: "Created On",
    dataIndex: "created_at",
    key: "created_at",
    sorter: {
      compare: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
  },
  {
    title: "Action",
    key: "action",
    sorter: false,
  },
];
export default {
  data() {
    return {
      filter: false,
      columns,
      SortbyNewest: ["Sort by Date", "Newest", "Oldest"],
      DesignationCh: ["Choose Designation"],
      DesHod: ["Choose HOD"],
    };
  },
  computed: {
    ...mapGetters("designation", ["designations", "designationError"]),
    designationRows() {
      return (this.designations || []);
    },
  },
  methods: {
    ...mapActions("designation", ["fetchDesignations", "clearError", "showDesignation", "deleteDesignation"]),
    refreshDesignations() {
      this.fetchDesignations();
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
          this.deleteDesignation(record.id);
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
  mounted() {
    this.fetchDesignations();
  },
};
</script>
