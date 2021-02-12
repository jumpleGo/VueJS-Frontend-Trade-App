<template>
  <tr class="user-row">
    <th scope="row">#{{ deposit.orderId }}</th>
    <td>{{ deposit.created_at | moment('LLL') }}</td>
    <td>{{ deposit.amount }}$</td>
    <td>{{ deposit.type }} {{ deposit.cryptoAmount.toFixed(4) }}</td>
    <td>{{ deposit.promocode }}</td>
    <td v-if="deposit.userData">{{ deposit.userData.email }}</td>
  </tr>
</template>

<script>
export default {
  name: 'Deposit',
  props: {
    deposit: {
      type: Object,
      required: true
    },
    index: Number,
  },

  data: () => ({
    showDepositList: false
  }),

  mounted () {
 
  },

  methods: {

  }
}
</script>

<style lang="sass" scoped>
  .user-row
    position: relative
  .deposit-list
    background: white
    box-shadow: 3px 2px 8px -1px rgba(0, 0, 0, 0.46)
    position: absolute
    right: 5%
    z-index: 1000
  .link
    text-align: right
    color: blue
    &:hover
      cursor: pointer
  .badge
    &:hover
      cursor: pointer
</style>