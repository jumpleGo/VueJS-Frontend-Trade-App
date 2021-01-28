<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>История</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Пара</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th>Ставка</th>
                <th>Конец сделки:</th>
              </tr>
            </thead>
            <tbody>
              <Deal 
                v-for="(deal, index) in deals"
                :key="`${deal.pair}-${deal.status}-${deal.amount}`"
                :index="index"
                :deal="deal" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Deal from './Deal'
export default {
  name: 'Table',
  components: {
    Deal
  },
  computed: {
    deals () {
      return this.$store.getters['deals/deals']
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('deals/GET_DEALS_BY_USERID', this.currentUser.id)
  },
}
</script>