<template>
  <div id="main-wrapper">
        <!-- header header  -->
        <div class="header">
            <nav class="navbar top-navbar navbar-expand-md navbar-light">
                <!-- Logo -->
                <div class="navbar-header">
                    <span class="navbar-brand">
                        Traiding BTC APP
                    </span>
                </div>
                <!-- End Logo -->
                <div class="navbar-collapse">
                    <!-- User profile and search -->
                    <ul class="navbar-nav col-sm-12">
                        <!-- End Messages -->
                        <!-- Profile -->
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
                                  <li class="--verified"><span>Верифицирован</span></li>                                  
                                  <li v-if="currentUser && currentUser.email"><span>{{ currentUser.email }}</span></li>
                                  <li><span>Баланс: 100$</span></li>
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
        <base-left-sidebar />
        <div class="page-wrapper">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-12">
                      <div class="card chart">
                        <base-traiding />
                      </div>
                  </div>
                  <Table />
              </div>
            <base-right-sidebar />
          </div>
        </div>
    </div>
</template>
<script>
import Table from '@/components/Table/Table'
import BaseRightSidebar from '@/components/sidebars/BaseRightSidebar'
import BaseLeftSidebar from '@/components/sidebars/BaseLeftSidebar'
import BaseTraiding from '@/components/BaseTraiding'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    BaseTraiding,
    BaseRightSidebar,
    BaseLeftSidebar,
    Table
  },
  data: () => ({
    profileModal: false
  }),
  computed: {
    ...mapState('auth', {
      currentUser: state => state.currentUser,
    }),
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

<style scoped>
  @import './../dashboard-assets/css/style.css';
</style>
<style lang="sass" scoped>
.chart
  max-width: 1200px
.page-wrapper
  margin-right: 240px
.--right
  right: 0
.nav-link
  cursor: pointer
.--verified
  color: white
  background: green
.--red
  color: red
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
</style>