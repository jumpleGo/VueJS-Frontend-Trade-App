<template>
  <tr class="user-row">
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ user.created_at | moment('LLL') }}</td>
    <td>{{ user.email }}</td>
    <td>
      <span 
        :class="[`badge badge-${colorIsAdmin}`]"
        @click="toggleStatus({isAdmin: !user.isAdmin})">
        {{ isAdminWord(user.isAdmin)}}
      </span>
    </td>
    <td>
      <span 
        :class="[`badge badge-${colorIsBlocked}`]"
        @click="toggleStatus({isBlocked: !user.isBlocked})">
        {{ isBlockedWord(user.isBlocked) }}
      </span>
    </td>
    <td>
      <span 
        :class="[`badge badge-${colorIsBlockedWithdrawal}`]"
        @click="toggleStatus({withdrawalBlocked: !user.withdrawalBlocked})">
        {{ isWithdrawalBlockedWord(user.withdrawalBlocked) }}
      </span>
    </td>
    <td v-if="user.deposits.length" @click="openDepositList" class="link">Список пополнений</td>
    <td v-else>Пополнений нет</td>
    <div 
      v-if="showDepositList"
      v-click-outside="() => showDepositList = false"
      class="deposit-list">
      <tr 
        v-for="(dep, index) in user.deposits"
        :key="`${index}--depo`">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ dep.created_at | moment('LLL') }}</td>
        <td>{{ dep.amount }}$</td>
      </tr>
    </div>
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

  data: () => ({
    showDepositList: false
  }),

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
    colorIsBlockedWithdrawal () {
      let color
      if (this.user.withdrawalBlocked) {
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
    toggleStatus (object) {
      this.$store.dispatch('admin/SET_USERS_SETTINGS', {email: this.user.email, object})
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
    },
    isWithdrawalBlockedWord (val) {
      if (val) {
        return 'разблокировать вывод'
      } else {
        return 'заблокировать вывод'
      }
    },

    openDepositList () {
      this.showDepositList = true
    }
  }
}
</script>

<style lang="sass" scoped>
  .user-row
    position: relative
  .deposit-list
    background: white
    box-shadow: 3px 2px 8px -1px rgba(0, 0, 0, 0.46)
    position: absolute
    right: 5%
    z-index: 1000
  .link
    text-align: right
    color: blue
    &:hover
      cursor: pointer
  .badge
    &:hover
      cursor: pointer
</style>