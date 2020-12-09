<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Заявки на вывод</h4>
      </div>
      <div class="sub-header">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Поиск"
          class="input">
        <span 
          v-if="!archived"
          class="archive"
          @click="archived = true">
          Архив
        </span>
        <span 
          v-else
          class="archive"
           @click="archived = false">
          Назад
        </span>
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
  data: () => ({
    search: '',
    archived: false
  }),
  computed: {
    withdrawals () {
     if (this.archived) {
       if (this.search) {
         return this.$store.getters['admin/archivedWithdrawals']
          .filter(w => w.userObject.email.includes(this.search))
       } else {
          return this.$store.getters['admin/archivedWithdrawals']
       }
     } else {
       if (this.search) {
         return this.$store.getters['admin/withdrawals']
          .filter(w => w.userObject.email.includes(this.search))
       } else {
          return this.$store.getters['admin/withdrawals']
       }
     }
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
<style lang="sass" scoped>
.sub-header
  display: flex
  align-items: center
  justify-content: space-between
.input
  padding: 0 10px
  width: 30%
.archive
  &:hover
    cursor: pointer
  color: blue
</style>