<template>
  <div class="account-page">
    <div class="account-content">
      <div class="login-wrapper">
        <div class="login-content">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
            <div class="login-userset">
              <div class="login-logo logo-normal">
                <img src="@/assets/img/logo-main.png" alt="img" />
              </div>
              <router-link to="/dashboard" class="login-logo logo-white">
                <img src="@/assets/img/logo-main.png" alt="" />
              </router-link>
              <div class="login-userheading">
                <h3>Sign In</h3>
                <h4>Access the application panel using your email and passcode.</h4>
              </div>
              <div class="form-login">
                <label>Email Address</label>
                <div class="form-addons">
                  <Field
                    name="email"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email || fieldErrors.email }"
                  />
                  <div class="invalid-feedback">{{ errors.email || fieldErrors.email }}</div>
                  <img src="@/assets/img/icons/mail.svg" alt="img" />
                </div>
              </div>
              <div class="form-login">
                <label>Password</label>
                <div class="pass-group">
                  <Field
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control pass-input mt-2"
                    :class="{ 'is-invalid': errors.password || fieldErrors.password }"
                  />
                  <span @click="toggleShow" class="toggle-password">
                    <i
                      :class="{
                        'fas fa-eye': showPassword,
                        'fas fa-eye-slash': !showPassword,
                      }"
                    ></i>
                  </span>
                  <div class="invalid-feedback">{{ errors.password || fieldErrors.password }}</div>
                </div>
              </div>
              <div v-if="generalError" class="text-danger mb-2">{{ generalError }}</div>
              <div class="form-login authentication-check">
                <div class="row">
                  <div class="col-6">
                    <div class="custom-control custom-checkbox">
                      <label class="checkboxs ps-4 mb-0 pb-0 line-height-1">
                        <input type="checkbox" />
                        <span class="checkmarks"></span>Remember me
                      </label>
                    </div>
                  </div>
                  <div class="col-6 text-end">
<!--                    <router-link class="forgot-link" to="/forgot-password"-->
<!--                      >Forgot Password?</router-link-->
<!--                    >-->
                  </div>
                </div>
              </div>
              <div class="form-login">
                <button type="submit" class="btn btn-login">Sign In</button>
              </div>
<!--              <div class="signinform">-->
<!--                <h4>-->
<!--                  New on our platform?<router-link to="/register-2" class="hover-a">-->
<!--                    Create an account</router-link-->
<!--                  >-->
<!--                </h4>-->
<!--              </div>-->
<!--              <div class="form-setlogin or-text">-->
<!--                <h4>OR</h4>-->
<!--              </div>-->
<!--              <div class="form-sociallink">-->
<!--                <ul class="d-flex">-->
<!--                  <li>-->
<!--                    <a href="javascript:void(0);" class="facebook-logo">-->
<!--                      <img src="@/assets/img/icons/facebook-logo.svg" alt="Facebook" />-->
<!--                    </a>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <a href="javascript:void(0);">-->
<!--                      <img src="@/assets/img/icons/google.png" alt="Google" />-->
<!--                    </a>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <a href="javascript:void(0);" class="apple-logo">-->
<!--                      <img src="@/assets/img/icons/apple-logo.svg" alt="Apple" />-->
<!--                    </a>-->
<!--                  </li>-->
<!--                </ul>-->
<!--                <div-->
<!--                  class="my-4 d-flex justify-content-center align-items-center copyright-text"-->
<!--                >-->
<!--                  <p>Copyright &copy; {{ new Date().getFullYear() }} DreamsPOS. All rights reserved</p>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </Form>
        </div>
        <div class="login-img">
          <img src="@/assets/img/authentication/login02.png" alt="img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import store from "@/store";
import { useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  components: {
    Form,
    Field,
  },
  setup() {
    const router = useRouter();
    const showPassword = ref(false);
    const generalError = ref("");
    const fieldErrors = ref({});
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
    const toggleShow = () => {
      showPassword.value = !showPassword.value;
    };
    const onSubmit = async (values) => {
      generalError.value = "";
      fieldErrors.value = {};
      try {
        const res = await store.dispatch("auth/login", {
          email: values.email,
          password: values.password,
        });
        if (res.data && res.data.data && res.data.data.token) {
          const user = res.data.data.user;
          const roleName = user?.role?.name;
          if (roleName === "admin") {
            router.push("/dashboard");
          } else if (roleName === "staff") {
            router.push("/sales/pos");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (err) {
        generalError.value = err.message || "Login failed";
        fieldErrors.value = {};
        if (err.fields) {
          Object.keys(err.fields).forEach(key => {
            fieldErrors.value[key] = Array.isArray(err.fields[key]) ? err.fields[key][0] : err.fields[key];
          });
        }
      }
    };
    return {
      schema,
      onSubmit,
      generalError,
      fieldErrors,
      showPassword,
      toggleShow,
      checked: ref(false),
    };
  },
};
</script>
