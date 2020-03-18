<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        icon
      >
        <v-icon v-text="'mdi-pencil'"/>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Редактировать теплоход</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="name"
            :rules="[rules.required]"
            label="Название корабля"
          />
          <v-file-input
            v-model="avatar"
            accept="image/*"
            label="Изображение корабля"
            chips
            :rules="[rules.required]"
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
  name: 'EditShip',
  data() {
    return {
      dialog: false,
      rules: {
        required: value => !!value || 'Обязательное поле.',
      },
      name: null,
      loadGallery: false,
      loadAvatar: false,
      avatar: null,
      description: null,
      price: null,
      volume: null,
      gallery: [],
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
