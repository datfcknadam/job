<template>
  <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
        >
          <v-icon v-text="'mdi-pencil'" @click="getData()"/>
        </v-btn>
      </template>
      <v-card :loading="loadData">
        <v-card-title class="headline">Редактировать теплоход</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              :value="dataShip.name"
              :rules="[rules.required]"
              label="Название корабля"
              @input="SET_NAME"
            />
            <v-file-input
              v-model="prepareData"
              accept="image/*"
              label="Изображение корабля"
              chips
              :loading="loadAvatar"
              @change="uploadFile(avatar, 'avatar')"
            />
            <v-textarea
              :value="dataShip.description || ''"
              label="Описание"
              @input="SET_DESCRIPTION"
            />
            <v-text-field
              :value="dataShip.price"
              type="number"
              label="Цена"
              suffix="руб/час"
              :rules="[rules.required]"
              @input="SET_PRICE"
            />
            <v-text-field
              :value="dataShip.volume"
              type="number"
              label="Вместительность"
              suffix="человек"
              :rules="[rules.required]"
              @input="SET_VOLUME"
            />
            <v-file-input
              :value="dataShip.gallery"
              label="Галерея"
              accept="image/*"
              chips
              multiple
              :loading="loadGallery"
              @change="uploadFile(gallery, 'gallery')"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="validation">Редактировать</v-btn>
          <v-btn color="primary darken-1" text @click="dialog = false">Отменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AddNewShip',
  data() {
    return {
      dialog: false,
      rules: {
        required: value => !!value || 'Обязательное поле.',
      },
      loadGallery: false,
      loadAvatar: false,
      loadData: true,
      avatar: {},
      gallery: [],
    };
  },
  props: {
    _id: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    ...mapMutations([
      'SET_AVATAR_NAME',
      'SET_NAME',
      'SET_PRICE',
      'SET_VOLUME',
      'SET_DESCRIPTION'
    ]),
    loading(name, loading) {
      name === 'avatar' ? this.loadAvatar = loading : this.loadGallery = loading;
    },
    generateData(files, name) {
      if (!files || !name) return;

      let formData = new FormData();

      files.forEach((element) => {
        formData.append(name, element);
      });
      return formData;
    },
    validation() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('editShip')
          .then(() => {
            this.dialog = false;
            setTimeout(this.$store.dispatch('getShips'), 2000);
          });
      }
    },
    uploadFile(value, name) {
      let that = this;
      that.loading(name, true);
      this.$store.dispatch(
        'uploadImage',
        this.generateData([value],
        name,
      )).then(() => {
        that.loading(name, false);
      });
    },
    getData() {
      if (this._id) {
        this.$store.dispatch('getDataShip', this._id )
          .then(() => this.loadData = false);
      }
      this.loadData = true;
    },
  },
  computed: {
    ...mapState(['dataShip']),
    prepareData: {
      set(value) {
        this.avatar = value;
      },
      get() {
        return this.dataShip.avatar;
      },
    },
  },
};
</script>
