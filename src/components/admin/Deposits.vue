<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Депозиты</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <Deposit 
                v-for="(deposit, index) in deposits"
                :key="`${deposit._id}-${index}`"
                :index="index"
                :deposit="deposit" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Deposit from './Deposit'

export default {
  name: 'Deposits',
  data: () => ({

  }),
  components: {
    Deposit
  },
  watch: {

  },
  computed: {
    deposits () {
      return this.$store.getters['admin/deposits']
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('admin/GET_DEPOSITS')
    console.log(this.deposits)
  },
}
</script>
<style lang="sass" scoped>
.input
  padding: 0 10px
  width: 30%
.filter
  display: flex
  align-items: center
  label
    margin-bottom: 0
    margin: 0 10px 0px 5px
</style>