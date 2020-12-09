<template>
  <div v-if="settings" class="settings">
    <div class="card">
      Минимальная сумма вывода $
      <input 
        v-model="settings.minAmount"
        type="number" 
        min="1"
        @blur="setNewSettings({minAmount: +settings.minAmount})">
    </div>
    <div class="card">
      Минимальная сумма ввода $
      <input 
        v-model="settings.minAmountUpBalance"
        type="number" 
        min="1"
        @blur="setNewSettings({minAmountUpBalance: +settings.minAmountUpBalance})">
    </div>
    <div class="card">
      Минимальная сумма депозитов для вывода $
      <input 
        v-model="settings.allDepositsAmount"
        type="number" 
        min="1"
        @blur="setNewSettings({allDepositsAmount: +settings.allDepositsAmount})">
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
      return this.$store.state.admin.settings[0]
    }
  },

  mounted () {
    this.$store.dispatch('admin/GET_PLATFORM_SETTINGS')
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