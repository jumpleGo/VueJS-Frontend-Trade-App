<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ deal.base }}/{{ deal.quote }}</td>
    <td>
      <span :class="[`badge badge-${colorDeal}`]">
        {{ deal.statusWord(deal.status)}}
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
    currentDealPrice () {
      return this.$store.state.deals.currentDealPrice
    },
    isNextDealControlled () {
      return this.$store.getters['deals/isNextDealControlled']
    },
    deals () {
      return this.$store.getters['deals/deals']
    },
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
      return moment(this.deal.startDate).format('LLL')
    },
    endDate () {
      return moment(this.deal.endDate).format('LLL')
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
  watch: {
    duration (value) {
      if (this.isNextDealControlled && +value === 30) {
        this.$store.dispatch('trade/SEND_SOCKET_CONTROL_DEAL', {price: +this.currentDealPrice, trend: this.deal.trend})
      }
    }
  },
  mounted () {
    let end = moment(this.deal.endDate)
    let start = moment()
    let duration = moment.duration(end.diff(start))._milliseconds / 1000;

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