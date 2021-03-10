<template>
    <div>
        <Header/>
        <section class="main">
            <div class="container">
                <div class="main-wrap">
                    <h1 class="main__title">
                        Торгуйте с уверенностью вместе с Ocean Option
                    </h1>
                    <div class="main__sub-title">
                        Откройте для себя возможности
                        торговой платформы Ocean Option!
                    </div>
                    <div class="main__sub-title">
                        Живые котировки и инструменты со всех
                        ведущих бирж.
                    </div>

                    <router-link class="main__btn" to="registration">Открыть счет</router-link>
                </div>
            </div>
        </section>

        <section class="why">
            <div class="container">
                <h2 class="why__title">
                    Почему торговать с Ocean Option?
                </h2>
                <div class="why__items">
                    <div class="why__item">
                        <div class="why__item-img">
                            <img src="@/assets/img/client/why_1.png" alt="">
                        </div>
                        <div class="why__item-title">Доступ к глобальному рынку</div>
                        <div class="why__item-desc">
                            Торговля 24/7 в реальном времени с основными критовалютами доступна из любой точки мира.
                        </div>
                    </div>
                    <div class="why__item">
                        <div class="why__item-img">
                            <img src="@/assets/img/client/why_2.png" alt="">
                        </div>
                        <div class="why__item-title">Мощные платформы</div>
                        <div class="why__item-desc">
                            Используйте обе наши платформы,
                            отмеченную наградами SaxoTraderGO
                            и профессиональную SaxoTraderPRO,
                            c одного счета.
                        </div>
                    </div>
                    <div class="why__item">
                        <div class="why__item-img">
                            <img src="@/assets/img/client/why_3.png" alt="">
                        </div>
                        <div class="why__item-title">Мин. депозит - $30</div>
                        <div class="why__item-desc">
                            Воспользуйтесь лучшим порогом
                            стоимости входа на рынок, а также
                            более узкими спредами и более
                            низкими комиссиями при переходе
                            на более высокий уровень.
                        </div>
                    </div>
                    <div class="why__item">
                        <div class="why__item-img">
                            <img src="@/assets/img/client/why_3.png" alt="">
                        </div>
                        <div class="why__item-title">Экспертная поддержка</div>
                        <div class="why__item-desc">
                            Наша лучшая в отрасли цифровая
                            поддержка является стандартом
                            для всех наших клиентов, а на
                            VIP-уровне доступно еще лучшее
                            персонализированное обслуживание.
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="create-acc">
            <div class="container">
                <h2 class="create-acc__title">
                    Готовы получить бесплатный доступ к миру инвестиций?
                </h2>
                <h3 class="create-acc__sub-title">Создайте аккаунт, чтобы начать пользоваться платформой</h3>

                <div class="form-feedback">
                    <span class="form-feedback-bg"></span>

                    <form @submit.prevent class="form-feedback__wrap-inputs">
                        <div class="form-feedback__title">
                            Регистрация в Ocean Option
                        </div>

                        <div class="form-feedback__input">
                            <label for="i">Имя</label>
                            <input id="i" v-model="name" value="" type="text" name="name" placeholder="Имя" required/>
                            <span v-if="$v.name.$invalid" class="error--text">Обязательное поле</span>
                        </div>

                        <div class="form-feedback__input">
                            <label>Email</label>
                            <input v-model="email" type="email" placeholder="Email" required/>
                            <span v-if="!email" class="error--text">Обязательное поле</span>
                            <span v-if="email && $v.email.$invalid" class="error--text">Неверный тип почты</span>
                        </div>

                        <div class="form-feedback__input">
                            <label>Пароль</label>
                            <input v-model="password" type="password" placeholder="Пароль" required>
                            <span v-if="!password" class="error--text">Обязательное поле</span>
                            <span v-if="password && !$v.password.minLength" class="error--text">Минимальное количество символов 5</span>
                            <span class="error--text" v-if="error">Пользователь с таким Email уже Зарегистрирован</span>
                        </div>


                        <div class="form-feedback__checkbox">
                            <input id="terms" v-model="isChecked" type="checkbox" name="agree" value="1" required checked/>
                            <label for="terms">Я согласен(а) с условиями <router-link to="term" target="_blank">Пользования
                                веб-сайтом</router-link>
                            </label>
                            <span v-if="!isChecked" class="error--text">Необходимо согласиться с условиями</span>
                        </div>

                        <button :disabled="$v.$invalid" type="button" class="form-feedback__btn-reg" @click="submit">
                            Зарегистрироваться
                        </button>

                        <div class="register-link m-t-15 text-center">
                            <p>Уже есть аккаунт ?
                                <router-link to="login">Войти</router-link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <section class="category">
            <div class="container">
                <h2 class="category__title">Категории наших счетов</h2>
                <div class="category__sub-title">Торгуйте больше, рискуйте меньше и пользуйтесь лучшим обслуживанием
                </div>

                <div class="category__card-wrap">
                    <div class="category__card">
                        <div class="category__card-title">Демо-счет</div>
                        <ul class="category__card-list">
                            <li class="category__card-item">Активируется без
                                пополнения счета
                            </li>
                            <li class="category__card-item">$1000 на тесты ваших
                                стратегий
                            </li>
                            <li class="category__card-item">Техническая и торговая
                                поддержка, доступная
                                в режиме 24/7
                            </li>
                            <li class="category__card-item category__card-item--disabled">Торговля на реальные
                                средства
                            </li>
                            <li class="category__card-item category__card-item--disabled">Приоритетная клиентская
                                поддержка
                            </li>
                            <li class="category__card-item category__card-item--disabled">Личный менеджер</li>
                        </ul>
                        <router-link class="category__card-btn" to="registration">Открыть счет</router-link>
                    </div>
                    <div class="category__card">
                        <div class="category__card-title">Торговый счет</div>
                        <ul class="category__card-list">
                            <li class="category__card-item">Активируется при
                                пополнения счета на 30$
                            </li>
                            <li class="category__card-item">$1000 на тесты ваших
                                стратегий
                            </li>
                            <li class="category__card-item">Техническая и торговая
                                поддержка, доступная
                                в режиме 24/7
                            </li>
                            <li class="category__card-item">Торговля на реальные
                                средства
                            </li>
                            <li class="category__card-item category__card-item--disabled">Приоритетная клиентская
                                поддержка
                            </li>
                            <li class="category__card-item category__card-item--disabled">Личный менеджер</li>
                        </ul>
                        <router-link class="category__card-btn" to="registration">Открыть счет</router-link>
                    </div>
                    <div class="category__card">
                        <div class="category__card-title">VIP счет</div>
                        <ul class="category__card-list">
                            <li class="category__card-item">Активируется при
                                пополнения счета на 200$
                            </li>
                            <li class="category__card-item">$1000 на тесты ваших
                                стратегий
                            </li>
                            <li class="category__card-item">Техническая и торговая
                                поддержка, доступная
                                в режиме 24/7
                            </li>
                            <li class="category__card-item">Торговля на реальные
                                средства
                            </li>
                            <li class="category__card-item">Приоритетная клиентская
                                поддержка
                            </li>
                            <li class="category__card-item">Личный менеджер</li>
                        </ul>
                        <router-link class="category__card-btn" to="registration">Открыть счет</router-link>
                    </div>
                </div>
            </div>
        </section>

        <div class="support">
            <div class="container">
                <span class="container-bg"></span>
                <div class="support-container">
                    <h2 class="support__title">Экспертная поддержка</h2>
                    <div class="support__sub-title">
                        Независимо от того, являетесь ли Вы долгосрочным
                        инвестором или активным трейдером, вы получите
                        высококлассную профессиональную поддержку.
                    </div>
                    <ul class="support__desc">
                        <li>
                            <p>Интегрированная цифровая поддержка</p>
                            <p>Вы можете самостоятельно ознакомиться с множеством полезных
                                ресурсов в нашем Центре поддержки клиентов или в службе
                                поддержки, интегрированной в платформу.
                            </p>
                        </li>
                        <li>
                            <p>Персональная поддержка</p>
                            <p>Получайте экспертную поддержку по техническим вопросам и
                                обслуживанию счета в любое время в часы работы рынков. Наши
                                эксперты работают 24/7, кажды является специалистом по платформе
                                Ocean Option и обладает глубокими знаниями о местном рынке.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {required, email, minLength} from 'vuelidate/lib/validators'

import Header from "@/views/partials/header";
import Footer from "@/views/partials/footer";

export default {
    name: 'PageMain',

    data() {
        return {
            email: '',
            password: '',
            name: '',
            isChecked: true
        };
    },

    components: {
        Header,
        Footer,
    },

    computed: {
        ...mapState('auth', {
            error: state => state.registrationError
        })
    },

    validations: {
        email: {
            required,
            email
        },
        name: {
            required
        },
        isChecked: {
            required
        },
        password: {
            required,
            minLength: minLength(5)
        }
    },

    beforeDestroy() {
        this.$store.commit('auth/SET_REGISTER_ERROR', null)
    },

    methods: {
        submit() {
            if (!this.isChecked) {
              return false;
            }

            const {email, name, password} = this
            const {ref} = this.$route.query
            this.$store.dispatch('auth/REGISTER', {email, name, password, ref})
        },
    },
}
</script>

<style scoped>
@import "./../assets/css/bootstrap.css";
@import "./../assets/css/maicons.css";
@import "./../assets/css/mobster.css";
</style>
