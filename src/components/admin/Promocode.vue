<template>
  <tr class="user-row">
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ code.created_at | moment('LLL') }}</td>
    <td>{{ code.code }}</td>
    <td>{{ code.minDeposit }}</td>
    <td>{{ code.bonus }}{{ code.minDeposit ? '$' : '%' }}</td>
    <td>
      <span 
        class="badge badge-danger"
        @click="toggleStatus(code._id)">
        Деактивировать
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Promocode',
  props: {
    code: {
      type: Object,
      required: true
    },
    index: Number,
  },

  methods: {
    toggleStatus (id) {
      this.$store.dispatch('promocodes/DEACTIVATE_PROMOCODE', id)
    }
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