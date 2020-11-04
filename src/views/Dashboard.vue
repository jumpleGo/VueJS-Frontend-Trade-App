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
        <!-- End header header -->
        <!-- Left Sidebar  -->
        <div class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebar-menu">
                        <li class="nav-devider"></li>
                        <li class="nav-label">Home</li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="ti-wallet m-r-5"></i><span class="hide-menu">Widgets</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="widget.html">Widgets</a></li>
                            </ul>
                        </li>
                        <li class="nav-label">EXTRA</li>
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>
        <!-- End Left Sidebar  -->
        <!-- Page wrapper  -->
        <div class="page-wrapper">
          <div class="container-fluid">
              <!-- Start Page Content -->
              <div class="row">
                  <div class="col-12">
                      <div class="card chart">
                        <base-traiding />
                      </div>
                  </div>
              </div>
              <!-- End PAge Content -->
              <div class="left-sidebar --right">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebar-menu">
                        <div class="form-actions pb-0 m-l-15 m-r-15">
                        <button type="submit" class="btn round btn-success btn-block btn-glow"> Buy BTC </button>
                    </div>
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>
          </div>
          <!-- End Container fluid  -->
          <!-- footer -->
          <footer class="footer"> © 2018 CoinDash All Right Reserved.</footer>
          <!-- End footer -->
        </div>
        
        <!-- End Page wrapper  -->
    </div>
</template>
<script>
import BaseTraiding from '@/components/BaseTraiding'
import { mapState } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    BaseTraiding
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
  max-width: 800px
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