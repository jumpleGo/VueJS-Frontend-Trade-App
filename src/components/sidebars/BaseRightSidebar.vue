<template>
  <div class="left-sidebar --right">
    <div class="scroll-sidebar">
      <nav class="sidebar-nav">
        <ul id="sidebar-menu">
          <div class="form-actions pb-0 m-l-15 m-r-15">
            <div class="pair">{{ pair.id }}</div>
            <div class="price">${{ price }}</div>
            <button class="btn btn-success btn-rounded btn-block btn-glow">Выше</button>
            <button class="btn btn-danger btn-rounded btn-block btn-glow">Ниже</button>
          </div>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRightSidebar',
  computed: {
    pair () {
      return this.$store.state.trade.pair
    },
    price () {
      return this.$store.state.trade.currentPrice.toFixed(3)
    }
  },
}
</script>

<style lang="sass" scoped>
.price
  font-size: 23px
  font-weight: 600
.pair
  font-size: 23px
</style>