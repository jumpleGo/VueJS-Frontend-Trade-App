<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <span>
        {{ w.userObject[0].email }}
      </span>
    </td>
    <td>{{ w.amount }}$</td>
    <td>
      <span 
        :class="[`badge badge-${colorStatus}`]">
        {{ statusWord(w.status)}}
      </span>
    </td>
    <td v-if="!w.archived">
      <button @click="toggleStatus('REJECTED')">
        Отклонить
      </button>
    </td>
    <td v-if="!w.archived">
      <button @click="toggleStatus('ACCEPTED')">
        Подтвердить
      </button>
    </td>
    <td>
      <span>
        Дата {{ w.date | moment('LLL') }}
      </span>
    </td>
    <td>
      <span>
        Счет: {{ w.card }}
      </span>
    </td>
    <td>
      <span>
        {{ w.type }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Withdrawal',
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
        user: this.w.user,
        amount: this.w.amount,
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