<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>Store List</h4>
            <h6>Manage your Store</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <a data-bs-toggle="tooltip" data-bs-placement="top" title="Refresh"
              @click="refreshStores"
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
            data-bs-target="#add-stores"
            ><vue-feather type="plus-circle" class="me-2"></vue-feather> Add Store</a
          >
        </div>
      </div>
      <!-- /store list -->
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
                :options="StoreSort"
                id="storesort"
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
                    <custom-select :options="Store" id="store" placeholder="Choose Stores" />
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
                      :options="StoreStatus"
                      id="storestatus"
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
              :data-source="storeRows"
              :row-selection="{}"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Logo'">
                  <td>
                    <img
                      v-if="record.logo_url"
                      :src="record.logo_url"
                      alt="Logo"
                      style="width:40px;height:40px;object-fit:cover;border-radius:6px;"
                    />
                  </td>
                </template>
                <template v-if="column.key === 'action'">
                  <td class="action-table-data">
                    <div class="edit-delete-action">
                      <a
                        class="me-2 p-2"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-stores"
                        @click="openEditModal(record.id)"
                      >
                        <i data-feather="edit" class="feather-edit"></i>
                      </a>
                      <a
                        class="confirm-text p-2"
                        @click="confirmDelete(record.id)"
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
      <!-- /store list -->
    </div>
  </div>
  <store-list-modal ref="storeListModal" @refresh="refreshStores"></store-list-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import { ref } from "vue";
const currentDate = ref(new Date());
const columns = [
  {
    title: "Logo",
    dataIndex: "Logo",
    key: "Logo",
  },
  {
    title: "Store Name",
    dataIndex: "StoreName",
    key: "StoreName",
    sorter: {
      compare: (a, b) => {
        a = a.StoreName.toLowerCase();
        b = b.StoreName.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
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
      startdate: currentDate,
      dateFormat: "dd-MM-yyyy",
      filter: false,
      StoreSort: ["Sort by Date", "Newest", "Oldest"],
      StoreStatus: ["Choose Status", "Active", "Inactive"],
      Store: ["Choose Store", "Thomas", "Rasmussen", "Benjamin"],
      columns,
    };
  },
  computed: {
    ...mapGetters("store", ["stores", "storeError"]),
    storeRows() {
      return this.stores.map(store => ({
        Logo: store.logo_url || "",
        logo_url: store.logo_url || "",
        StoreName: store.name,
        id: store.id,
      }));
    },
  },
  methods: {
    ...mapActions("store", ["fetchStores"]),
    refreshStores() {
      this.fetchStores();
    },
    confirmDelete(id) {
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
          this.$refs.storeListModal.handleDelete(id);
        }
      });
    },
    openEditModal(id) {
      this.$refs.storeListModal.openEditModal(id);
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
  },
};
</script>
