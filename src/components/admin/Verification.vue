<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>
      {{ v.userObject.email }}
    </td>
    <td>
      <span 
        :class="[`badge badge-${colorStatus}`]">
        {{ statusWord(v.status)}}
      </span>
    </td>
    <td>
      <span>
        {{ v.fullName }}
      </span>
    </td>
    <td>
      <span>
        {{ v.phone }}
      </span>
    </td>
    <td>
      <span>
        {{ v.address }}
      </span>
    </td>
    <td>
      <span>
        {{ v.birthdate | moment('LL') }}
      </span>
    </td>
    <td>
      <div class="images">
        <img 
          v-for="img in v.files"
          :key="img" 
          style="width: 30px"
          :src="img"
          @click="$emit('open-image', img)">
      </div>
    </td>
    <td v-if="!v.archived">
      <button @click="toggleStatus('REJECTED')">
        Отклонить
      </button>
    </td>
    <td v-if="!v.archived">
      <button @click="toggleStatus('ACCEPTED')">
        Принять
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Verification',
  props: {
    v: {
      type: Object,
      required: true
    },
    index: Number,
  },

  computed: {
    colorStatus () {
      let color
      if (this.v.status === 'NEW') {
        color = 'primary'
      } else if (this.v.status === 'ACCEPTED') {
        color = 'success'
      } else if (this.v.status === 'REJECTED') {
        color = 'danger'
      }
      return color
    },
  },
  mounted () {
 
  },

  methods: {
    toggleStatus (status) {
      this.$store.dispatch('admin/SET_VREQ_STATUS', {
        id: this.v._id,
        index: this.index, 
        user: this.v.user,
        status
      })
    },
    
    statusWord (val) {
      if (val === 'NEW') {
        return  'Новая'
      } else if (val === 'ACCEPTED') {
        return  'Принята'
      } else if (val === 'REJECTED') {
        return  'Отклонена'
      }
    },
  }
}
</script>

<style lang="sass" scoped>
  span
    &:hover
      cursor: pointer
</style>