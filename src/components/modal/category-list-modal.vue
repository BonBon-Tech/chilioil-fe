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
                  <label class="form-label">Category Slug</label>
                  <input type="text" class="form-control" v-model="createForm.slug" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Logo</label>
                  <input type="file" class="form-control" @change="onCreateLogoChange" accept="image/*" />
                  <div v-if="createForm.logoPreview" class="mt-2">
                    <img :src="createForm.logoPreview" alt="Logo Preview" style="max-width: 100px; max-height: 100px;" />
                  </div>
                </div>
                <div class="mb-0">
                  <div class="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span class="status-label">Status</span>
                    <input type="checkbox" id="user2" class="check" v-model="createForm.status" />
                    <label for="user2" class="checktoggle"></label>
                  </div>
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
                  <label class="form-label">Category Slug</label>
                  <input type="text" class="form-control" v-model="editForm.slug" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Logo</label>
                  <input type="file" class="form-control" @change="onEditLogoChange" accept="image/*" />
                  <div v-if="editForm.logoPreview" class="mt-2">
                    <img :src="editForm.logoPreview" alt="Logo Preview" style="max-width: 100px; max-height: 100px;" />
                  </div>
                </div>
                <div class="mb-0">
                  <div class="status-toggle modal-status d-flex justify-content-between align-items-center">
                    <span class="status-label">Status</span>
                    <input type="checkbox" id="user3" class="check" v-model="editForm.status" />
                    <label for="user3" class="checktoggle"></label>
                  </div>
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
        slug: "",
        status: true,
        logo: null,
        logoPreview: null,
      },
      editForm: {
        id: null,
        name: "",
        slug: "",
        status: true,
        logo: null,
        logoPreview: null,
      },
      createError: "",
      updateError: "",
    };
  },
  computed: {
    ...mapGetters("category", ["category", "categoryError"]),
  },
  watch: {
    category(newVal) {
      if (newVal) {
        this.editForm.id = newVal.id;
        this.editForm.name = newVal.name;
        this.editForm.slug = newVal.slug;
        this.editForm.status = !!newVal.status;
        this.editForm.logoPreview = newVal.logo_url || null;
        this.editForm.logo = null;
      }
    },
    categoryError(newVal) {
      this.createError = newVal;
      this.updateError = newVal;
    },
  },
  methods: {
    ...mapActions("category", ["createCategory", "updateCategory", "fetchCategories", "showCategory", "clearError"]),
    onCreateLogoChange(e) {
      const file = e.target.files[0];
      this.createForm.logo = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.createForm.logoPreview = ev.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.createForm.logoPreview = null;
      }
    },
    onEditLogoChange(e) {
      const file = e.target.files[0];
      this.editForm.logo = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.editForm.logoPreview = ev.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.editForm.logoPreview = null;
      }
    },
    async handleCreate() {
      const formData = new FormData();
      formData.append("name", this.createForm.name);
      formData.append("slug", this.createForm.slug);
      formData.append("status", this.createForm.status ? 1 : 0);
      if (this.createForm.logo) {
        formData.append("logo", this.createForm.logo);
      }
      await this.createCategory(formData);
      setTimeout(() => {
        if (!this.categoryError) {
          this.createForm.name = "";
          this.createForm.slug = "";
          this.createForm.status = true;
          this.createForm.logo = null;
          this.createForm.logoPreview = null;
          // Reset file input value
          const logoInput = document.querySelector('#add-category input[type="file"]');
          if (logoInput) logoInput.value = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleUpdate() {
      const formData = new FormData();
      formData.append("name", this.editForm.name);
      formData.append("slug", this.editForm.slug);
      formData.append("status", this.editForm.status ? 1 : 0);
      if (this.editForm.logo) {
        formData.append("logo", this.editForm.logo);
      }
      await this.updateCategory({
        id: this.editForm.id,
        payload: formData,
      });
      setTimeout(() => {
        if (!this.categoryError) {
          this.editForm.logo = null;
          this.editForm.logoPreview = null;
          // Reset file input value
          const logoInput = document.querySelector('#edit-category input[type="file"]');
          if (logoInput) logoInput.value = "";
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