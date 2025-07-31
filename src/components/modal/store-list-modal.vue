<template>
  <!-- Add Store -->
  <div class="modal fade" id="add-stores">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Create Store</h4>
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
                  <label class="form-label">Store Name</label>
                  <input type="text" class="form-control" v-model="createForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Logo</label>
                  <input type="file" class="form-control" @change="onCreateLogoChange" accept="image/*" />
                  <div v-if="createForm.logoPreview" class="mt-2">
                    <img :src="createForm.logoPreview" alt="Logo Preview" style="max-width: 100px; max-height: 100px;" />
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
                  >Create Store</button>
                </div>
                <div v-if="createError" class="text-danger mt-2">{{ createError }}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Add Store -->

  <!-- Edit Store -->
  <div class="modal fade" id="edit-stores">
    <div class="modal-dialog modal-dialog-centered custom-modal-two">
      <div class="modal-content">
        <div class="page-wrapper-new p-0">
          <div class="content">
            <div class="modal-header border-0 custom-modal-header">
              <div class="page-title">
                <h4>Edit Store</h4>
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
                  <label class="form-label">Store Name</label>
                  <input type="text" class="form-control" v-model="editForm.name" />
                </div>
                <div class="mb-3">
                  <label class="form-label">Logo</label>
                  <input type="file" class="form-control" @change="onEditLogoChange" accept="image/*" />
                  <div v-if="editForm.logoPreview" class="mt-2">
                    <img :src="editForm.logoPreview" alt="Logo Preview" style="max-width: 100px; max-height: 100px;" />
                  </div>
                  <div v-else-if="editForm.id && currentLogoUrl" class="mt-2">
                    <img :src="currentLogoUrl" alt="Current Logo" style="max-width: 100px; max-height: 100px;" />
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
        logo: null,
        logoPreview: null,
      },
      editForm: {
        id: null,
        name: "",
        logo: null,
        logoPreview: null,
      },
      currentLogoUrl: null,
      createError: "",
      updateError: "",
    };
  },
  computed: {
    ...mapGetters("store", ["stores", "storeError"]),
  },
  watch: {
    storeError(newVal) {
      this.createError = newVal;
      this.updateError = newVal;
    },
  },
  methods: {
    ...mapActions("store", ["createStore", "updateStore", "fetchStores", "deleteStore"]),
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
      let payload = { name: this.createForm.name, logo: this.createForm.logo };
      await this.createStore(payload);
      setTimeout(() => {
        if (!this.storeError) {
          this.createForm.name = "";
          this.createForm.logo = null;
          this.createForm.logoPreview = null;
          const logoInput = document.querySelector('#add-stores input[type="file"]');
          if (logoInput) logoInput.value = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleUpdate() {
      let payload = { name: this.editForm.name, logo: this.editForm.logo };
      await this.updateStore({
        id: this.editForm.id,
        payload,
      });
      setTimeout(() => {
        if (!this.storeError) {
          this.editForm.logo = null;
          this.editForm.logoPreview = null;
          const logoInput = document.querySelector('#edit-stores input[type="file"]');
          if (logoInput) logoInput.value = "";
          this.$emit("refresh");
        }
      }, 0);
    },
    async handleDelete(id) {
      await this.deleteStore(id);
      this.$emit("refresh");
    },
    openEditModal(id) {
      const store = this.stores.find(s => s.id === id);
      if (store) {
        this.editForm = {
          id: store.id,
          name: store.name,
          logo: null,
          logoPreview: null,
        };
        this.currentLogoUrl = store.logo_url || null;
        const logoInput = document.querySelector('#edit-stores input[type="file"]');
        if (logoInput) logoInput.value = "";
      }
    },
  },
};
</script>
