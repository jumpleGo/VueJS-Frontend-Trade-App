<template>
  <div>
    <div class="unix-login">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div class="login-content card">
              <div class="login-form">
                <h4>Регистрация</h4>
                <form @submit.prevent>
                    <div class="form-group">
                      <label>Имя</label>
                      <input v-model="name" type="text" class="form-control" placeholder="Имя">
                      <span v-if="$v.name.$invalid" class="error--text">Обязательное поле</span>
                    </div>
                    <div class="form-group">
                      <label>Email</label>
                      <input v-model="email" type="email" class="form-control" placeholder="Email">
                      <span v-if="!email" class="error--text">Обязательное поле</span>
                      <span v-if="email && $v.email.$invalid" class="error--text">Неверный тип почты</span>
                    </div>
                    <div class="form-group">
                      <label>Пароль</label>
                      <input v-model="password" type="password" class="form-control" placeholder="Пароль">
                      <span v-if="!password" class="error--text">Обязательное поле</span>
                      <span v-if="password && !$v.password.minLength" class="error--text">Минимальное количество символов 5</span>
                    </div>
                    <span class="error--text" v-if="error">Пользователь с таким Email уже Зарегистрирован</span>
                    <button 
                      :disabled="$v.$invalid"
                      class="btn btn-primary btn-flat m-b-30 m-t-30"
                      @click="submit">Зарегистрироваться</button>
                    <div class="register-link m-t-15 text-center">
                      <p>Уже есть аккаунт ? <router-link to="login">Войти</router-link></p>
                    </div>
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
import { mapState } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Registration',
  data: () => ({
    email: '',
    password: '',
    name: ''
  }),

  computed: {
    ...mapState('auth', {
      error: state => state.registrationError
    })
  },
  validations: {
    email: {
      required,
      email
    },
    name: {
      required
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },

  beforeDestroy () {
    this.$store.commit('auth/SET_REGISTER_ERROR', null)
  },

  methods: {
    submit() {
      const { email, name, password } = this
      const { ref } = this.$route.query
      this.$store.dispatch('auth/REGISTER', { email, name, password, ref })
    },
  },
}
</script>
<style scoped>
  @import './../dashboard-assets/css/style.css';
</style>

<style lang="sass" scoped>
  .error--text
    font-size: 12px
    color: red
</style>