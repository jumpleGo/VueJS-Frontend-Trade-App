<template>
  <div>

    <Header />

    <section class="section-gap documentation">
      <div class="container">
        <h1 class="h1-title">Условия пользовательского соглашения</h1>
        <div class="text">

          <h2>Что нужно для начала?</h2>
          <p>Никакой дополнительный софт вам не нужен!</p>
          <p>Все что нужно - это доступ в интернет и гаджет.</p>
          <br>
          <h2>Регистрация:</h2>
          <p>1. Нажимаете “Открыть счет”</p>
          <p>2. Вы перейдете на страницу регистрации. Заполните данные.</p>
          <p>3. Примите пользовательское соглашение и нажмите “Зарегистрироваться”</p>
          <br>
          <p>Для тестов Ваших стратегий Вам будет автоматически выдан демо-счет на 1000 торговых единиц.</p>
          <br>
          <h2>Как пополнить счет?</h2>
          <p>1. Нажимаете “Пополнить счет”</p>
          <p>2. Далее указываем сумму и выбираем способ "Payeer"</p>
          <p>3. Нажимаем продолжить</p>
          <p>4. Выберете удобный Вам способ пополнения и оплатите счет</p>
          <br>
          <p>Все платежи зачисляются быстро. Сумма которую вы указали - после оплаты непременно поступит на ваш баланс.</p>
          <br>
          <h2>Как вывести деньги со счета?</h2>
          <p>1. Нажимаем на свой счет или в меню выбираем “Вывод средств”. Указываем сумму и реквизиты. Делаем заявку на вывод</p>
          <p> Если у вас возник какой-либо вопрос - обратитесь в службу поддержки.</p>
          <br>
          <p>Слева сверху кнопка “Меню” - “Служба Поддержки”</p>
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
  name: 'PageDocumentation',
  components: {Header, Footer}
}
</script>
