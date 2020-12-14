<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="promocode__create-block">
        <span>Промокоды на X сумму к депозиту при пополнении от определенной суммы</span>
        <span>Бонус $</span>
        <input v-model="deposit.bonus" type="number" placeholder="Бонус $">
        <span>Количество промокодов</span>
        <input v-model="deposit.count" type="number" placeholder="Количество">
        <span>Минимальная сумма пополнения</span>
        <input v-model="deposit.minDeposit" type="number" placeholder="Минимальная сумма пополнения">
        <button @click="createPromocodes('deposit')">Создать</button>
      </div>
    </div>
    <div class="card">
      <div class="card-title">
        <h4>Промокоды</h4>
      </div>
      <input 
        v-model="search" 
        type="text" 
        placeholder="Поиск"
        class="input">
      <div v-if="!search" class="filter">
        <div v-for="f in filters" :key="f">
          <input  
            v-model="filter"
            :id="f" 
            type="radio"
            :value="f">
            <label :for="f">
              {{ wordByFilter(f) }}
            </label>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <td>Индекс</td>
                <td><b>Дата создания</b></td>
                <td><b>Код</b></td>
                <td><b>Мин. депозит</b></td>
              </tr>
            </thead>
            <tbody>
              <Promocode 
                v-for="(code, index) in promocodes"
                :key="`${code._id}-${index}`"
                :index="index"
                :code="code" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Promocode from './Promocode'

export default {
  name: 'PromocodesTable',
  data: () => ({
    search: '',
    deposit: {
      count: 1,
      minDeposit: 100,
      bonus: 10
    },
    filter: 'all',
    filters: ['all', 'active', 'inactive']
  }),
  components: {
    Promocode
  },
  watch: {
    search (value) {
      if (value) {
        this.filter = 'all'
      }
    }
  },
  computed: {
    promocodes () {
      if (this.search) {
        return this.$store.state.promocodes.promocodes.filter(p => p.code.includes(this.search))
      }else if (this.filter === 'active') {
        return this.$store.state.promocodes.promocodes.filter(p => p.isActive)
      }else if (this.filter === 'inactive') {
        return this.$store.state.promocodes.promocodes.filter(p => !p.isActive)
      }else {
        return this.$store.state.promocodes.promocodes
      }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('promocodes/GET_PROMOCODES')
  },
  methods: {
    wordByFilter (filter) {
      if (filter === 'active') return 'Активные'
      else if (filter === 'inactive') return 'Неактивные'
      else return 'Все'
    },

    createPromocodes (promoType) {
      this.$store.dispatch('promocodes/CREATE_PROMOCODE', this[promoType])
    }
  }
}
</script>
<style lang="sass" scoped>
.promocode__create-block
  display: flex
  flex-direction: column
  width: 30%
  span
    margin-top: 10px
    font-size: 12px
  input + input
    margin-top: 10px
  button
    margin-top: 10px
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