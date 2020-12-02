<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Заявки на вывод</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <withdrawal 
                v-for="(w, index) in withdrawals"
                :key="`${w._id}-${index}`"
                :index="index"
                :w="w" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Withdrawal from './Withdrawal.vue'
export default {
  name: 'WithdrawalsTable',
  components: {
    Withdrawal
  },
  computed: {
    withdrawals () {
      return this.$store.state.admin.withdrawals
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('admin/GET_WITHDRAWALS')
  },
}
</script>