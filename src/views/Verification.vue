<template>
  <div id="main-wrapper">
    <base-header />
    <div class="row">
      <router-link 
        class="col-lg-2 to-trade" 
        to="/dashboard">
        {{ toTrade }}
      </router-link>
      <div
        v-if="currentUser.isVerified" 
        class="col-lg-6 offset-1 message-block">
        <h1>Ваш аккаунт верифицирован</h1>
      </div>
      <div
        v-else-if="verifyRequest && verifyRequest.status === 'NEW'" 
        class="col-lg-6 offset-1 message-block">
        <img src="/images/icons/clock.svg" alt="">
        <div>
          <h1>Ваш документы проходят модерацию.</h1>
          <h3>Время модерации от 6 часов до 2 рабочих дней</h3>
          <span>По всем вопросам обращайтесь в специальный чат поддержки</span>
        </div>
      </div>
      <div 
        v-else
        class="col-lg-6 offset-1">
        <div
          v-if="verifyRequest && verifyRequest.status === 'REJECTED'" 
          class="message-block --error">
          <div>
            <h3>Ваша заявка была отклонена</h3>
          </div>
        </div>
        <div class="card">
          <div class="card-title">
            <h4>Верификация</h4>
          </div>
          <div class="card-body">
            <div class="basic-form">
              <form>
                <div class="form-group">
                  <label>ФИО</label>
                  <input 
                    v-model="fullName"
                    class="form-control" 
                    placeholder="ФИО">
                </div>
                <div class="form-group">
                  <label>Дата рождения</label>
                  <input 
                    v-model="birthdate"
                    type="date" 
                    placeholder="Дата рождения" 
                    class="form-control">
                </div>
                <div class="form-group">
                  <label>Адрес</label>
                  <input 
                    v-model="address"
                    type="text" 
                    placeholder="Адрес" 
                    class="form-control">
                </div>
                <div class="form-group">
                  <label>Номер телефона</label>
                  <input 
                    v-model="phone"
                    type="text" 
                    placeholder="Номер телефона" 
                    class="form-control">
                </div>
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-body">
                        <h4 class="card-title">Фотографии</h4>
                        <h6 class="card-subtitle">Фото паспорта* <br>Фото прописки* <br>Фото с паспортом в руках*</h6>
                        <div class="images-thumb">
                          <div 
                            v-for="(file,index) in files" 
                            :key="file.blob" 
                            class="thumb">
                            <span 
                              class="close"
                              @click="deleteImage(index)">
                              <img src="/images/cancel.png" class="close-img">
                            </span>
                            <img :src="file.thumb" class="thumb-img">
                          </div>
                        </div>
                        <file-upload
                          v-if="files.length < 3"
                          ref="upload"
                          input-id="photo-upload"
                          class="add-btn"
                          :extensions="['jpg', 'png']"
                          :multiple="true"
                          :maximum="3"
                          v-model="files"
                          @input-filter="inputFilter">
                          <i name="icon-download" size="20" />
                          <span class="add-btn--text">
                            Загрузить фото
                          </span>
                        </file-upload>
                      </div>
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  :disabled="$v.$invalid"
                  class="btn btn-primary m-b-10 m-l-5"
                  @click="createRequest">
                  Создать заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/headers/BaseHeader'
import FileUpload from 'vue-upload-component'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Verification',
  components: {
    BaseHeader,
    FileUpload
  },
  data: () => ({
    birthdate: null,
    phone: null,
    fullName: null,
    address: null,
    files: []
  }),

  computed: {
    toTrade () {
      return '< Вернуться'
    },
    verifyRequest () {
      return this.$store.state.verify.verifyRequest
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },

  validations: function (){
    return {
      birthdate: {
        required,
      },
      phone: {
        required,
        minLength: minLength(11)
      },
      address: {
        required
      },
      fullName: {
        required
      }
    }
  },

  mounted () {
    this.$store.dispatch('verify/GET_USER_REQUEST', this.currentUser.id)
  },

  methods: {
    async createRequest () {
      let formDataImages = this.files.map(function (file) {
        let fd = new FormData()
        fd.append('image', file.file)
        fd.append('name', file.name)
        return fd
      })
      let images = await this.$store.dispatch('verify/UPLOAD_IMAGE', formDataImages)
      let links = images.map(i => i.data.link)

      await this.$store.dispatch('verify/CREATE_REQUEST', {
        birthdate: this.birthdate, 
        phone: this.phone, 
        address: this.address, 
        fullName: this.fullName, 
        files: links,
        user: this.currentUser.id,
        status: 'NEW'
      })
    },
      
    deleteImage (index) {
      this.files.splice(index, 1)
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }

      }
      if (newFile.size > 10000000) {
        this.$store.commit('vendors/SET_FULL_MESSAGE_TEXT', 'MAX_SIZE')
        this.$store.commit('vendors/SHOW_FULL_PAGE_MESSAGE');
        return prevent()
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
      }
    },
  }
}
</script>
<style lang="sass" scoped>
.--error
  color: red
.message-block
  margin-top: 40px
  padding-bottom: 40px
  display: flex
  align-items: flex-start
  img
    width: 60px
    margin-right: 30px
  h1
    margin-top: unset
    font-size: 30px
  h3
    font-size: 20px
.add-btn--text
  &:hover
    cursor: pointer !important
.images-thumb
  display: flex
.thumb
  width: 80px
  height: 80px
  position: relative
  .close
    position: absolute
    top: -8px
    right: -8px
    .close-img
      width: 16px
  &:not(:first-child)
    margin-left: 10px
.thumb-img
  width: 80px
  height: 80px
.error
  font-size: 14px
  color: red
.btn
  border-width: unset
  
.to-trade
  margin-top: 10px
  padding-left: 55px
  &:hover
    text-decoration: unset
      
</style>