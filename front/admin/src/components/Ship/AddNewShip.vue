<template>
  <v-dialog v-model="dialog" max-width="400">
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          v-text="'Добавить теплоход'"
          class="align-self-end mr-5"
        />
      </template>
      <v-card>
        <v-card-title class="headline">Добавить новый теплоход</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              label="Название корабля"
            />
            <v-file-input
              v-model="avatar"
              accept="image/*"
              label="Изображение корабля"
              chips
              :loading="loadAvatar"
              @change="uploadFile(avatar, 'avatar')"
            />
            <v-textarea
              v-model="description"
              label="Описание"
            />
            <v-text-field
              v-model="price"
              type="number"
              label="Цена"
              suffix="руб/час"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="volume"
              type="number"
              label="Вместительность"
              suffix="человек"
              :rules="[rules.required]"
            />
            <v-file-input
              v-model="gallery"
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
          <v-btn color="primary darken-1" text @click="validation">Добавить</v-btn>
          <v-btn color="primary darken-1" text @click="dialog = false">Отменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>

export default {
  name: 'AddNewShip',
  data() {
    return {
      dialog: false,
      rules: {
        required: value => !!value || 'Обязательное поле.',
      },
      name: null,
      loadGallery: false,
      loadAvatar: false,
      avatar:  null,
      description:  null,
      price: null,
      volume: null,
      gallery: [],
    };
  },
  methods: {
    prepare() {
      let value = this.dataShip.avatar;
      let name = value.split('\\')[2];
      return {
        name,
        type: 'image/jpeg',
        size: 0,
      };
    },
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
        const { name, description, price, volume } = this;
        if (this.avatar) {
          this.$store.dispatch('createNewShip', {
            name,
            description,
            price,
            volume,
          }).then(() => {
              this.dialog = false;
              setTimeout(this.$store.dispatch('getShip'), 1000)
            });
        }
      }
    },
    uploadFile(value, name) {
      const that = this;
      that.loading(name, true);
      this.$store.dispatch(
        'uploadImage',
        this.generateData([value],
        name,
      )).then(() => {
        that.loading(name, false);
      });
    },
  },
};
</script>
