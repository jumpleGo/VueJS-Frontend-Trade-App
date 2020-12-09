<template>
  <div class="col-lg-12">
    <div 
      v-if="popup.show" 
      class="popup">
      <div class="image">
        <img class="main-image" :src="popup.url">
        <img 
          style="width: 30px" 
          src="/images/icons/cancel.svg" 
          class="close-image"
          @click="popup.show = false ">
      </div>
    </div>
    <div class="card">
      <div class="card-title">
        <h4>Заявки на верификацию</h4>
      </div>
      <div class="sub-header">
        <input 
          v-model="search" 
          type="text" 
          placeholder="Поиск"
          class="input">
        <span 
          v-if="!archived"
          class="archive"
          @click="archived = true">
          Архив
        </span>
        <span 
          v-else
          class="archive"
           @click="archived = false">
          Назад
        </span>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <Verification 
                v-for="(v, index) in verificationRequests"
                :key="`${v._id}-${index}`"
                :index="index"
                :v="v"
                @open-image="openImage" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verification from './Verification'
export default {
  name: 'VerificationTable',
  components: {
    Verification
  },
  data: () => ({
    search: '',
    archived: false,
    popup: {
      show: false,
      url: null
    }
  }),
  computed: {
    verificationRequests () {
     if (this.archived) {
        if (this.search) {
          return this.$store.getters['admin/archivedVerificationRequests']
            .filter(item => item.userObject.email.includes(this.search))
        } else {
          return this.$store.getters['admin/archivedVerificationRequests']
        }
     } else {
       if (this.search) {
          return this.$store.getters['admin/verificationRequests']
            .filter(item => item.userObject.email.includes(this.search))
        } else {
          return this.$store.getters['admin/verificationRequests']
        }
     }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('admin/GET_VERIFICATION_REQUESTS')
  },
  methods: {
    openImage (url) {
      this.popup.show = true
      this.popup.url = url
    }
  }
}

</script>
<style lang="sass" scoped>
.sub-header
  display: flex
  align-items: center
  justify-content: space-between
.input
  padding: 0 10px
  width: 30%
.archive
  &:hover
    cursor: pointer
  color: blue
.popup
  position: fixed
  top: 0
  left: 0
  background: rgba(0,0,0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  z-index: 10000
  width: 100%
  height: 100%
  .image
    position: relative
  .close-image
    position: absolute
    right: -40px
    top: 0
    &:hover
      cursor: pointer
  .image
    .main-image
      width: auto
      height: 90vh
  
</style>