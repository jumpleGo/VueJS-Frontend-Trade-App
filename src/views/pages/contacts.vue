<template>
  <div>

    <Header />

    <section class="section-gap documentation">
      <div class="container">
        <h1 class="h1-title">Условия пользовательского соглашения</h1>
        <div class="text">
          <p>Почта: <b>corexbrokers@gmail.com</b></p>
          <p>Если у вас возник какой-либо вопрос, также можете обратиться в службу поддержки.</p>
          <br>
          <p> Слева сверху кнопка “Меню” - “Служба Поддержки”</p>
          <br>
          <p>Работа службы поддержки 24/7 , 365 дней в году.</p>
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
  name: 'PageAbout',
  components: {Header, Footer}
}
</script>
