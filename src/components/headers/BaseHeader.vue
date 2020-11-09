<template>
  <div class="header">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <div class="navbar-header">
        <span class="navbar-brand">
          Traiding BTC APP
        </span>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav col-sm-12">
          <li class="nav-item dropdown col-sm-1 offset-sm-11">
            <span 
              class="nav-link dropdown-toggle text-muted"
              @click="toggleProfileModal">
              <i class="fa fa-user"/>
            </span>
            <div 
              v-if="profileModal"
              class="profile-modal">
              <ul class="dropdown-user">
                <li :class="[currentUser.isVerified ? '--verified' : '--no-verified']">
                  <span>
                    {{ isVerified }}
                  </span>
                </li>                                  
                <li 
                  v-if="currentUser && currentUser.email">
                  <span>
                    {{ currentUser.email }}
                    </span>
                  </li>
                <li><span>Баланс: {{ currentUser.balance }}$</span></li>
                <li><span>Пополнть баланс</span></li>
                <li><span>Вывод средств</span></li>
                <li role="separator" class="divider"></li>
                <li><span class="--red" @click="logout">Выход</span></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BaseHeader',
  data: () => ({
    profileModal: false
  }),
  computed: {
    ...mapState('auth', {
      currentUser: state => state.currentUser,
    }),
    isVerified () {
      return this.currentUser.isVerified ? 'Верифицирован' : 'Не верифицирован'
    }
  },
  methods: {
    toggleProfileModal() {
      this.profileModal = !this.profileModal
    },
    logout() {
      this.$store.dispatch('auth/LOGOUT')
    }
  },
}
</script>
<style lang="sass" scoped>
.divider
  margin: 0 !important
.profile-modal
  font-size: 15px
  position: absolute
  width: 200px
  right: 10px 
  background: white 
  box-shadow: 3px 2px 8px -1px rgba(0,0,0,0.46)
  ul > li:not(.divider)
    &:hover:not(.--verified)
      cursor: pointer
    padding: 8px
.--verified
  color: white
  background: green
.--no-verified
  color: white
  background: red
</style>