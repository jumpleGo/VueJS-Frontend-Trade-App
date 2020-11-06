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
                      <tr>
                        <td class="pair">BTCUSDT</td>
                        <td><span class="percent">1.8</span></td>
                      </tr>
                      <tr>
                        <td class="pair">LTCUSDT</td>
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
  name: 'BaseLeftSidebar'
}
</script>

<style lang="sass" scoped>
tbody > tr:hover
  cursor: pointer
  background: rgba(0,0,0, 0.03)
.pair
  font-weight: 600
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