<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="add-item d-flex">
          <div class="page-title">
            <h4>New Employee</h4>
            <h6>Create new Employee</h6>
          </div>
        </div>
        <ul class="table-top-head">
          <li>
            <div class="page-btn">
              <router-link to="employees-grid" class="btn btn-secondary"
                ><vue-feather type="arrow-left" class="me-2"></vue-feather>Back to
                Employee List</router-link
              >
            </div>
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
      </div>
      <!-- /employee create form -->
      <form @submit.prevent="handleCreate">
        <div class="card">
          <div class="card-body">
            <div class="new-employee-field">
              <div class="card-title-head">
                <h6>
                  <span><vue-feather type="info" class="info"></vue-feather></span>
                  Employee Information
                </h6>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="form.name" required />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="form.email" required />
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Role</label>
                    <select class="form-control" v-model="form.role_id" required>
                      <option value="">Select Role</option>
                      <option v-for="role in designationOptions" :key="role.id" :value="role.id">
                        {{ role.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <!-- Password Section -->
              <div class="card-title-head mt-4">
                <h6>
                  <span><vue-feather type="lock" class="info"></vue-feather></span>
                  Password
                </h6>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="mb-3 position-relative">
                    <label class="form-label">Password</label>
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.password"
                      required
                    />
                    <span
                      class="toggle-password"
                      @click="showPassword = !showPassword"
                      style="position:absolute;top:38px;right:12px;cursor:pointer;"
                    >
                      <i :class="showPassword ? 'feather-eye-off' : 'feather-eye'"></i>
                    </span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="mb-3 position-relative">
                    <label class="form-label">Confirm Password</label>
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.confirmPassword"
                      required
                    />
                    <span
                      class="toggle-password"
                      @click="showConfirmPassword = !showConfirmPassword"
                      style="position:absolute;top:38px;right:12px;cursor:pointer;"
                    >
                      <i :class="showConfirmPassword ? 'feather-eye-off' : 'feather-eye'"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="error" class="text-danger mt-2">{{ error }}</div>
              <div v-if="employeeError" class="text-danger mt-2">{{ employeeError }}</div>
            </div>
          </div>
        </div>
        <div class="text-end mb-3">
          <button type="button" class="btn btn-cancel me-2" @click="resetForm">Cancel</button>
          <button type="submit" class="btn btn-submit">Save Employee</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        role_id: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  computed: {
    ...mapGetters("designation", ["designations"]),
    ...mapGetters("employee", ["employeeError"]),
    designationOptions() {
      return this.designations || [];
    },
  },
  methods: {
    ...mapActions("employee", ["createEmployee", "clearError"]),
    ...mapActions("designation", ["fetchDesignations"]),
    async handleCreate() {
      this.error = "";
      this.clearError();
      if (!this.form.password || this.form.password !== this.form.confirmPassword) {
        this.error = "Password and Confirm Password must match.";
        return;
      }
      const payload = {
        name: this.form.name,
        email: this.form.email,
        role_id: this.form.role_id,
        password: this.form.password,
      };
      await this.createEmployee(payload);
      if (!this.employeeError) {
        this.resetForm();
        this.$router.push("/hrm/employees-grid");
      }
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        role_id: "",
        password: "",
        confirmPassword: "",
      };
      this.error = "";
      this.clearError();
      this.showPassword = false;
      this.showConfirmPassword = false;
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
<style scoped>
.toggle-password i {
  font-size: 18px;
}
</style>
