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
    };
  },
  computed: {
    ...mapState(['chooseShip', 'ships']),
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
