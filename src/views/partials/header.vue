<template>
  <div class="container">
    <div class="b-header">
      <!--Navbar-->

      <nav class="navbar navbar-expand-lg navbar-light b-header__menu-mobile">
        <button @click="toggleMenu" class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="{'navbar-collapse-open': isActive}">
          <ul class="navbar-nav mr-auto">
            <li><router-link class="nav-link" to="/" exact>Главная</router-link></li>
            <li><router-link class="nav-link" to="about">О компании</router-link></li>
            <li><router-link class="nav-link" to="documentation">Руководство для новичков</router-link></li>
          </ul>
        </div>
      </nav>
      <!--/.Navbar-->

      <div class="b-header__logo">
        <router-link to="/">
          <img src="@/assets/img/client/brand-logo2.png" alt="logo">
          <div>
            <p>Corex</p>
            <p>Brokers</p>
          </div>
        </router-link>
      </div>

      <ul class="b-header__menu">
        <li><router-link to="/" exact>Главная</router-link></li>
        <li><router-link to="about">О компании</router-link></li>
        <li><router-link to="documentation">Руководство для новичков</router-link></li>
      </ul>

      <div class="b-header__auth">
        <router-link class="btn-auth__left" to="login">Вход</router-link>
        <router-link class="btn-auth__right" to="registration">Открыть счет</router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data() {
    return {
      isActive: false
    }
  },

  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  }
}
</script>
