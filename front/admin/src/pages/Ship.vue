<template>
  <div class="pages d-flex flex-column">
    <v-data-table
      :headers="headers"
      :items="setShips()"
      :loading="ships.length === 0"
    >
      <template v-slot:item._id="{ item }">
        <div v-text="item._id" class="item-_id"/>
      </template>
      <template v-slot:item.name="{ item }">
        <div v-text="item.name"/>
      </template>
      <template v-slot:item.avatar="{ item }">
        <div class="data-image">
          <v-img
            :src="urlBackend + item.avatar"
            :alt="'Фото не найдено'"
            contain
            width="50px"
            height="50px"
          ></v-img>
        </div>
      </template>
      <template v-slot:item.description="{ item }">
        <div v-text="item.description" class="item-description"/>
      </template>
      <template v-slot:item.price="{ item }">
        <div v-text="item.price"/>
      </template>
      <template v-slot:item.volume="{ item }">
        <div v-text="item.volume"/>
      </template>
      <template v-slot:item.gallery="{ item }">
        <div v-text="item.gallery"/>
      </template>
      <template v-slot:item.editBtn="{item}">
        <edit-ship :_id="item._id"/>
      </template>
      <template v-slot:item.delBtn="{item}">
        <delete-ship :_id="item._id"/>
      </template>
    </v-data-table>
    <add-new-ship />
    <status/>
  </div>
</template>

<script>
import AddNewShip from '../components/Ship/AddNewShip';
import EditShip from '../components/Ship/EditShip';
import DeleteShip from '../components/Ship/DeleteShip';
import { mapState } from 'vuex';
import Status from '../components/Status';
import sha from 'js-sha1';

export default {
  name: 'Ship',
  components: {
    AddNewShip,
    Status,
    EditShip,
    DeleteShip,
  },
  data() {
    return {
      currentShips: [],
      headers: [
        { text: 'ID', value: '_id' },
        { text: 'Название', value: 'name' },
        { text: 'Изображение', value: 'avatar' },
        { text: 'Описание', value: 'description', class: 'description' },
        { text: 'Цена за час', value: 'price' },
        { text: 'Макс.чел', value: 'volume' },
        { text: 'Галерея', value: 'gallery' },
        { text: '', value: 'editBtn' },
        { text: '', value: 'delBtn' },
      ],
    };
  },
  computed: {
    ...mapState(['ships', 'urlBackend']),
  },
  methods: {
    setShips() {
      let {ships, currentShips} = this;
      const shaSh = sha(ships);
      const shaCurrSh = sha(currentShips);
      if (shaSh !== shaCurrSh) {
        currentShips = ships;
      }
      return currentShips;
    }
  },
};
</script>

<style lang="sass">
.text-start
  .item-description
    width: 120px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .item-_id
    width: auto
</style>
