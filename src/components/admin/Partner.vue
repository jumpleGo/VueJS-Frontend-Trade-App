<template>
  <table class="table">
    <thead>
      <tr>
        <td></td>
        <td><b>Партнер</b></td>
        <td><b>Количество рефералов</b></td>
        <td><b>Процент начисления</b></td>
      </tr>
    </thead>
    <tbody>
      <tr class="user-row">
      <th scope="row">{{ index + 1 }}</th>
      <td>{{ partner.userObject.email }}</td>
      <td>{{ partner.referralCount }}</td>
      <td>
        <input v-model="partner.percent" type="number" @input="savePercent">
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Partner',
  props: {
    partner: {
      type: Object,
      required: true
    },
    index: Number,
  },

  methods: {
    savePercent () {
      
      this.$emit('save-percent', this.partner)
    },
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