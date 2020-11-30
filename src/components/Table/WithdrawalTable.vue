<template>
  <div class="row">
    <div class="col-lg-6 offset-3">
      <div class="card">
        <div class="card-title">
          <h4>История заявок</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Статус</th>
                  <th>Дата</th>
                  <th>Тип</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                <Withdrawal 
                  v-for="(w, index) in withdrawals"
                  :key="`${w.id}-${index}`"
                  :index="index"
                  :w="w" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Withdrawal from './Withdrawal'
export default {
  name: 'WithdrawalTable',
  components: {
    Withdrawal
  },
  computed: {
    withdrawals () {
      return this.$store.getters['withdrawal/withdrawals']
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('withdrawal/GET_WITHDRAWALS_BY_USERID', this.currentUser.id)
  },
}
</script>