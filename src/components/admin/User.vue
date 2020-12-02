<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ user.email }}</td>
    <td>
      <span 
        :class="[`badge badge-${colorIsAdmin}`]"
        @click="toggleAdmin">
        {{ isAdminWord(user.isAdmin)}}
      </span>
    </td>
    <td>
      <span 
        :class="[`badge badge-${colorIsBlocked}`]"
        @click="toggleBlocked">
        {{ isBlockedWord(user.isBlocked) }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      required: true
    },
    index: Number,
  },

  computed: {
    colorIsBlocked () {
      let color
      if (this.user.isBlocked) {
        color = 'success'
      } else {
        color = 'danger'
      }
      return color
    },
    colorIsAdmin () {
      let color
      if (this.user.isAdmin) {
        color = 'danger'
      } else {
        color = 'success'
      }
      return color
    },
  },
  mounted () {
 
  },

  methods: {
    toggleAdmin () {
      this.$store.dispatch('admin/SET_USERS_SETTINGS', {
        index: this.index, 
        email: this.user.email, 
        isAdmin: !this.user.isAdmin,
        isBlocked: this.user.isBlocked
      })
    },
    toggleBlocked () {
      this.$store.dispatch('admin/SET_USERS_SETTINGS', {
        index: this.index, 
        email: this.user.email, 
        isAdmin: this.user.isAdmin, 
        isBlocked: !this.user.isBlocked
      })
    },
    
    isAdminWord (val) {
      if (val) {
        return 'удалить админа'
      } else {
        return 'сделать админом'
      }
    },
    isBlockedWord (val) {
      if (val) {
        return 'разблокировать'
      } else {
        return 'заблокировать'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .badge
    &:hover
      cursor: pointer
</style>