<template>
  <div>

    <Header />

    <section class="section-gap documentation">
      <div class="container">
        <h1 class="h1-title">Связь с нами</h1>
        <div class="text">
          <p>Свяжитесь с нами с помощью онлайн-чата на сайте, мы ответим на Ваш email!</p>
        </div>
      </div>
    </section>

    <Footer/>

  </div>
</template>

<script>
import Footer from "@/views/partials/footer";
import Header from "@/views/partials/header";

export default {
  name: 'PageContacts',
  components: {Header, Footer}
}
</script>
