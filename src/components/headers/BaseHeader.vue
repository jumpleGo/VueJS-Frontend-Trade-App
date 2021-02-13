<template>
  <div class="header container-fluid">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <div class="navbar-header">
        <div class="b-header__logo" style="margin-left: 40px">
          <a href="#scroll-to-top">
            <img src="data:image/png;base64,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" alt="logo"> 
            <div>
              <p>Corex</p> 
              <p>Brokers</p>
            </div>
          </a>
        </div>
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
                <router-link to="merchant" tag="li"><span>Пополнить баланс</span></router-link>
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
@media (max-width: 374px)
.b-header__logo 
  display: block
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