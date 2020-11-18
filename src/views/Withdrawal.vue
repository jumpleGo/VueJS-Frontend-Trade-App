<template>
  <div id="main-wrapper">
    <base-header />
    <div class="row">
      <router-link 
        class="col-lg-2 to-trade" 
        to="dashboard">
        {{ toTrade }}
      </router-link>
      <div class="col-lg-6 offset-1">
        <div class="card">
          <div class="card-title">
            <h4>Вывод средств</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form @submit.prevent>
                <div class="form-group">
                  <label>Сумма $</label>
                  <input 
                    v-model="amount"
                    class="form-control" 
                    placeholder="Сумма">
                </div>
                <div class="form-group">
                  <label>Номер карты</label>
                  <input 
                    v-model="card"
                    type="tel" 
                    inputmode="numeric" 
                    pattern="[0-9\s]{13,19}" 
                    autocomplete="cc-number" 
                    maxlength="16" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    class="form-control">
                </div>
                <button 
                  type="submit" 
                  class="btn btn-default"
                  @click="createRequest">
                  Создать заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <withdrawal-table />
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import WithdrawalTable from '@/components/Table/WithdrawalTable'
export default {
  name: 'Withdrawal',
  components: {
    BaseHeader,
    WithdrawalTable
  },
  data: () => ({
    card: null,
    amount: null
  }),

  computed: {
    toTrade () {
      return '< Трейдить'
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },

  methods: {
    createRequest () {
      this.$store.dispatch('withdrawal/CREATE_REQUEST', {
        card: this.card,
        amount: this.amount,
        userId: this.currentUser.id,
        date: new Date(),
        status: 'NEW'
      })
    }
  }
}
</script>
<style lang="sass">
.to-trade
  margin-top: 10px
  padding-left: 55px
  &:hover
    text-decoration: unset
      
</style>