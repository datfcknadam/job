<template>
  <v-dialog :value="success.value" width="450px">
    <v-card>
      <v-card-title v-text="getText"/>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Status',
  computed: {
    ...mapState(['success']),
    getColor() {
      if (this.success.success) return 'green lighten-2';
      return 'red lighten-2';
    },
    getText() {
      if (this.success.success) return 'Аренда выполнена успешно! Все детали на вашей электронной почте';
      return 'Что то пошло не так...';
    },
  },
}
</script>
