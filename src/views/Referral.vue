<template>
  <div>
      <div class="row">
        <div class="col-lg-12">
          <div id="invoice">
            <div id="invoice-top">
              <div 
                class="title invoice-title copy-block"
                @click="copyReferralLink">
                <p> <img class="copy-img" src="/images/icons/copy.svg">Копировать реферальную ссылку</p>
              </div>
            </div>
            <b v-if="partner">Вы яавляетесь рефералом этого аккаунта</b>
            <div v-if="partner" id="invoice-mid">
              <div class="invoice-logo-wrap">
                <div class="clientlogo"></div>
                <div class="invoice-info">
                  <h2>{{ partner.name }}</h2>
                  <p>{{ partner.email }}</p>
                </div>
              </div>
            </div>

            <b v-if="referrals.length">Ваши рефералы</b>
            <div v-if="referrals.length" class="referrals">
              <div 
                v-for="(referral, index) in referrals"
                :key="referral._id + index"
                id="invoice-mid">
                <div class="invoice-logo-wrap">
                  <div class="clientlogo"></div>
                  <div class="invoice-info">
                    <h2>{{ referral.name }}</h2>
                    <p>{{ referral.email }}</p>
                    <span 
                      v-if="currentReferral._id !== referral._id"
                      @click="currentReferral = referral" 
                      class="more">
                      подробнее
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!--End Invoice Mid-->

            <div 
              v-if="currentReferral"
              id="invoice-bot">

              <div id="invoice-table">
                <div class="table">
                  <table class="table">
                    <tr class="tabletitle">
                      <td class="table-item">
                        <h2>{{ currentReferral.name }}</h2>
                      </td>
                      <td class="Rate">
                        <h2>Сумма</h2>
                      </td>
                      <td class="subtotal">
                        <h2>Вам начислено</h2>
                      </td>
                    </tr>

                    <tr class="service">
                      <td class="tableitem">
                        <p class="itemtext">Communication</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">$75</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">$375.00</p>
                      </td>
                    </tr>
                    <tr class="tabletitle">
                      <td></td>
                      <td class="Rate">
                        <h2>Итог заработка от реферала</h2>
                      </td>
                      <td class="payment">
                        <h2>$3,644.25</h2>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>

            <div v-else class="no-table">
              <b>Пока у вас нет ни одного реферала</b>
              <div>
                <img src="/images/icons/files.svg"> Тут будут данные о депозитах реферала
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Referral',
  data: () => ({
    currentReferral: null
  }),

  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    },
    partner () {
      return this.$store.state.referral.partner
    },
    referrals() {
      return this.$store.state.referral.referrals
    },
    depositTable () {
      return this.$store.getters['referral/depositTable'](this.currentReferral._id)
    },
  },
  watch: {
    referrals (referrals) {
      if (referrals.length) {
        this.currentReferral = referrals[0]
      }
    }
  },
  created () {
    this.getMyPartner()
    this.getMyReferrals()
  },
  methods: {
    copyReferralLink () {
      let text = `${document.location.origin}/registration?ref=${this.currentUser.id}`
      navigator.clipboard.writeText(text)
      this.$store.dispatch('notification/SET_NOTIFICATION_SETTINGS',
        {
          show: true,
          time: 2000,
          text: 'Ссылка скопирована'
        }
      )
    },

    getMyPartner () {
      this.$store.dispatch('referral/GET_MY_PARTNER', this.currentUser.id)
    },
    getMyReferrals () {
      this.$store.dispatch('referral/GET_MY_REFERRALS', this.currentUser.id)
    }
  }
}
</script>

<style lang="sass" scoped>
.no-table
  height: 50vh
  width: 100%
  justify-content: center
  display: flex
  flex-direction: column
  align-items: center
  font-size: 22px
  font-weight: 600
  color: gray
  b
    margin-bottom: 40px
    color: black
    font-weight: 600
  img
    width: 80px
.more
  color: blue
  font-size: 12px
.referrals
  display: flex
#invoice
  margin-bottom: 0
#invoice-top
  min-height: unset
.invoice-info
  margin-left: 5px
  p
    margin-bottom: 5px
  h2
    margin-bottom: 0
#invoice-mid
  &:hover
    cursor: pointer
  margin-top: 10px
  h2
    font-size: 18px
  p
    font-size: 16px
#invoice-mid + #invoice-mid
  margin-left: 20px
.copy-img
  width: 20px
  margin-right: 5px
.copy-block
  &:hover
    cursor: pointer
  display: flex
  align-items: center
  p
    font-size: 16px
    text-decoration: underline
    color: blue
</style>