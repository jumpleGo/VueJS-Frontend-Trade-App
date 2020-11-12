<template>
  <div id="main-wrapper">
        <!-- header header  -->
        <base-header />
        <base-left-sidebar />
        <div class="page-wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <!--TODO: move to self component -->
                <div class="tools card">
                  <div class="options">
                    <button 
                      :class="[{'--active': chartType === 'line'}]"
                      @click="setChartType('line')">
                      <img class="icon" src="/images/icons/line-chart.svg" alt="">
                    </button>
                    <button 
                      :class="[{'--active': chartType === 'candle'}]"
                      @click="setChartType('candle')">
                      <img class="icon" src="/images/icons/bar-chart.svg" alt="">
                    </button>
                  </div>
                </div>
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

  computed: {
    chartType () {
      return this.$store.state.trade.chartType
    },
  },

  methods: {
    setChartType (type) {
      this.$store.dispatch('trade/SET_CHART_TYPE', type)
    }
  }
}
</script>

<style scoped>
  @import './../dashboard-assets/css/style.css';
</style>
<style lang="sass" scoped>
.tools
  padding: 10px
.options
  .--active
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.62)
  button
    &:active
      border: none
      outline: none !important
    &:focus
      outline: none !important
      border: none
    &:not(:first-child)
      margin-left: 10px
    padding: 3px
    background: white
    border: unset
.icon
  width: 30px
  height: 30px
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