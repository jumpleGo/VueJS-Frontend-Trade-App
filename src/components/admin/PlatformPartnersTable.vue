<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Партнеры платформы</h4>
      </div>
      <input 
        v-model="search" 
        type="text" 
        placeholder="Поиск"
        class="input">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <Partner 
                v-for="(p, index) in partners"
                :key="`${p._id}-${index}`"
                :index="index"
                :partner="p"
                @save-percent="setPercentToPartner" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Partner from './Partner'

export default {
  name: 'PlatformPartnersTable',
  data: () => ({
    search: '',
  }),
  components: {
    Partner
  },
  computed: {
    partners () {
      if (this.search) {
        return this.$store.state.referral.platformPartners
          .filter(item => item.userObject.email.includes(this.search))
      } else {
        return this.$store.state.referral.platformPartners
      }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('referral/GET_PARTNERS')
  },
  methods: {
    setPercentToPartner (partner) {
      this.$store.dispatch('referral/SET_PERCENT_TO_PARTNER', partner)
    }
  }
}
</script>
<style lang="sass" scoped>
.input
  padding: 0 10px
  width: 30%
.filter
  display: flex
  align-items: center
  label
    margin-bottom: 0
    margin: 0 10px 0px 5px
</style>