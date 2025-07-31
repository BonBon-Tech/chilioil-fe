<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper">
    <div class="content">
      <div class="page-header">
        <div class="page-title">
          <h4>Profile</h4>
          <h6>Manage your profile</h6>
        </div>
      </div>
      <form @submit.prevent="handleUpdate">
        <div class="card">
          <div class="card-body">
            <div class="profile-set">
              <div class="profile-head"></div>
              <div class="profile-top">
                <div class="profile-content">
                  <div class="profile-contentimg">
                    <img src="@/assets/img/customer/customer5.jpg" alt="img" id="blah" />
                  </div>
                  <div class="profile-contentname">
                    <h2>{{form.name}}</h2>
                    <h4>Updates Your Photo and Personal Details.</h4>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-section">
              <div class="row">
                <div class="col-lg-6 col-md-8">
                  <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="form.name" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="form.email" required />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Role</label>
                    <input type="text" class="form-control" :value="form.role" disabled />
                  </div>
                  <div class="card-title-head mt-4">
                    <h6>
                      <span><vue-feather type="lock" class="info"></vue-feather></span>
                      Change Password
                    </h6>
                  </div>
                  <div class="mb-3 position-relative">
                    <label class="form-label">Password</label>
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.password"
                    />
                    <span
                      class="toggle-password"
                      @click="showPassword = !showPassword"
                      style="position:absolute;top:38px;right:12px;cursor:pointer;"
                    >
                      <i :class="showPassword ? 'feather-eye-off' : 'feather-eye'"></i>
                    </span>
                  </div>
                  <div class="mb-3 position-relative">
                    <label class="form-label">Confirm Password</label>
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="form-control"
                      v-model="form.confirmPassword"
                    />
                    <span
                      class="toggle-password"
                      @click="showConfirmPassword = !showConfirmPassword"
                      style="position:absolute;top:38px;right:12px;cursor:pointer;"
                    >
                      <i :class="showConfirmPassword ? 'feather-eye-off' : 'feather-eye'"></i>
                    </span>
                  </div>
                  <div v-if="error" class="text-danger mt-2">{{ error }}</div>
                  <div v-if="success" class="text-success mt-2">{{ success }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-end mb-3">
          <button type="submit" class="btn btn-submit">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        id: null,
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
      success: "",
      showPassword: false,
      showConfirmPassword: false,
    };
  },
  methods: {
    ...mapActions("employee", ["updateEmployee", "clearError"]),
    async handleUpdate() {
      this.error = "";
      this.success = "";
      this.clearError();
      if (this.form.password && this.form.password !== this.form.confirmPassword) {
        this.error = "Password and Confirm Password must match.";
        return;
      }
      const payload = {
        name: this.form.name,
        email: this.form.email,
      };
      if (this.form.password) {
        payload.password = this.form.password;
      }
      try {
        await this.updateEmployee({ id: this.form.id, payload });
        if (!this.$store.getters["employee/employeeError"]) {
          this.success = "Profile updated successfully.";
          // Optionally update localStorage user data
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          user.name = this.form.name;
          user.email = this.form.email;
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          this.error = this.$store.getters["employee/employeeError"];
        }
      } catch (e) {
        this.error = "Failed to update profile.";
      }
    },
    loadUser() {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      this.form.id = user.id || null;
      this.form.name = user.name || "";
      this.form.email = user.email || "";
      this.form.role = user.role?.name || "";
      this.form.password = "";
      this.form.confirmPassword = "";
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.toggle-password i {
  font-size: 18px;
}
</style>
