<template>
  <div id="main-wrapper">
        <!-- header header  -->
        <base-header />
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
import BaseHeader from '@/components/headers/BaseHeader'
import BaseRightSidebar from '@/components/sidebars/BaseRightSidebar'
import BaseLeftSidebar from '@/components/sidebars/BaseLeftSidebar'
import BaseTraiding from '@/components/BaseTraiding'

export default {
  name: 'Dashboard',
  components: {
    BaseTraiding,
    BaseRightSidebar,
    BaseLeftSidebar,
    BaseHeader,
    Table
  },
  
  mounted () {
    this.$store.dispatch('auth/CHECK_AUTH')
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
.--red
  color: red

</style>