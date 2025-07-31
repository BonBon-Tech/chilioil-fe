<template>
  <!-- Add Category -->
  <div class="modal fade" id="add-category">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Create Category</h4>
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
                  <label class="form-label">Category</label>
                  <input type="text" class="form-control" v-model="createForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category Code</label>
                  <input type="text" class="form-control" v-model="createForm.code" />
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
                  >Create Category</button>
                </div>
                <div v-if="createError" class="text-danger mt-2">{{ createError }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Category -->

  <!-- Edit Category -->
  <div class="modal fade" id="edit-category">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Edit Category</h4>
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
                  <label class="form-label">Category</label>
                  <input type="text" class="form-control" v-model="editForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Category Code</label>
                  <input type="text" class="form-control" v-model="editForm.code" />
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
        name: "",
        code: "",
      },
      editForm: {
        id: null,
        name: "",
        code: "",
      },
      createError: "",
      updateError: "",
    };
  },
  computed: {
    ...mapGetters("expenseCategory", ["expense_category", "categoryError"]),
  },
  watch: {
    expense_category(newVal) {
      if (newVal) {
        this.editForm.id = newVal.id;
        this.editForm.name = newVal.name;
        this.editForm.code = newVal.code;
      }
    },
    categoryError(newVal) {
      this.createError = newVal;
      this.updateError = newVal;
    },
  },
  methods: {
    ...mapActions("expenseCategory", ["createCategory", "updateCategory", "fetchCategories", "showCategory", "clearError"]),
    async handleCreate() {
      await this.createCategory(this.createForm);
      setTimeout(() => {
        if (!this.categoryError) {
          this.createForm.name = "";
          this.createForm.code = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleUpdate() {
      await this.updateCategory({
        id: this.editForm.id,
        payload: this.editForm,
      });
      setTimeout(() => {
        if (!this.categoryError) {
          this.$emit("refresh");
        }
      }, 0);
    },
    clearCategoryError() {
      this.clearError();
    },
  },
};
</script>