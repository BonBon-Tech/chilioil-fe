<template>
  <div id="app">
    <div class="main-wrapper">
      <!-- Global Loading Spinner Overlay -->
      <div
        v-if="loadingVisible"
        class="global-loading-overlay"
        style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2000; background: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center;"
      >
        <div>
          <div class="spinner-grow text-primary" role="status" style="width: 4rem; height: 4rem;">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <!-- Alert should be above loading spinner -->
      <div
        v-if="alertVisible"
        :class="['alert', alertClass, 'alert-dismissible', 'fade', 'show', 'custom-alert-icon', 'shadow-sm', 'd-flex', 'align-items-center']"
        role="alert"
        style="position: fixed; top: 20px; right: 30px; z-index: 2100; min-width: 300px; max-width: 600px;"
      >
        <i
          v-if="alertType === 'success'"
          class="feather-check-circle flex-shrink-0 me-2"
        ></i>
        <i
          v-else
          class="feather-alert-octagon flex-shrink-0 me-2"
        ></i>
        {{ alertMessage }}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          @click="closeAlert"
        >
          <i class="fas fa-xmark"></i>
        </button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("alert", ["alertType", "alertMessage", "alertVisible"]),
    ...mapGetters("loading", ["loadingVisible"]),
    alertClass() {
      return this.alertType === "success" ? "alert-success" : "alert-danger";
    },
  },
  methods: {
    ...mapActions("alert", ["closeAlert"]),
    ...mapActions("loading", ["showLoading", "hideLoading"]),
  },
};
</script>

<style>
.global-loading-overlay {
  transition: opacity 0.2s;
}
</style>