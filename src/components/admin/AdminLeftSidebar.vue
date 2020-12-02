<template>
  <div class="left-sidebar">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <div class="card-body">
          <div class="trade-history-table">
            <div class="table-responsive">
              <table class="table table-xs pairs-table">
                <tbody>
                  <tr 
                    v-for="route in routes"
                    :key="route.path">
                    <td class="route" @click="setRoute(route.path)">
                      {{ route.name }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
          
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLeftSidebar',
  data: () => ({
    routes: [
      {
        name: 'Пользователи',
        path: 'usersTable'
      },
      {
        name: 'Заявки на вывод',
        path: 'withdrawalsTable'
      },
      {
        name: 'Заявки на верификацию',
        path: 'varificationTable'
      },
    ]
  }),
  methods: {
    setRoute (path) {
      this.$store.commit('admin/SET_CURRENT_ROUTE', path)
    }
  }
}
</script>

<style lang="sass" scoped>
.left-sidebar
  padding-top: 50px !important
table
  margin-bottom: unset
tbody > tr:hover
  cursor: pointer
  background: rgba(0,0,0, 0.03)

tbody tr td 
  padding: 5px 10px
.route
  text-align: left
  font-size: 14px
  color: black

</style>