<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper cardhead">
    <div class="content container-fluid">
      <!-- Page Header -->
      <layout-breadcrumb :title="title" :text="text" :text1="text1" />
      <!-- /Page Header -->

      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Basics</h5>
            </div>
            <div class="card-body">
              <custom-select
                :options="FormSelect"
                id="formselect"
                placeholder="Open this select menu"
              />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Sizing</h5>
            </div>
            <div class="card-body">
              <custom-select
                class="formselectone mb-3"
                :options="FormSelectOne"
                id="formselectone"
                placeholder="Open this select menu"
              />
              <custom-select
                :options="FormSelectTwo"
                id="formselecttwo"
                placeholder="Open this select menu"
              />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Multiple Select</h5>
            </div>
            <div class="card-body">
              <select class="form-select" multiple aria-label="multiple select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "Grid & Gutters",
      text: "Dashboard",
      text1: "Vertical Form",
      FormSelect: ["Open this select menu", "One", "Two", "Three"],
      FormSelectOne: ["Open this select menu", "One", "Two", "Three"],
      FormSelectTwo: ["Open this select menu", "One", "Two", "Three"],
    };
  },
};
</script>
