<template>
  <!-- Add Credential -->
  <div class="modal fade" id="add-credential">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Create Wifi Credential</h4>
              </div>
              <button
                  type="button"
                  class="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <form @submit.prevent="handleCreate">
                <div class="mb-3">
                  <label class="form-label">Code</label>
                  <input type="text" class="form-control" v-model="createForm.code" />
                </div>
                <div class="mb-3 form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="createStatus" v-model="createForm.is_active" />
                  <label class="form-check-label" for="createStatus">
                    {{ createForm.is_active ? 'Active' : 'Non Active' }}
                  </label>
                </div>
                <div class="modal-footer-btn">
                  <button
                      type="button"
                      class="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                  >Cancel</button>
                  <button
                      type="submit"
                      class="btn btn-submit"
                      :data-bs-dismiss="!createError ? 'modal' : null"
                  >Create Credential</button>
                </div>
                <div v-if="createError" class="text-danger mt-2">{{ createError }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Status -->
  <div class="modal fade" id="edit-credential-status">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Update Wifi Credential Status</h4>
              </div>
              <button
                  type="button"
                  class="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                  <label class="form-label">Code</label>
                  <input type="text" class="form-control" v-model="editForm.code" readonly />
                </div>
                <div class="mb-3 form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="editStatus" v-model="editForm.is_active" />
                  <label class="form-check-label" for="editStatus">
                    {{ editForm.is_active ? 'Active' : 'Non Active' }}
                  </label>
                </div>
                <div class="modal-footer-btn">
                  <button
                      type="button"
                      class="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                  >Cancel</button>
                  <button
                      type="submit"
                      class="btn btn-submit"
                      :data-bs-dismiss="!updateError ? 'modal' : null"
                  >Save Changes</button>
                </div>
                <div v-if="updateError" class="text-danger mt-2">{{ updateError }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      createForm: {
        code: "",
        is_active: true,
      },
      editForm: {
        id: null,
        code: "",
        is_active: true,
      },
      createError: "",
      updateError: "",
    };
  },
  computed: {
    ...mapGetters("wifiCredential", ["credential", "wifiCredentialError"]),
  },
  watch: {
    // Populate edit form when current credential changes
    credential(newVal) {
      if (newVal) {
        this.editForm.id = newVal.id;
        this.editForm.code = newVal.code || "";
        this.editForm.is_active = !!newVal.is_active;
      } else {
        this.editForm.id = null;
        this.editForm.code = "";
        this.editForm.is_active = true;
      }
    },
    // Mirror store error into local error fields
    wifiCredentialError(newVal) {
      this.createError = newVal;
      this.updateError = newVal;
    },
  },
  methods: {
    ...mapActions("wifiCredential", ["createCredential", "updateCredentialStatus", "clearError"]),
    async handleCreate() {
      await this.clearError();
      await this.createCredential(this.createForm);
      setTimeout(() => {
        if (!this.wifiCredentialError) {
          this.createForm.code = "";
          this.createForm.is_active = true;
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleUpdate() {
      if (!this.editForm.id) return;
      await this.clearError();
      // Send both is_active and code on update
      await this.updateCredentialStatus({
        id: this.editForm.id,
        is_active: this.editForm.is_active,
        code: this.editForm.code,
      });
      setTimeout(() => {
        if (!this.wifiCredentialError) {
          this.$emit("refresh");
        }
      }, 0);
    },
    clearCredentialError() {
      this.clearError();
    },
  },
};
</script>

<style scoped>
/* ...existing code... */
</style>