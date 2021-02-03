<template>
  <div>

    <section class="open-account">
      <div class="container">
        <h2 class="open-account__title">Открыть счет в Corex Brokers сейчас</h2>
        <div class="open-account__sub-title">
          Просто зарегистрируйтесь, пополните свой счет
          безопасным способом и получите доступ к
          полному спектру наших продуктов.
        </div>
        <router-link class="open-account__btn" to="login">Открыть счет</router-link>
      </div>
    </section>

    <footer class="b-footer">
      <div class="container">
        <div class="b-footer__menu-wrap">
          <div class="b-footer__menu">
            <div class="b-footer__menu-title">Сервис</div>
            <ul>
              <li><router-link to="/">Главная</router-link></li>
              <li><router-link to="term">Оферта</router-link></li>
              <li><router-link to="contacts">Контакты</router-link></li>
              <li><router-link to="about">О компании</router-link></li>
            </ul>
          </div>
<!--          <div class="b-footer__menu">-->
<!--            <div class="b-footer__menu-title">Информация</div>-->
<!--            <ul>-->
<!--              <li><router-link to="/documentation">Руководство для новичков</router-link></li>-->
<!--            </ul>-->
<!--          </div>-->
          <div class="b-footer__menu">
            <div class="b-footer__menu-title">Безопасный прием платежей со всего мира</div>
            <div class="b-footer__menu-add">
              <ul>
                <li>Payeer</li>
                <li>Visa</li>
                <li>Master card</li>
                <li>МИР</li>
                <li>Bitcoin</li>
                <li>Ethereum</li>
                <li>Payeer</li>
              </ul>
              <ul>
                <li>QIWI</li>
                <li>Яндекс.Деньги</li>
                <li>Альфа Клик</li>
                <li>Web Money</li>
                <li>Perfect Money</li>
                <li>Pay Pal</li>
                <li>Skrill</li>
              </ul>
              <ul>
                <li>Capitalist</li>
                <li>Золотая корона</li>
                <li>Epay</li>
                <li>Tele 2 Россия</li>
                <li>Билайн Россия</li>
                <li>МТС Россия</li>
                <li>Мегафон Россия</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="b-footer__desc">Уведомление о рисках: начиная работать на валютных рынках, убедитесь, что вы
          осознаете
          риски и что вы имеете достаточный уровень подготовки.
        </div>
        <div class="b-footer__copyright">Corex Brokers 2020</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>
