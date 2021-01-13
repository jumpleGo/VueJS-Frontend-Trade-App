<template>
  <div class="row">
    <div class="col-lg-6 offset-3">
      <div class="card">
        <div class="card-title">
          <h4>История пополнений</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Дата</th>
                  <th>Промокод</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                <Deposit 
                  v-for="(d, index) in deposits"
                  :key="`${d._id}-${index}`"
                  :index="index"
                  :d="d" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Deposit from './Deposit'
export default {
  name: 'DepositTable',
  components: {
    Deposit
  },
  computed: {
    deposits () {
      return this.$store.getters['deposit/deposits']
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('deposit/GET_DEPOSITS_BY_USERID', this.currentUser.id)
  },
}
</script>