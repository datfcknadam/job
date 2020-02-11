<template>
  <v-content>
    <v-card>
      <v-card-title>Выберите теплоход</v-card-title>
      <v-card-text>
      <v-carousel v-model="choseShip">
        <v-carousel-item
          v-for="(ship, i) in ships"
          :key="i"
          :src='ship.image'
          
        />
      </v-carousel>
      <v-radio-group v-model="choseShip" :mandatory="false">
        <v-radio label="Radio 1" value="0"></v-radio>
        <v-radio label="Radio 2" value="1"></v-radio>
      </v-radio-group>
      </v-card-text>
    </v-card>
  </v-content>otherilet
  
  le
</template>

<script>
export default {
  data() {
    return {
      ships: [
        { name: 'Москва 182', image: 'http://cruiseinform.ru/upload/medialibrary/065/065489e29f7d3c1f637b38334da61e5f.jpg' },
        { name: 'Москва 208', image: 'http://yarport.com/img/t1.jpg' },
      ],
      choseShip: 0,
    };
  }
}
</script>
