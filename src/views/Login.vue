<template>
  <div>
    <div id="main-wrapper">
      <div class="unix-login">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-lg-4">
                <div class="login-content card">
                  <div class="login-form">
                    <h4>Вход</h4>
                    <form @submit.prevent>
                      <div class="form-group">
                        <label>Email</label>
                        <input 
                          v-model="email" 
                          class="form-control" 
                          placeholder="Email">
                        <span v-if="!email" class="error--text">Обязательное поле</span>
                        <span v-if="email && $v.email.$invalid" class="error--text">Неверный тип почты</span>
                      </div>
                      <div class="form-group">
                        <label>Пароль</label>
                        <input 
                          v-model="password"
                          type="password" 
                          class="form-control" 
                          placeholder="Регистрация">
                          <span v-if="!password" class="error--text">Обязательное поле</span>
                          <span v-if="password && !$v.password.minLength" class="error--text">Минимальное количество символов 5</span>
                          <p><router-link to="reset">Забыли пароль?</router-link></p>
                      </div>
                      <button 
                        type="submit" 
                        :disabled="$v.$invalid"
                        class="btn btn-primary btn-flat m-b-30 m-t-30"
                        @click="onLogin">Войти</button>
                      <span v-if="error" class="error">{{ getErrorText(error.code) }}</span>
                      <div class="register-link m-t-15 text-center">
                        <p>Нет аккаунта?<router-link to="registration">Регистрация</router-link></p>
                      </div>
                    </form>
                  </div>
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
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapState('auth', {
      error: state => state.loginError
    })
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(5)
    }
  },
  beforeDestroy () {
    this.$store.commit('auth/SET_LOGIN_ERROR', null)
  },

  methods: {
    async onLogin() {      
      const { email, password } = this
      await this.$store.dispatch('auth/LOGIN', { email, password })
    },
    getErrorText (code) {
      switch (code) {
        case 'notFoundUser':
          return 'Пользователя с такой почтой еще нет.';
        case 'wrong_pass':
          return 'Неверный пароль';
      }
    },
  }
}
</script>
<style scoped>
  @import './../dashboard-assets/css/style.css';
</style>
<style lang="sass">
  .form-group
    label
      text-transform: capitalize
  .btn
    margin-bottom: 10px !important
  .error
    color: red
    font-size: 14px
  .error--text
    font-size: 12px
    color: red
</style>