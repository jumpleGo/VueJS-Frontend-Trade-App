<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Пользователи</h4>
      </div>
      <input 
        v-model="search" 
        type="text" 
        placeholder="Поиск"
        class="input">
      <div v-if="!search" class="filter">
        <input 
          v-model="filter"
          id="admins" 
          type="radio"
          value="admins">
        <label for="admins">Админы</label>
        <input 
          v-model="filter" 
          id="blocked"
          type="radio"
          value="blocked">
        <label for="blocked">Заблокированные</label>
        <input 
          v-model="filter"
          id="all" 
          type="radio"
          value="all">
        <label for="all">Все</label>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <tbody>
              <User 
                v-for="(user, index) in users"
                :key="`${user._id}-${index}`"
                :index="index"
                :user="user" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from './User'

export default {
  name: 'UsersTable',
  data: () => ({
    search: '',
    filter: 'all'
  }),
  components: {
    User
  },
  watch: {
    search (value) {
      if (value) {
        this.filter = 'all'
      }
    }
  },
  computed: {
    users () {
      if (this.search) {
        return this.$store.getters['admin/users'].filter(user => user.email.includes(this.search))
      }else if (this.filter === 'admins') {
        return this.$store.getters['admin/users'].filter(user => user.isAdmin)
      }else if (this.filter === 'blocked') {
        return this.$store.getters['admin/users'].filter(user => user.isBlocked)
      }else {
        return this.$store.getters['admin/users']
      }
    },
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  mounted () {
    this.$store.dispatch('admin/GET_USERS')
  },
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