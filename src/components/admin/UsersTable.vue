<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-title">
        <h4>Пользователи</h4>
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
  components: {
    User
  },
  computed: {
    users () {
      return this.$store.getters['admin/users']
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