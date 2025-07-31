<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Employees</h4>
            <h6>Manage your employees</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Refresh"
              @click="refreshEmployees"
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
          <router-link to="add-employee" class="btn btn-added"
            ><vue-feather type="plus-circle" class="me-2"></vue-feather>Add New
            Employee</router-link
          >
        </div>
      </div>
      <!-- /product list -->
      <div class="card">
        <div class="card-body pb-0">
          <div class="table-top table-top-two table-top-new">
            <div class="search-set mb-0">
              <div class="total-employees">
                <h6>
                  <i data-feather="users" class="feather-user"></i>Total Employees
                  <span>{{employees.length}}</span>
                </h6>
              </div>
              <div class="search-input">
                <a href="" class="btn btn-searchset"
                  ><i data-feather="search" class="feather-search"></i
                ></a>
                <input type="search" class="form-control" />
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
                <custom-select :options="SortEmp" id="sortemp" placeholder="Sort by Date" />
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
                    <vue-feather type="user" class="info-img"></vue-feather>
                    <custom-select
                      :options="EmpName"
                      id="empname"
                      placeholder="Choose Name"
                    />
                  </div>
                </div>
                <div class="col-lg-3 col-sm-6 col-12">
                  <div class="input-blocks">
                    <vue-feather type="stop-circle" class="info-img"></vue-feather>
                    <custom-select
                      :options="Empstatus"
                      id="empstatus"
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
        </div>
      </div>
      <!-- /product list -->

      <div class="employee-grid-widget">
        <div class="row">
          <div
            class="col-xxl-3 col-xl-4 col-lg-6 col-md-6"
            v-for="record in employees"
            :key="record.id"
          >
            <div class="employee-grid-profile">
              <div class="profile-head">
                <label class="checkboxs">
                  <input type="checkbox" />
                  <span class="checkmarks"></span>
                </label>
                <div class="profile-head-action">
                  <span class="badge badge-linesuccess">Active</span>
                  <div class="dropdown profile-action">
                    <a
                      href="javascript:void(0);"
                      class="action-icon dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      ><vue-feather type="more-vertical" class="user"></vue-feather
                    ></a>
                    <ul class="dropdown-menu">
                      <li>
                        <router-link :to="`edit-employee/${record.id}`" class="dropdown-item"
                          ><vue-feather type="edit" class="info-img"></vue-feather
                          >Edit</router-link
                        >
                      </li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          class="dropdown-item confirm-text mb-0"
                          @click="showDeleteConfirmation(record)"
                          ><vue-feather type="trash-2" class="info-img"></vue-feather
                          >Delete</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="profile-info">
                <div class="profile-pic active-profile">
                  <img src="@/assets/img/users/user-01.jpg" alt="" />
                </div>
                <h4>{{ record.name }}</h4>
                <span>{{ record.role?.name || 'N/A' }}</span>
              </div>
              <ul class="department">
                <li>
                  Email
                  <span>{{ record.email }}</span>

                  <br>

                  Created
                  <span>{{ formatDate(record.created_at) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row custom-pagination">
          <div class="col-md-12">
            <div class="paginations d-flex justify-content-end mb-3">
              <span><i class="fas fa-chevron-left"></i></span>
              <ul class="d-flex align-items-center page-wrap">
                <li v-for="page in employeePagination.last_page" :key="page">
                  <a
                    href="javascript:void(0);"
                    :class="{ active: page === employeePagination.current_page }"
                    @click="changePage(page)"
                  >
                    {{ page }}
                  </a>
                </li>
              </ul>
              <span><i class="fas fa-chevron-right"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      filter: false,
      Empstatus: ["Choose Status", "Active", "Inactive"],
      SortEmp: ["Sort by Date", "Newest", "Oldest"],
      EmpName: ["Choose Name", "Mitchum Daniel", "Robert Grossman", "Janet Hembre"],
    };
  },
  computed: {
    ...mapGetters("employee", ["employees", "employeePagination"]),
  },
  methods: {
    ...mapActions("employee", ["fetchEmployees", "deleteEmployee"]),
    refreshEmployees() {
      this.fetchEmployees();
    },
    changePage(page) {
      this.fetchEmployees(page);
    },
    toggleCollapse() {
      const collapseHeader = this.$refs.collapseHeader;
      if (collapseHeader) {
        collapseHeader.classList.toggle("active");
        document.body.classList.toggle("header-collapse");
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      const pad = (n) => n.toString().padStart(2, '0');
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    showDeleteConfirmation(record) {
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
          this.deleteEmployee(record.id);
        }
      });
    },
  },
  mounted() {
    this.fetchEmployees();
  },
};
</script>
