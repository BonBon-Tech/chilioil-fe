<template>
  <div>
    <div class="modal fade" id="add-units">
      <div class="modal-dialog modal-dialog-centered custom-modal-two">
        <div class="modal-content">
          <div class="page-wrapper-new p-0">
            <div class="content">
              <div class="modal-header border-0 custom-modal-header">
                <div class="page-title">
                  <h4>Add Expense</h4>
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
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Expense Category</label>
                        <select
                          class="form-control"
                          v-model="form.expense_category_id"
                          required
                        >
                          <option value="" disabled>Select Category</option>
                          <option
                            v-for="cat in expense_categories"
                            :key="cat.id"
                            :value="cat.id"
                          >
                            {{ cat.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="input-blocks date-group">
                        <div class="input-groupicon">
                          <input
                            type="date"
                            class="form-control"
                            v-model="form.date"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Amount</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="form.amount"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Reference</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.reference"
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea
                          class="form-control"
                          v-model="form.description"
                          maxlength="600"
                        ></textarea>
                        <p>Maximum 600 Characters</p>
                      </div>
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
                      :data-bs-dismiss="!expenseError ? 'modal' : null"
                    >Submit</button>
                  </div>
                  <div v-if="expenseError" class="text-danger mt-2">{{ expenseError }}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="edit-units">
      <div class="modal-dialog modal-dialog-centered custom-modal-two">
        <div class="modal-content">
          <div class="page-wrapper-new p-0">
            <div class="content">
              <div class="modal-header border-0 custom-modal-header">
                <div class="page-title">
                  <h4>Edit Expense</h4>
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
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Expense Category</label>
                        <select
                          class="form-control"
                          v-model="editForm.expense_category_id"
                          required
                        >
                          <option value="" disabled>Select Category</option>
                          <option
                            v-for="cat in expense_categories"
                            :key="cat.id"
                            :value="cat.id"
                          >
                            {{ cat.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="input-blocks date-group">
                        <div class="input-groupicon">
                          <input
                            type="date"
                            class="form-control"
                            v-model="editForm.date"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Amount</label>
                        <input
                          type="number"
                          class="form-control"
                          v-model="editForm.amount"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label class="form-label">Reference</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="editForm.reference"
                        />
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea
                          class="form-control"
                          v-model="editForm.description"
                          maxlength="600"
                        ></textarea>
                        <p>Maximum 600 Characters</p>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer-btn">
                    <button
                      type="button"
                      class="btn btn-cancel me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="btn btn-submit"
                      :data-bs-dismiss="!expenseError ? 'modal' : null"
                    >
                      Save Changes
                    </button>
                  </div>
                  <div v-if="expenseError" class="text-danger mt-2">{{ expenseError }}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
const currentDate = ref(new Date());
const currentDateOne = ref(new Date());
export default {
  data() {
    return {
      startdate: currentDate,
      startdateOne: currentDateOne,
      dateFormat: "dd-MM-yyyy",
      ChooseExpense: ["Choose", "Foods & Snacks", "Emplyee Benefits"],
      ChooseExpenseOne: ["Employee Benefits", "Foods & Snacks", "Emplyee Benefits"],
      form: {
        expense_category_id: "",
        date: "",
        amount: "",
        reference: "",
        description: "",
      },
      editForm: {
        id: null,
        expense_category_id: "",
        date: "",
        amount: "",
        reference: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapGetters("expenseCategory", ["expense_categories"]),
    ...mapGetters("expense", ["expenseError", "expenseDetail"]),
  },
  methods: {
    ...mapActions("expense", [
      "createExpense",
      "clearError",
      "fetchExpenseDetail",
      "updateExpense",
    ]),
    ...mapActions("expenseCategory", ["fetchCategories"]),
    async handleCreate() {
      await this.createExpense(this.form);
      setTimeout(() => {
        if (!this.expenseError) {
          this.form = {
            expense_category_id: "",
            date: "",
            amount: "",
            reference: "",
            description: "",
          };
          this.$emit("refresh");
        }
      }, 0);
    },
    async openEditModal(id) {
      await this.fetchExpenseDetail(id);
      if (this.expenseDetail) {
        this.editForm.id = this.expenseDetail.id;
        this.editForm.expense_category_id = this.expenseDetail.expense_category_id;
        this.editForm.date = this.expenseDetail.date ? this.expenseDetail.date.substring(0, 10) : "";
        this.editForm.amount = this.expenseDetail.amount;
        this.editForm.reference = this.expenseDetail.reference;
        this.editForm.description = this.expenseDetail.description;
      }
    },
    async handleUpdate() {
      await this.updateExpense({
        id: this.editForm.id,
        payload: {
          expense_category_id: this.editForm.expense_category_id,
          date: this.editForm.date,
          amount: this.editForm.amount,
          reference: this.editForm.reference,
          description: this.editForm.description,
        },
      });
      setTimeout(() => {
        if (!this.expenseError) {
          this.$emit("refresh");
        }
      }, 0);
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
