<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ w.amount }}$</td>
    <td>
      <span 
        :class="[`badge badge-${colorStatus}`]">
        {{ statusWord(w.status)}}
      </span>
    </td>
    <td>
      <span @click="toggleStatus('REJECTED')">
        Отклонить
      </span>
    </td>
    <td>
      <span @click="toggleStatus('ACCEPTED')">
        Подтвердить
      </span>
    </td>
    <td>
      <span>
        Дата {{ w.date | moment('LLL') }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'User',
  props: {
    w: {
      type: Object,
      required: true
    },
    index: Number,
  },

  computed: {
    colorStatus () {
      let color
      if (this.w.status === 'NEW') {
        color = 'primary'
      } else if (this.w.status === 'ACCEPTED') {
        color = 'success'
      } else if (this.w.status === 'REJECTED') {
        color = 'danger'
      }
      return color
    },
  },
  mounted () {
 
  },

  methods: {
    toggleStatus (status) {
      this.$store.dispatch('admin/SET_NEW_STATUS', {
        id: this.w._id,
        index: this.index, 
        status
      })
    },
    
    statusWord (val) {
      if (val === 'NEW') {
        return  'Новая'
      } else if (val === 'ACCEPTED') {
        return  'Принята'
      } else if (val === 'REJECTED') {
        return  'Отклонена'
      }
    },
  }
}
</script>

<style lang="sass" scoped>
  span
    &:hover
      cursor: pointer
</style>