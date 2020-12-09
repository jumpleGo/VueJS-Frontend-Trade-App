<template>
  <div class="admin-panel" >
    <admin-left-sidebar class="sidebar" />
    <component :is="component" class="table" />
  </div>
</template>

<script>
import UsersTable from '@/components/admin/UsersTable'
import VerificationTable from '@/components/admin/VerificationTable'
import WithdrawalsTable from '@/components/admin/WithdrawalsTable'
import PlatformSettings from '@/components/admin/PlatformSettings'
import AdminLeftSidebar from '@/components/admin/AdminLeftSidebar'
export default {
  components: {
    UsersTable,
    VerificationTable,
    WithdrawalsTable,
    AdminLeftSidebar,
    PlatformSettings
  },
  name: 'AdminPanel',

  computed: {
    component () {
      return this.$store.state.admin.currentRoute
    }
  }
}
</script>

<style lang="sass" scoped>
.table
  width: 80%
  margin-left: 20%
.sidebar
  width: 20%  
</style>