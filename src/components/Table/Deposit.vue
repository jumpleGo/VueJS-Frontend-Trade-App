<template>
  <tr>
    <th scope="row">{{ d.orderId}}</th>
    <td>{{ formateDate }}</td>
    <td>
      <span v-if="d.promocode" :class="[`badge badge-success`]">
        {{ d.promocode }}
      </span>
    </td>
    <td class="color-primary">$ {{ d.amount }}</td>
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