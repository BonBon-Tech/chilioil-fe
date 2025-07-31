<template>
  <!-- Add Designation -->
  <div class="modal fade" id="add-department">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Add Designation</h4>
              </div>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <form @submit.prevent="handleCreate">
                <div class="mb-3">
                  <label class="form-label">Designation Name</label>
                  <input type="text" class="form-control" v-model="createForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <input type="text" class="form-control" v-model="createForm.description" />
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
                  >Create Designation</button>
                </div>
                <div v-if="createError" class="text-danger mt-2">{{ createError }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Designation -->

  <!-- Edit Designation -->
  <div class="modal fade" id="edit-department">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Edit Designation</h4>
              </div>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body custom-modal-body">
              <form @submit.prevent="handleUpdate">
                <div class="mb-3">
                  <label class="form-label">Designation Name</label>
                  <input type="text" class="form-control" v-model="editForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <input type="text" class="form-control" v-model="editForm.description" />
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
  <!-- /Edit Designation -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      createForm: {
        name: "",
        description: "",
      },
      editForm: {
        id: null,
        name: "",
        description: "",
      },
      createError: "",
      updateError: "",
    };
  },
  computed: {
    ...mapGetters("designation", ["designation", "designationError"]),
  },
  watch: {
    designation(newVal) {
      if (newVal) {
        this.editForm.id = newVal.id;
        this.editForm.name = newVal.name;
        this.editForm.description = newVal.description;
      }
    },
    designationError(newVal) {
      this.createError = newVal;
      this.updateError = newVal;
    },
  },
  methods: {
    ...mapActions("designation", ["createDesignation", "updateDesignation", "fetchDesignations", "showDesignation", "clearError"]),
    async handleCreate() {
      await this.createDesignation({
        name: this.createForm.name,
        description: this.createForm.description,
      });
      setTimeout(() => {
        if (!this.designationError) {
          this.createForm.name = "";
          this.createForm.description = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleUpdate() {
      await this.updateDesignation({
        id: this.editForm.id,
        payload: {
          name: this.editForm.name,
          description: this.editForm.description,
        },
      });
      setTimeout(() => {
        if (!this.designationError) {
          this.editForm.name = "";
          this.editForm.description = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    clearDesignationError() {
      this.clearError();
    },
  },
};
</script>