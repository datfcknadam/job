<template>
  <div class="pages d-flex flex-column">
    <v-data-table
      :headers="headers"
      :items="setRent()"
      :loading="ships.length === 0"
    >
    </v-data-table>
    <status/>
  </div>
</template>

<script>
import sha from 'js-sha1';
import { mapState } from 'vuex';
import Status from '../components/Status';

export default {
  name: 'Client',
  components: {
    Status,
  },
  data() {
    return {
      currentRents: [],
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'ФИО', value: 'name' },
        { text: 'ID Тепохода', value: 'avatar' },
        { text: 'Продолжительность', value: 'duration' },
        { text: 'Человек', value: 'price' },
        { text: 'Цена', value: 'volume' },
        { text: 'Комментарии', value: 'description', class: 'description' },
      ],
    };
  },
  computed: {
    ...mapState(['rents']),
  },
  methods: {
    setRent() {
      let {rents, currentRents} = this;
      const shaSh = sha(rents);
      const shaCurrSh = sha(currentRents);
      if (shaSh !== shaCurrSh) {
        currentRents = rents;
      }
      return currentRents;
    }
  },
};
</script>
