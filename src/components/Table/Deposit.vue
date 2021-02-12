<template>
  <tr>
    <td>{{ formateDate }}</td>
    <td class="color-primary">$ {{ d.amount }}</td>
    <td class="color-primary">{{ d.type }} {{ d.cryptoAmount.toFixed(4) }}</td>
    <td>
      <span v-if="d.promocode" :class="[`badge badge-success`]">
        {{ d.promocode }}
      </span>
    </td>
    
  </tr>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
export default {
  name: 'Deposit',
  props: {
    d: {
      type: Object,
      required: true
    },
    index: Number,
  },
  computed: {
    formateDate () {
      return moment(this.d.created_at).format('LLL')
    },
  },
}
</script>