<template>
  <div v-if="settings" class="settings">
    <div class="card">
      Минимальная сумма вывода $
      <input 
        v-model="settings.minAmountForWithdrawal"
        type="number" 
        min="1"
        @blur="setNewSettings({minAmountForWithdrawal: +settings.minAmountForWithdrawal})">
    </div>
    <div class="card">
      Минимальная сумма ввода $
      <input 
        v-model="settings.minAmountForUp"
        type="number" 
        min="1"
        @blur="setNewSettings({minAmountForUp: +settings.minAmountForUp})">
    </div>
    <div class="card">
      Минимальная сумма депозитов для вывода $
      <input 
        v-model="settings.allDepositsForWithdrawal"
        type="number" 
        min="1"
        @blur="setNewSettings({allDepositsForWithdrawal: +settings.allDepositsForWithdrawal})">
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlatformSettings',
  data: () => ({
    withd: 0
  }),

  computed: {
    settings () {
      return this.$store.state.settings.settings
    }
  },

  methods: {
    setNewSettings (value) {
      this.$store.dispatch('admin/SET_NEW_SETTINGS', {value, id: this.settings._id})
    }
  }
}
</script>

<style lang="sass" scoped>
.settings
  padding: 40px
  display: flex
.card
  width: 33%
  padding: 10px
  border: 1px solid #cecece
.card
  margin-left: 0.3%
  input
    margin-top: 30px
</style>