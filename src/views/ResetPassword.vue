<template>
  <div>
    <div class="unix-login">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <div class="login-content card">
              <div class="login-form">
                <h4>Восстановление пароля</h4>
                <form @submit.prevent>
                    <div class="form-group">
                      <label>Ваш Email</label>
                      <input 
                        v-model="email" 
                        type="email" 
                        class="form-control" 
                        placeholder="Email"
                        @focus="resetError">
                      <span v-if="!email" class="error--text">Обязательное поле</span>
                      <span v-if="email && $v.email.$invalid" class="error--text">Неверный тип почты</span>
                    </div>
                    <span class="error--text" v-if="error">Пользователя с таким Email еще нет</span>
                    <button 
                      :disabled="$v.$invalid"
                      class="btn btn-primary btn-flat m-b-30 m-t-30"
                      @click="submit">Сбросить пароль</button>
                    <div class="register-link m-t-15 text-center">
                      <router-link to="login">Назад</router-link>
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
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ResetPassword',
  data: () => ({
    email: ''
  }),

  computed: {
    ...mapState('auth', {
      error: state => state.resetError
    })
  },
  validations: {
    email: {
      required,
      email
    },
  },

  beforeDestroy () {
    this.resetError()
  },

  methods: {
    submit() {
      this.$store.dispatch('auth/RESET', {email: this.email})
    },
    resetError () {
      this.$store.commit('auth/SET_RESET_ERROR', null)
    }
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