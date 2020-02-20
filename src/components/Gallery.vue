<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      offset-sm="3"
    >
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="item in items[chooseShip].galery"
              :key="item"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card
                flat
                tile
                class="d-flex"
              >
                <v-img
                  :src="`${publicPath}gallery/${items[chooseShip].id}/${item}.jpg`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Gallery',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapState(['chooseShip']),
  },
};
</script>
