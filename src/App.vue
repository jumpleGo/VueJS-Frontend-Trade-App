<template>
  <div id="app">
    <notification 
      v-if="notificationData.show"
      :text="notificationData.text" />
    <router-view/>
  </div>
</template>

<script>
import Notification from '@/components/base/Notification'
export default {
  components: {
    Notification
  },
  name: 'App',
  computed: {
    notificationData () {
      return this.$store.state.notification.settings
    }
  },
}
</script>