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

            <b v-if="referrals.length">Ваши рефералы ({{ referrals.length }})</b>
            <div>
              <input id="all" v-model="filter" type="radio" value="all">
              <label for="all">Все</label>
            </div>
            <div>
              <input id="withDeposits" v-model="filter" type="radio" value="withDeposits">
              <label for="withDeposits">С депозитами</label>
            </div>
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
            <div v-else class="no-table">
              <b>Пока у вас нет ни одного реферала</b>
              <div>
                <img src="/images/icons/files.svg"> Тут будут данные о депозитах реферала
              </div>
            </div>

            <div 
              v-if="currentReferral && currentReferral.deposits.length"
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

                    <tr 
                      v-for="dep in currentReferral.deposits"
                      :key="dep._id"
                      class="service">
                      <td class="tableitem">
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">${{ dep.amount }}</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">${{ dep.partnerEaring }}</p>
                      </td>
                    </tr>
                    <tr class="tabletitle">
                      <td></td>
                      <td class="Rate">
                        <h2>Итог заработка от реферала</h2>
                      </td>
                      <td class="payment">
                        <h2>${{finalEaring}}</h2>
                      </td>
                    </tr>
                    <tr v-if="totalEaring" class="tabletitle">
                      <td></td>
                      <td class="Rate">
                        <h2>Итог заработка от всех рефералов</h2>
                      </td>
                      <td class="payment">
                        <h2>${{totalEaring}}</h2>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td class="Rate">
                        <h2>Сумма всех депозитов рефералла:</h2>
                      </td>
                      <td class="payment">
                        <h2>${{ allDepositsForCurrentReferral }}</h2>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div v-else class="no-table">
              <b>Нет пополнений</b>
              <div>
                <img src="/images/icons/files.svg"> У этого реферала нет пополнений
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
    currentReferral: null,
    filter: 'all'
  }),

  computed: {
    totalEaring () {
      if (this.referrals.length === 1) {
        return this.finalEaring
      } else if (this.referrals.length > 1) {
        return this.allDeposits.reduce((pr, cur) => {
          return pr + cur.partnerEaring
        }, 0)
      } else {
        return 0
      }
    },
    allDeposits () {
      return this.referrals.map(user => user.deposits).flat()
    },
    allDepositsForCurrentReferral () {
      return this.currentReferral.deposits.length 
        ? this.currentReferral.deposits.reduce((pr, cur) => {
            return pr + cur.amount
          }, 0)
        : 0
    },
    finalEaring () {
      if (this.currentReferral.deposits.length > 1) {
        return this.currentReferral.deposits.reduce((pr, cur) => {
          return pr + cur.partnerEaring
        }, 0)
      } else {
        return this.currentReferral.deposits[0].partnerEaring
      }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    },
    partner () {
      return this.$store.state.referral.partner
    },
    referrals() {
      return this.filter === 'all'
        ? this.$store.state.referral.referrals
        : this.$store.state.referral.referrals.filter(ref => ref.deposits.length)
    }
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
    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }

      document.body.removeChild(textArea);
    },


    copyReferralLink () {
      let text = `${document.location.origin}/registration?ref=${this.currentUser.id}`
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        this.$store.dispatch('notification/SET_NOTIFICATION_SETTINGS',
          {
            show: true,
            time: 2000,
            text: 'Ссылка скопирована'
          }
        )
        return;
      }
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