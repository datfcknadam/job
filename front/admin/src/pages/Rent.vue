<template>
  <div class="pages d-flex flex-column">
    <v-data-table
      :headers="headers"
      :items="setRent"
      :loading="rents.length === 0"
    >
      <template v-slot:item.date="{ item }">
        <span v-text="formatDate(item.date)"/>
      </template>
      <template v-slot:item.sum="{ item }">
        <span v-text="`${item.sum} руб`"/>
      </template>
      <template v-slot:item.ship_id="{ item }">
        <router-link to="/ship" v-text="item.ship_id"/>
      </template>
      <template v-slot:item.editBtn="{item}">
        <edit-rent :_id="item._id" :propsData="item"/>
      </template>
      <template v-slot:item.delBtn="{item}">
        <delete-btn :_id="item._id" action="Rent"/>
      </template>
    </v-data-table>
    <status/>
  </div>
</template>

<script>
import sha from 'js-sha1';
import { mapState } from 'vuex';
import Status from '../components/Status';
import DeleteBtn from '../components/DeleteBtn';
import EditRent from '../components/Rent/EditRent';

export default {
  name: 'Rent',
  components: {
    Status,
    DeleteBtn,
    EditRent,
  },
  data() {
    return {
      currentRents: [],
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Дата', value: 'date' },
        { text: 'Сумма', value: 'sum' },
        { text: 'Начало', value: 'start' },
        { text: 'Конец', value: 'end' },
        { text: 'Почта', value: 'email' },
        { text: 'Телефон', value: 'phone' },
        { text: 'ID Теплохода', value: 'ship_id' },
        { text: 'Дата заявки', value: 'created'},
        { text: '', value: 'editBtn' },
        { text: '', value: 'delBtn' },
      ],
    };
  },
  computed: {
    ...mapState(['rents']),
    setRent() {
      let { rents, currentRents } = this;
      const shaSh = sha(rents);
      const shaCurrSh = sha(currentRents);
      if (shaSh !== shaCurrSh) {
        currentRents = rents;
      }
      return currentRents;
    }
  },
  methods: {
    formatDate(date) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
    },
  },
  mounted() {
    this.$store.dispatch('getRent');
  },
};
</script>
