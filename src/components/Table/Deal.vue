<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ deal.pair }}</td>
    <td>
      <span :class="[`badge badge-${colorDeal}`]">
        {{ deal.status }}
      </span>
    </td>
    <td>{{ formateDate }}</td>
    <td class="color-primary">$ {{ deal.amount }}</td>
    <td class="color-primary">{{ checkTrend }}</td>
    <td>{{ durationTimer }}</td>
  </tr>
</template>

<script>
import moment from 'moment'
moment.locale('ru')
export default {
  name: 'Deal',
  props: {
    deal: {
      type: Object,
      required: true
    },
    index: Number,
  },
  data: () => ({
    duration: 0,
    interval: null
  }),
  computed: {
    colorDeal () {
      let color
      if (this.deal.status === 'NEW' || this.deal.status === 'WAITING') {
        return 'secondary'
      }
      if (this.deal.status === 'WIN') {
        return 'success'
      }
      if (this.deal.status === 'LOSE') {
        return 'danger'
      }
      if (this.deal.status === 'RETURN') {
        return 'muted'
      }
      return color
    },
    price () {
      return +this.$store.state.trade.currentPrice.toFixed(2)
    },
    checkTrend () {
      return this.deal.trend === 'low' ? 'Ниже' : 'Выше'
    },
    formateDate () {
      return moment(this.deal.startDate).format('LTS')
    },
    endDate () {
      return moment(this.deal.endDate).format('LTS')
    },
    durationTimer () {
      if (this.duration && this.duration >= 10) {
        return  `0:${this.duration}`
      } else if ((this.duration && this.duration < 10) && (this.duration && this.duration > 0)) {
        return `0:0${this.duration}`
      } else {
        return this.endDate
      }
    }
  },
  mounted () {
    let end = moment(this.deal.endDate)
    let start = moment()
    let duration = moment.duration(end.diff(start))._milliseconds / 1000;
    console.log(duration)

    if (duration > 0) {
      this.duration = duration.toFixed(0)
      this.timer(duration.toFixed(0))
    }
  },
  methods: {
    timer (duration) {
      this.interval = setInterval(() => {
        if (typeof this.duration === "number" && this.duration <= 0) {
          clearInterval(this.interval)
          this.closeDeal()
        }
        duration--
        this.duration = duration
      }, 1000)
    },

    closeDeal () {
      this.$store.dispatch('deals/CLOSE_DEAL', {
        deal: this.deal,
        price: this.price
      })
    }
  }
}
</script>