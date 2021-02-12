<template>
  <div class="header container-fluid">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <div class="navbar-header">
        <span class="navbar-brand">
          Traiding BTC APP
        </span>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav col-sm-3 col-md-12">
          <li class="nav-item dropdown col-sm-1 offset-sm-11">
            <span 
              class="user-icon nav-link dropdown-toggle text-muted"
              @click="toggleProfileModal">
              <i class="fa fa-user"/>
            </span>
            <div 
              v-if="profileModal"
              v-click-outside="toggleProfileModal"
              class="profile-modal">
              <ul class="dropdown-user">
                <li 
                  :class="[currentUser.isVerified ? '--verified' : '--no-verified']"
                  @click="openVerify">
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
                <li v-if="!currentUser.balance">
                  <span>Демо Счет: {{ currentUser.demoBalance.toFixed(2) }}$</span>
                  <span 
                    v-if="currentUser.demoBalance < 10" 
                    @click="$store.dispatch('user/UPDATE_USER_BALANCE', {amount: 1000, type: 'plus', mode: 'demoBalance'})"
                    style="color: blue">
                    Добавить
                  </span>
                </li>
                <li v-else><span>Баланс: {{ currentUser.balance.toFixed(3) }}$</span></li>
                <router-link to="merchant" tag="li"><span>Пополнть баланс</span></router-link>
                <router-link 
                  v-if="MODE_BALANCE === 'balance'"
                  to="withdrawal" 
                  tag="li">
                  <span>
                    Вывод средств
                  </span>
                </router-link>
                <router-link to="referral" tag="li"><span>Реферальная программа</span></router-link>
                <router-link v-if="currentUser.isAdmin" to="admin" tag="li">
                  <img 
                    style="width: 20px; margin-right: 10px"
                    src="/images/icons/settings.svg" alt="">
                  <span>Админ панель</span>
                </router-link>
                <li role="separator" class="divider"></li>
                <li @click="logout"><span class="--red">Выход</span></li>
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
    ...mapState('user', {
      currentUser: state => state.currentUser,
    }),
    MODE_BALANCE () {
      return this.$store.getters['user/MODE_BALANCE']
    },
    isVerified () {
      return this.currentUser.isVerified ? 'Верифицирован' : 'Не верифицирован'
    }
  },
  methods: {
    openVerify () {
      if (!this.currentUser.isVerified) {
        this.$router.push('/verify')
      }
    },
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
.header
  padding: 0 !important
.navbar-collapse
  border-top: unset
  padding-top: unset
.header .top-navbar
  padding: 0
.user-icon
  padding-left: unset !important
  padding-right: unset !important
  line-height: unset !important
  border-radius: 50%
  border: 2px solid black
  display: flex
  justify-content: center
  align-items: center
  height: 30px
  width: 30px
  &:hover
    cursor: pointer
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
    &:hover:not(:first-child)
      background: rgba(0,0,0, 0.03)
    &:hover
      cursor: pointer
    padding: 8px
.--verified
  color: white
  background: green
.--no-verified
  color: white
  background: red
@media screen and (max-width: 700px)
  .header .top-navbar
    padding: 0
  .header .top-navbar .navbar-nav>.nav-item>.nav-link
    margin-left: auto
  .navbar-collapse
    border-top: unset
    padding-top: unset
</style>