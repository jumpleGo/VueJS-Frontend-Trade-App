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
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(deal, index) in deals"
                :key="`${deal.pair}-${index}`">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ deal.pair }}</td>
                <td><span class="badge badge-success">{{ deal.status }}</span></td>
                <td>{{ formateDate(deal.startDate) }}</td>
                <td class="color-primary">$ {{ deal.amount }}</td>
                <td class="color-primary">{{ checkTrend(deal.trend) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Table',
  computed: {
    deals () {
      return this.$store.state.deals.deals
    },
  },
  methods: {
    checkTrend (trend) {
      return trend === 'low' ? 'Ниже' : 'Выше'
    },
    formateDate (date) {
      return moment(date).format('LTS')
    }
  }
}
</script>