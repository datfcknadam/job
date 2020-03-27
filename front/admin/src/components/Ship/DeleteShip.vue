<template>
  <v-dialog v-model="dialog" max-width="300">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
        >
          <v-icon v-text="'mdi-close'" @click="getData()"/>
        </v-btn>
      </template>
      <v-card :loading="loadData">
        <v-card-title class="headline">Удалить теплоход</v-card-title>
        <v-card-text>
          Вы уверены что хотите удалить теплоход {{_id}}?
        </v-card-text>
        <v-card-actions>
          <v-btn v-text="'Да'" @click="del()"/>
          <v-btn v-text="'Нет'" @click="dialog = false"/>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DeleteShip',
  data() {
    return {
      dialog: false,
      loadData: false,
    };
  },
  props: {
    _id: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    getData() {
      if (this._id) {
        this.$store.dispatch('getDataShip', this._id )
          .then(() => this.loadData = false);
      }
      this.loadData = true;
    },
    del() {
      if (this._id) {
        this.$store.dispatch('deleteShip', this._id)
          .then(() => {
            this.dialog = false;
            setTimeout(this.$store.dispatch('getShips'), 2000);
          })
      }
    }
  },
};
</script>
