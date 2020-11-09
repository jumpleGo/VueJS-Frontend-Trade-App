<template>
  <div class="left-sidebar">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <div>
          <div>
            <div class="card-body">
              <div class="trade-history-table">
                <div class="table-responsive">
                  <table class="table table-xs">
                    <thead>
                      <tr>
                        <th>Пара</th>
                        <th>Коэф</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        v-for="pair in allPairs"
                        :key="pair._id"
                        :class="{'active' : currentPair.id === pair.id}"
                        @click="$store.commit('trade/SET_PAIR', pair)">
                        <td class="pair">{{ pair.id }}</td>
                        <td><span class="percent">1.8</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLeftSidebar',
  computed: {
    allPairs () {
      return this.$store.state.trade.allPairs
    },
    currentPair () {
      return this.$store.state.trade.pair
    }
  },
  mounted () {
    this.$store.dispatch('trade/GET_PAIRS')
  }
}
</script>

<style lang="sass" scoped>
.active 
  cursor: pointer
  background: rgba(0,0,0, 0.03)
tbody > tr:hover
  cursor: pointer
  background: rgba(0,0,0, 0.03)

tbody tr td 
  padding: 5px 10px
.pair
  font-weight: 400
  font-size: 14px
  color: black
.percent
  padding: 2px 5px
  color: #ffffff
  background-color: #e8103c
  box-shadow: 0 4px 12px rgba(241, 48, 87, 0.3)
  border-radius: 3px
.card-body
  padding: 0px !important
  
</style>