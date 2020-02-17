<template>
  <v-content>
    <v-card class="body-content" height="100vh">
      <v-card-title>1. Выберите теплоход</v-card-title>
      <v-card-text class="d-flex flex-column">
        <div class="carousel-ship">
          <div class="mb-5 text-center text-blue title-ship" v-text="ships[choseShip].name"/>
          <v-carousel v-model="choseShip">
            <v-carousel-item
              v-for="(ship, i) in ships"
              :key="i"
            >
              <v-img contain aspect-ratio="2" :src='ship.image'/>
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="headline mt-10" v-text="ships[choseShip].name"/>
        <div class="subtitle-1 mt-2" v-text="ships[choseShip].annotation"/>
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      ships: [
        { id: 182,
          name: 'Москва 182',
          image: 'http://cruiseinform.ru/upload/medialibrary/065/065489e29f7d3c1f637b38334da61e5f.jpg',
          annotation: 'Аннотация',
          price: 120,
          maxPeople: 50,
        },
        { id: 208,
          name: 'Москва 208', image: 'http://yarport.com/img/t1.jpg',
          annotation: 'Аннотация',
          price: 120,
          maxPeople: 50, },
      ],
      choseShip: 0,
    };
  }
}
</script>
<style lang="sass">
.carousel-ship
  padding: 0 20%
.title-ship
  color: #004d9f
  font-weight: 700
  font-size: 1.5rem !important
  line-height: 2rem
  letter-spacing: normal !important
  font-family: "Roboto", sans-serif !important
.body-content
  padding: 0 5vw 0 5vw
</style>