<template>
  <v-snackbar
    :value="status"
    :color="getColor"
    top
    right
  >
  <span v-text="getText"/>
  </v-snackbar>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Status',
  computed: {
    ...mapState(['status']),
    getColor() {
      if (this.status === 200) return 'green lighten-2';
      return 'red lighten-2';
    },
    getText() {
      if (this.status === 200) return 'Успешно';
      return 'Не получилось';
    }
  },
}
</script>
