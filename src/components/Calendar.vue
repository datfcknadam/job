<template>
  <div class="calendar">
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        v-show="currentSet !== 0"
        icon
        @click="--currentSet"
      >
        <v-icon
          size="50"
          v-text="'mdi-chevron-left'"
        />
      </v-btn>
      <v-col
        v-show="currentSet === 0"
        cols="auto"
        align="center"
      >
        <h2>Дата аренды:</h2>
        <v-date-picker
          v-model="picker"
          :landscape="$vuetify.breakpoint.smAndUp"
          :min="currentDate"
          locale="ru"
        />
      </v-col>
      <v-col
        v-show="currentSet === 1"
        cols="auto"
        align="center"
      >
        <h2>Начало аренды:</h2>
        <v-time-picker
          v-model="start"
          :landscape="$vuetify.breakpoint.smAndUp"
          locale="ru"
          format="24hr"
          min="8:00"
          max="23:00"
        />
      </v-col>
      <v-col
        v-show="currentSet === 2"
        cols="auto"
        align="center"
      >
        <h2>Конец аренды:</h2>
        <v-time-picker
          v-model="end"
          :landscape="$vuetify.breakpoint.smAndUp"
          locale="ru"
          format="24hr"
          :min="minTime"
          :max="'23:00'"
        />
      </v-col>
      <v-btn
        v-show="currentSet !== 2"
        icon
        @click="currentSet++"
      >
        <v-icon
          size="50"
          v-text="'mdi-chevron-right'"
        />
      </v-btn>
    </v-row>
    <div
      v-show="currentSet === 2"
      class="string-date"
    >
      <p>
        Вы забронировали теплоход "{{ ships[chooseShip].name }}"
        на {{ picker }} ({{ getWeekDay }})
      </p>
      <p>С {{ start }} до {{ end }} часов ({{ mathHour }}ч)</p>
      <p>
        Аренда теплохода: c ПН-ЧТ = {{ ships[chooseShip].price }}руб/час (более 3-х часов {{ (ships[chooseShip].price * 0.7).toFixed() }}руб/час),<br>
        с ПТ-ВС = {{ (ships[chooseShip].price * 1.1).toFixed() }}руб/час.
        (более 3-х часов {{ (ships[chooseShip].price * 0.7 * 1.1).toFixed() }}руб/час)
      </p>
      <p>Стоимость аренды будет: {{ mathRent }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Calendar',
  data() {
    return {
      currentSet: 0,
      picker: new Date().toISOString().substr(0, 10),
      start: "08:00",
      end: "23:59",
      currentDate: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    ...mapState(['chooseShip', 'ships']),
    mathRent() {
      let disExCharge;
      let exChargeWeek;
      let weekend = this.getWeekDay === 'ПТ' ||
        this.getWeekDay === 'СБ'
        || this.getWeekDay === 'ВС';

      this.mathHour >= 3 ? disExCharge = 0.7 : disExCharge = 1;
      weekend ? exChargeWeek = 1.1 : exChargeWeek = 1;

      let price = (this.ships[this.chooseShip].price * exChargeWeek * disExCharge).toFixed();
      let sumRent = price * this.mathHour;

      return `${price}руб * ${this.mathHour}ч = ${sumRent}руб`;
    },
    minTime() {
      if (this.start === "23:00") {
        return "23:59";
      }
      return this.addHour(this.start);
    },
    getWeekDay() {
      let transformDate = new Date(this.picker);
      let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      return days[transformDate.getDay()];
    },
    mathHour() {
      let splitStart = this.start.split(":");
      let splitEnd = this.end.split(":");
      let hourStart = parseInt(splitStart[0], 10);
      let hourEnd = parseInt(splitEnd[0], 10);

      return (hourEnd - hourStart).toString();
    },
  },
  methods: {
    addHour(h) {
      let date = new Date()
      let splitH = h.split(":");
      let hour = parseInt(splitH[0], 10);
      date.setHours(hour + 1);
      return `${date.getHours().toString()}:${splitH[1]}`;
    },
  },
};
</script>

<style lang="sass">
.calendar
  display: flex
  justify-content: center
  h2
    margin-bottom: 20px
  .string-date
    position: absolute
    right: 10vw
</style>
