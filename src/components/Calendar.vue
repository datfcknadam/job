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
          :max="'23:59'"
        />
      </v-col>
      <a
        v-smooth-scroll
        href="#result"
      >
        <v-btn
          v-show="currentSet !== 2"
          icon
          @click="currentSet++; currentSet === 2 ? CHANGE_RESULT(true) : {}"
        >
          <v-icon
            size="50"
            v-text="'mdi-chevron-right'"
          />
        </v-btn>
      </a>
    </v-row>
    <div
      v-show="result"
      id="result"
      class="string-date"
    >
      <h2>Итого:</h2>
      <p>
        Вы забронировали теплоход
        <span
          class="value"
          v-text="ships[chooseShip].name"
        />
        на
        <span
          class="value"
          v-text="picker"
        />
        (<span
          class="value"
          v-text="getWeekDay"
        />)
      </p>
      <p>
        С <span
          class="value"
          v-text="start"
        /> до
        <span
          class="value"
          v-text="end"
        /> часов
        (<span
          class="value"
          v-text="`${mathHour}ч`"
        />)
      </p>
      <p>
        Аренда теплохода: c ПН-ЧТ =
        <span
          class="value"
          v-text="addRublPerHour(ships[chooseShip].price)"
        />
        (после 3-х часов
        <span
          class="value"
          v-text="addRublPerHour((ships[chooseShip].price * 0.7).toFixed())"
        />)
        <br>
        с ПТ-ВС =
        <span
          class="value"
          v-text="addRublPerHour((ships[chooseShip].price * 1.1).toFixed())"
        />
        (после 3-х часов
        <span
          class="value"
          v-text="addRublPerHour((ships[chooseShip].price * 0.7 * 1.1).toFixed())"
        />)
      </p>
      <p>
        Стоимость аренды будет:
        <span
          class="value"
          v-text="`${mathRent}руб`"
        />
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Calendar',
  data() {
    return {
      currentSet: 0,
      picker: new Date().toISOString().substr(0, 10),
      start: "08:00",
      end: "09:00",
      currentDate: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    ...mapState(['chooseShip', 'ships', 'result']),
    mathRent() {
      let disExCharge = 0;
      let exChargeWeek = 0;
      let sumRent = 0;
      let weekend = this.getWeekDay === 'ПТ' ||
        this.getWeekDay === 'СБ'
        || this.getWeekDay === 'ВС';

      this.mathHour > 3 ? disExCharge = 0.7 : disExCharge = 1;
      weekend ? exChargeWeek = 1.1 : exChargeWeek = 1;

      let price  = (this.ships[this.chooseShip].price * exChargeWeek);
      console.log(price);
      for (let i = 0; i < this.mathHour; i++) {
        if (i < 3) {
          sumRent = sumRent + price;
        } else {
          sumRent = sumRent + (price * disExCharge);
        }
      }
      if (this.mathHour > 3) {
        return `${price.toFixed()}руб x 3ч + ${(price * disExCharge).toFixed()}руб x ${this.mathHour - 3}ч  = ${sumRent.toFixed()}`;
      }
      else {
        return `${price.toFixed()}руб x ${this.mathHour}ч = ${sumRent.toFixed()}`;
      }
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
  watch: {
    start() {
      if (this.start === "23:00") {
        this.end = "23:59";
      } else {
        this.end = this.addHour(this.start);
      }
    },
  },
  methods: {
    ...mapMutations(['CHANGE_RESULT']),
    addHour(h) {
      let date = new Date()
      let splitH = h.split(":");
      let hour = parseInt(splitH[0], 10);
      date.setHours(hour + 1);
      return `${date.getHours().toString()}:${splitH[1]}`;
    },
    addRublPerHour(value) {
      return `${value}руб/час`
    },
  },
};
</script>

<style lang="sass">
a
  text-decoration: none
.calendar
  display: flex
  justify-content: center
  flex-direction: column
  h2
    margin-bottom: 20px
  .string-date
    margin-top: 20px
    .value
      color: #1976d2
</style>
