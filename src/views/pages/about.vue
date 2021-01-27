<template>
  <div>

    <Header />

    <section class="about__main">
      <div class="container">
        <h1 class="h1-title">О Corex Broxers</h1>
        <div class="about__desc about__desc--white">Мы — специалисты в сфере финансовых и регулятивных
          технологий, обеспечивающие связь трейдеров, инвесторов и партнеров с рынками валют, CFD, акций,
          опционов, фьючерсов и других классов активов, доступных с одного счета.
        </div>
      </div>
    </section>

    <section class="about__what-we-do">
      <div class="container">
        <h2>Что мы делаем?</h2>
        <div class="about__desc">
          Мы создаем цифровые платформы, обеспечивающие доступ к рынкам с различными классами активов и
          предоставляем клиентам любого размера инструменты профессионального уровня, лучшие цены в отрасли и
          мировой уровень обслуживания.
        </div>
      </div>
    </section>

    <section class="about__aim">
      <div class="container">
        <div class="about__aim-wrap">
          <h2>Наша цель —
            демократизации трейдинга
            и инвестиций</h2>
          <div class="about__desc about__desc--white">
            Мы продолжаем уменьшать препятствия на глобальных рынках, используя наши знания в области
            финансовых технологий. Предоставляя услуги премиум-класса, конкурентные цены и интуитивные
            платформы, мы даем возможность трейдерам и инвесторам контролировать свое финансовое будущее.
          </div>
        </div>
      </div>
    </section>

    <section class="about__save">
      <div class="container">
        <div class="about__save-wrap">
          <div>
            <h2>Безопасный и стабильный</h2>
            <div class="about__desc">
              <p><b>Полностью регулируемый, пользующийся
                глобальным доверием</b></p>
              <p>Выбирая Corex Brokers, вы делаете выбор в пользу торговли с полностью регулируемой
                платформой, которая подчиняется строгим законодательным требованиям.</p>
              <p><b>Защищая ваши средства</b></p>
              <p>Задачей первостепенной важности для нас является обеспечение защиты средств наших
                клиентов. Когда вы переводите средства на свой счет в Corex Brokers, ваши деньги
                защищены в соответствии с принятыми в вашей юрисдикции компенсационными схемами.</p>
            </div>
          </div>
          <img src="@/assets/img/client/company-clients.png" alt="">
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
