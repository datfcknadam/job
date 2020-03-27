<template>
  <v-dialog :value="success" max-width="400">
    <v-card>
      <v-card-title class="headline">Успешно!</v-card-title>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Success',
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapState(['success']),
  },
};
</script>
