<template>
  <v-content>
    <v-card class="body-content">
      <v-card-title>
        <div class="title-text">
          1. Выберите теплоход
        </div>
      </v-card-title>
      <v-card-text class="d-flex flex-column">
        <div class="carousel-ship">
          <div
            class="mb-5 text-center text-blue title-ship"
            v-text="getShipName"
          />
          <v-carousel
            :value="chooseShip"
            hide-delimiters
            @change="SET_CHOOSE_SHIP"
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
      <v-lazy
        v-model="calendar"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <div>
          <v-card-title>
            <div class="title-text">
              2. Выберите дату и время аренды
            </div>
          </v-card-title>
          <v-card-text>
            <calendar />
          </v-card-text>
        </div>
      </v-lazy>
      <div v-show="result">
        <v-card-title>
          <div class="title-text">
            3. Подтвердите аренду
          </div>
        </v-card-title>
        <v-card-text>
          <verification />
        </v-card-text>
      </div>
      <div class="footer" />
    </v-card>
  </v-content>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Gallery from '../components/Gallery.vue';
import Calendar from '../components/Calendar.vue';
import Verification from '../components/Verification.vue';

export default {
  components: {
    Gallery,
    Calendar,
    Verification,
  },
  data() {
    return {
      showAnnotation: false,
      showGallery: false,
      verification: false,
      calendar: false,
    };
  },
  computed: {
    ...mapState(['chooseShip', 'ships', 'result']),
    getShipName() {
      return this.ships[this.chooseShip].name;
    },
  },
  methods: {
    ...mapMutations(['SET_CHOOSE_SHIP']),
  },
};
</script>
<style lang="sass">
.body-content
  padding: 0 5vw 0 5vw
  .v-card__text
    background: aliceblue
    margin: 0 15px
  .v-card__title
    .title-text
      display: flex
      flex: 1 1 auto
.about, .calendar, .verification
  padding: 0 41px
.carousel-ship
  padding: 0 41px
.title-ship
  color: #004d9f
  font-weight: 700
  font-size: 1.5rem !important
  line-height: 2rem
  letter-spacing: normal !important
  font-family: "Roboto", sans-serif !important
.footer
  height: 50px
</style>
