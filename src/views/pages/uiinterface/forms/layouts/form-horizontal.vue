<template>
  <layout-header></layout-header>
  <layout-sidebar></layout-sidebar>
  <div class="page-wrapper cardhead">
    <div class="content container-fluid">
      <!-- Page Header -->
      <layout-breadcrumb :title="title" :text="text" :text1="text1" />
      <!-- /Page Header -->

      <div class="row">
        <div class="col-xl-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5 class="card-title">Basic Form</h5>
            </div>
            <div class="card-body">
              <form action="javascript:void(0);">
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">First Name</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Last Name</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Email Address</label>
                  <div class="col-lg-9">
                    <input type="email" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Username</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Password</label>
                  <div class="col-lg-9">
                    <input type="password" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Repeat Password</label>
                  <div class="col-lg-9">
                    <input type="password" class="form-control" />
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-xl-6 d-flex">
          <div class="card flex-fill">
            <div class="card-header">
              <h5 class="card-title">Address Form</h5>
            </div>
            <div class="card-body">
              <form action="javascript:void(0);">
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Address 1</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Address 2</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">City</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">State</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Country</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-lg-3 col-form-label">Postal Code</label>
                  <div class="col-lg-9">
                    <input type="text" class="form-control" />
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Two Column Horizontal Form</h5>
            </div>
            <div class="card-body">
              <h6 class="mb-3">Personal Information</h6>
              <form action="javascript:void(0);">
                <div class="row">
                  <div class="col-xl-6">
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">First Name</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Last Name</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Gender</label>
                      <div class="col-lg-9">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender_male"
                            value="option1"
                            checked
                          />
                          <label class="form-check-label" for="gender_male"> Male </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gender"
                            id="gender_female"
                            value="option2"
                          />
                          <label class="form-check-label" for="gender_female">
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Blood Group</label>
                      <div class="col-lg-9">
                        <custom-select
                          :options="FormBlood"
                          id="formblood"
                          placeholder="Select"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Username</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Email</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Password</label>
                      <div class="col-lg-9">
                        <input type="password" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Repeat Password</label>
                      <div class="col-lg-9">
                        <input type="password" class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <h6 class="mb-3">Address</h6>
                <div class="row">
                  <div class="col-xl-6">
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Address Line 1</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Address Line 2</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">State</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">City</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Country</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Postal Code</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Two Column Horizontal Form 2</h5>
            </div>
            <div class="card-body">
              <form action="javascript:void(0);">
                <div class="row">
                  <div class="col-xl-6">
                    <h6 class="mb-3">Personal Information</h6>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">First Name</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Last Name</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Password</label>
                      <div class="col-lg-9">
                        <input type="password" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">State</label>
                      <div class="col-lg-9">
                        <custom-select
                          :options="Formhorizontalstate"
                          id="formhorizontalstate"
                          placeholder="Select State"
                        />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">About</label>
                      <div class="col-lg-9">
                        <textarea
                          rows="4"
                          cols="5"
                          class="form-control"
                          placeholder="Enter message"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <h6 class="mb-3">Personal Details</h6>
                    <div class="row">
                      <label class="col-lg-3 col-form-label">Name</label>
                      <div class="col-lg-9">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <input
                                type="text"
                                placeholder="First Name"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <input
                                type="text"
                                placeholder="Last Name"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Email</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Phone</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-lg-3 col-form-label">Address</label>
                      <div class="col-lg-9">
                        <input type="text" class="form-control" />
                        <div class="row mt-4">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <custom-select
                                :options="Formhorizontalcountry"
                                id="formhorizontalcountry"
                                placeholder="Select Country"
                              />
                            </div>
                            <div class="mb-3">
                              <input
                                type="text"
                                placeholder="ZIP code"
                                class="form-control"
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <input
                                type="text"
                                placeholder="State/Province"
                                class="form-control"
                              />
                            </div>
                            <div class="mb-3">
                              <input
                                type="text"
                                placeholder="City"
                                class="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-end">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header justify-content-between">
              <div class="card-title">Horizontal form With Icons</div>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3">
                  <label for="inputEmail1" class="col-sm-2 col-form-label">Email</label>
                  <div class="col-sm-10">
                    <div class="input-group">
                      <input type="email" class="form-control" id="inputEmail1" />
                      <div class="input-group-text">
                        <vue-feather type="mail"></vue-feather>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputPassword1" class="col-sm-2 col-form-label"
                    >Password</label
                  >
                  <div class="col-sm-10">
                    <div class="input-group">
                      <input type="password" class="form-control" id="inputPassword1" />
                      <div class="input-group-text">
                        <vue-feather type="lock"></vue-feather>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" class="btn btn-primary">Sign in</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card">
            <div class="card-header justify-content-between">
              <div class="card-title">Horizontal form label sizing</div>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <label
                  for="colFormLabelSm"
                  class="col-sm-2 col-form-label col-form-label-sm"
                  >Email</label
                >
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control form-control-sm"
                    id="colFormLabelSm"
                    placeholder="col-form-label-sm"
                  />
                </div>
              </div>
              <div class="row mb-3">
                <label for="colFormLabel" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control"
                    id="colFormLabel"
                    placeholder="col-form-label"
                  />
                </div>
              </div>
              <div class="row">
                <label
                  for="colFormLabelLg"
                  class="col-sm-2 col-form-label col-form-label-lg"
                  >Email</label
                >
                <div class="col-sm-10">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    id="colFormLabelLg"
                    placeholder="col-form-label-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header justify-content-between">
              <div class="card-title">Auto sizing</div>
            </div>
            <div class="card-body">
              <form class="row gy-2 gx-3 align-items-center mb-4">
                <div class="col-auto">
                  <label class="visually-hidden" for="autoSizingInput">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="autoSizingInput"
                    placeholder="Jane Doe"
                  />
                </div>
                <div class="col-auto">
                  <label class="visually-hidden" for="autoSizingInputGroup"
                    >Username</label
                  >
                  <div class="input-group">
                    <div class="input-group-text">@</div>
                    <input
                      type="text"
                      class="form-control"
                      id="autoSizingInputGroup"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div class="col-auto">
                  <label class="visually-hidden" for="autoSizingSelect">Preference</label>
                  <custom-select :options="Formchoose" placeholder="Choose..." />
                </div>
                <div class="col-auto">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="autoSizingCheck"
                    />
                    <label class="form-check-label" for="autoSizingCheck">
                      Remember me
                    </label>
                  </div>
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
              <span class="fw-semibold mb-1 text-muted"
                >You can then remix that once again with size-specific column
                classes.</span
              >
              <form class="row gx-3 gy-2 align-items-center mt-0">
                <div class="col-sm-3">
                  <label class="visually-hidden" for="specificSizeInputName">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="specificSizeInputName"
                    placeholder="Jane Doe"
                  />
                </div>
                <div class="col-sm-3">
                  <label class="visually-hidden" for="specificSizeInputGroupUsername"
                    >Username</label
                  >
                  <div class="input-group">
                    <div class="input-group-text">@</div>
                    <input
                      type="text"
                      class="form-control"
                      id="specificSizeInputGroupUsername"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div class="col-sm-3">
                  <label class="visually-hidden" for="specificSizeSelect"
                    >Preference</label
                  >
                  <custom-select
                    :options="Formchooseone"
                    id="specificSizeSelect"
                    placeholder="Choose..."
                  />
                </div>
                <div class="col-auto">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="autoSizingCheck2"
                    />
                    <label class="form-check-label" for="autoSizingCheck2">
                      Remember me
                    </label>
                  </div>
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
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
      title: "Horizontal Form",
      text: "Dashboard",
      text1: "Horizontal Form",
      FormBlood: ["Select", "A+", "O+", "B+", "AB+"],
      Formhorizontalstate: ["Select State", "California", "Texas", "Florida"],
      Formhorizontalcountry: ["Select Country", "USA", "France", "India", "Spain"],
      Formchoose: ["Choose", "One", "Two", "Three"],
      Formchooseone: ["Choose", "One", "Two", "Three"],
    };
  },
};
</script>
