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
        <v-card-title class="headline">Редактировать аренду</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="data.email"
              :rules="[rules.required]"
              label="email"
            />
            <v-text-field
              v-model="data.phone"
              label="Телефон"
            />
            <v-text-field
              v-model="getDate"
              type="date"
              label="Дата"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="data.end"
              label="Окончание"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="data.start"
              label="Начало"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="data.sum"
              type="number"
              label="Сумма"
              suffix="руб"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="data.ship_id"
              label="ID теплохода"
              :rules="[rules.required]"
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
export default {
  name: 'EditRent',
  props: {
    _id: String,
    propsData: {
      type: Object,
      default: () => ({}),
    },
  },
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
      data: {},
      isChange: false,
    };
  },
  computed: {
    getDate: {
      set(value) {
        this.data.date = value;
      },
      get() {
        return this.formatDate(this.data.date)
      }
    },
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
    validation() {
      this.$store.dispatch('editRent', this.data);
    },
  },
  updated() {
    this.data = this.propsData;
  },
}
</script>
