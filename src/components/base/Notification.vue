<template>
  <transition
    appear 
    name="fade" 
    duration="100">
    <div class="notification">
      {{ text }}
    </div>
  </transition> 
</template>

<script>
export default {
  name: 'Notification',
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang="sass" scoped>
  .notification
    position: fixed
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    width: 100vw
    top: 0
    left: 0
    background: rgba(0,0,0, 0.9)
    color: white
    font-size: 22px
    z-index: 1000000
</style>