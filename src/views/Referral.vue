<template>
  <div>
      <div class="row">
        <div class="col-lg-12">
          <div id="invoice" class="effect2">
            <div id="invoice-top">
              <div 
                class="title invoice-title copy-block"
                @click="copyReferralLink">
                <p> <img class="copy-img" src="/images/icons/copy.svg">Копировать реферальную ссылку</p>
              </div>
            </div>
            <div id="invoice-mid">
              <div class="invoice-logo-wrap">
                <div class="clientlogo"></div>
                <div class="invoice-info">
                  <h2>Client Name</h2>
                  <p>mariam@gmail.com<br> 555-555-5555</p>
                </div>
              </div>
            </div>
            <!--End Invoice Mid-->

            <div id="invoice-bot">

              <div id="invoice-table">
                <div class="table">
                  <table class="table">
                    <tr class="tabletitle">
                      <td class="table-item">
                        <h2>Item Description</h2>
                      </td>
                      <td class="Hours">
                        <h2>Hours</h2>
                      </td>
                      <td class="Rate">
                        <h2>Rate</h2>
                      </td>
                      <td class="subtotal">
                        <h2>Sub-total</h2>
                      </td>
                    </tr>

                    <tr class="service">
                      <td class="tableitem">
                        <p class="itemtext">Communication</p>
                      </td>
                      <td class="tableitem">
                        <p class="itemtext">5</p>
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
                      <td></td>
                      <td class="Rate">
                        <h2>Total</h2>
                      </td>
                      <td class="payment">
                        <h2>$3,644.25</h2>
                      </td>
                    </tr>
                  </table>
                </div>
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
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    }
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
    }
  }
}
</script>

<style lang="sass" scoped>
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