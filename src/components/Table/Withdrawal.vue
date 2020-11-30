<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>
      <span :class="[`badge badge-${colorDeal}`]">
        {{ w.statusWord(w.status)}}
      </span>
    </td>
    <td>{{ formateDate }}</td>
    <td>{{ w.type }}</td>
    <td class="color-primary">$ {{ w.amount }}</td>
  </tr>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
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
    colorDeal () {
      let color
      if (this.w.status === 'NEW') {
        return 'secondary'
      }
      if (this.w.status === 'COMPLETED') {
        return 'success'
      }
      if (this.w.status === 'CANCELED') {
        return 'danger'
      }
      return color
    },
    formateDate () {
      return moment(this.w.date).format('LLL')
    },
  },
}
</script>