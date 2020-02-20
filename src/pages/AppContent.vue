<template>
  <v-content>
    <v-card class="body-content">
      <v-card-title>1. Выберите теплоход</v-card-title>
      <v-card-text class="d-flex flex-column">
        <div class="carousel-ship">
          <div
            class="mb-5 text-center text-blue title-ship"
            v-text="getShipName"
          />
          <v-carousel
            :value="chooseShip"
            @change="CHANGE_CHOOSE_SHIP"
          >
            <v-carousel-item
              v-for="(ship, i) in ships"
              :key="i"
            >
              <v-img
                contain
                aspect-ratio="2.7"
                :src="ship.image"
              />
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="about">
          <div class="annotation">
            <v-btn
              class="mt-10"
              @click="showAnnotation = !showAnnotation"
            >
              <div
                class="headline"
                v-text="`Подробнее о ${ships[chooseShip].name}`"
              />
            </v-btn>
            <div
              v-show="showAnnotation"
              class="subtitle-1 mt-2 pl-5"
              v-text="ships[chooseShip].annotation"
            />
          </div>
          <div class="gallery">
            <v-btn
              class="mt-5"
              @click="showGallery = !showGallery"
            >
              <div
                class="headline"
                v-text="'Галерея'"
              />
            </v-btn>
            <gallery
              v-show="showGallery"
              :items="ships"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-title>2. Выберите дату и время аренды</v-card-title>
      <calendar />
      <div class="footer" />
    </v-card>
  </v-content>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Gallery from '../components/Gallery.vue';
import Calendar from '../components/Calendar.vue';

export default {
  components: {
    Gallery,
    Calendar,
  },
  data() {
    return {
      showAnnotation: false,
      showGallery: false,
      ships: [
        {
          id: 182,
          name: 'Москва 182',
          image: 'http://cruiseinform.ru/upload/medialibrary/065/065489e29f7d3c1f637b38334da61e5f.jpg',
          annotation: `«Москва-182» — пассажирский речной теплоход с одноярусной надстройкой, рулевой рубкой на крыше надстройки и машинным отделением в кормовой части, работающий с мая по октябрь на реке Волге с отправлением из Ярославля до населенных пунктов Ярославской области от компании «Ярославский речной порт».

Теплоход был построен в 1986 году в Москве по проекту Р-51Э — эта серия прогулочных судов типа «Москва», строившихся с 1969 года по 1994 годы на Московском судостроительном заводе. После постройки судно поступило в Волжское объединенное речное пароходство, где было приписано к Ярославском речному порту.

Максимальная пассажировместимость составляет 243 человека в рейсах продолжительностью до 4 часов. Длина теплохода — 38,2 метра, ширина — 6,5 метров, надводный габарит — 5,7 метра, высота борта — 1,7 метра, водоизмещение с пассажирами — 101,5 тонн, средняя осадка при полном водоизмещении — 1,13 метра. Скорость судна — 23 км/час. Порт приписки теплохода — Ярославль.`,
          price: 120,
          maxPeople: 50,
          galery: [1, 2, 3, 4, 5, 6],
        },
        {
          id: 208,
          name: 'Москва 208',
          image: 'http://yarport.com/img/t1.jpg',
          annotation: `«Москва-208» — пассажирский речной теплоход с одноярусной надстройкой, рулевой рубкой на крыше надстройки и машинным отделением в кормовой части, работающий с мая по октябрь на прогулочных рейсах по реке Волге с отправлением из Ярославля от компании «Ярославский речной порт».
Теплоход был построен в 1988 году в Москве по проекту Р-51Э — эта серия прогулочных судов типа «Москва», строившихся с 1969 года по 1994 годы на Московском судостроительном заводе. После постройки судно поступило в Волжское объединенное речное пароходство, где было приписано к Ярославском речному порту.

Для работы на речных прогулках теплоход прошел модернизацию: если максимальная пассажировместимость однотипных судов составляет 243 человека, то «Москва-208» может принять 73 пассажира. Также на верхней палубе судна оборудован крытый пассажирский салон со обзорными окнами, в то время как на рейсовых судах такого нет.

Длина теплохода — 38,2 метра, ширина — 6,5 метров, надводный габарит — 5,7 метра, высота борта — 2,1 метра, водоизмещение с пассажирами — 105 тонн, средняя осадка при полном водоизмещении — 1,54 метра. Скорость судна — 23 км/час. Порт приписки теплохода — Ярославль.`,
          price: 120,
          maxPeople: 50,
          galery: [1, 2, 3, 4, 5, 6],
        },
      ],
    };
  },
  computed: {
    ...mapState(['chooseShip']),
    getShipName() {
      return this.ships[this.chooseShip].name;
    },
  },
  methods: {
    ...mapMutations(['CHANGE_CHOOSE_SHIP']),
  },
};
</script>
<style lang="sass">
.about
  padding: 0 25px
.carousel-ship
  padding: 0 41px
.title-ship
  color: #004d9f
  font-weight: 700
  font-size: 1.5rem !important
  line-height: 2rem
  letter-spacing: normal !important
  font-family: "Roboto", sans-serif !important
.body-content
  padding: 0 5vw 0 5vw
.footer
  height: 50px
</style>
