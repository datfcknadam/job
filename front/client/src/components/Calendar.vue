<template>
  <div class="calendar" v-if="ships.length">
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
          :value="dataRent.date"
          :landscape="$vuetify.breakpoint.smAndUp"
          :min="currentDate"
          locale="ru"
          @input="SET_DATE_RENT"
        />
      </v-col>
      <v-col
        v-show="currentSet === 1"
        cols="auto"
        align="center"
      >
        <h2>Начало аренды:</h2>
        <v-time-picker
          :value="dataRent.start"
          :landscape="$vuetify.breakpoint.smAndUp"
          locale="ru"
          format="24hr"
          :min="minStart"
          max="23:00"
          @input="SET_START_RENT"
        />
      </v-col>
      <v-col
        v-show="currentSet === 2"
        cols="auto"
        align="center"
      >
        <h2>Конец аренды:</h2>
        <v-time-picker
          :value="dataRent.end"
          :landscape="$vuetify.breakpoint.smAndUp"
          locale="ru"
          format="24hr"
          :min="minTime"
          :max="'23:59'"
          @input="SET_END_RENT"
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
          v-text="ships[chooseShip].name || name"
        />
        на
        <span
          class="value"
          v-text="dataRent.date"
        />
        (<span
          class="value"
          v-text="getWeekDay"
        />)
      </p>
      <p>
        С <span
          class="value"
          v-text="dataRent.start"
        /> до
        <span
          class="value"
          v-text="dataRent.end"
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
      currentDate: new Date().toISOString().substr(0, 10),
      rentToday: false,
    };
  },
  computed: {
    ...mapState(['chooseShip', 'ships', 'result', 'dataRent']),
    mathRent() {
      let disExCharge = 0;
      let exChargeWeek = 0;
      let sumRent = 0;
      let weekend = this.getWeekDay === 'ПТ'
        || this.getWeekDay === 'СБ'
        || this.getWeekDay === 'ВС';

      this.mathHour > 3 ? disExCharge = 0.7 : disExCharge = 1;
      weekend ? exChargeWeek = 1.1 : exChargeWeek = 1;

      let price  = (this.ships[this.chooseShip].price * exChargeWeek);

      for (let i = 0; i < this.mathHour; i++) {
        if (i < 3) {
          sumRent = sumRent + price;
        } else {
          sumRent = sumRent + (price * disExCharge);
        }
      }
      this.SET_SUM_RENT(sumRent.toFixed());

      if (this.mathHour > 3) {
        return `${price.toFixed()}руб x 3ч + ${(price * disExCharge).toFixed()}руб x ${this.mathHour - 3}ч  = ${sumRent.toFixed()}`;
      }
      else {
        return `${price.toFixed()}руб x ${this.mathHour}ч = ${sumRent.toFixed()}`;
      }
    },
    minTime() {
      if (this.dataRent.start === "23:00") {
        return "23:59";
      }
      return this.addHour(this.dataRent.start);
    },
    getWeekDay() {
      const transformDate = new Date(this.dataRent.date);
      const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
      return days[transformDate.getDay()];
    },
    minStart() {
      const today = Date.parse(new Date().toLocaleString().split(',')[0].split('.').reverse().join('-'));
      const dayRent = Date.parse(this.dataRent.date);
      if (today === dayRent) {
        return this.addHour(new Date().toLocaleTimeString().slice(0, 5));
      }
      return '08:00';
    },
    mathHour() {
      const splitStart = this.dataRent.start.split(":");
      const splitEnd = this.dataRent.end.split(":");
      const hourStart = parseInt(splitStart[0], 10);
      const hourEnd = parseInt(splitEnd[0], 10);

      return (hourEnd - hourStart).toString();
    },
  },
  watch: {
    deep: true,
    dataRent() {
      const { dataRent } = this;
      if (dataRent.start === "23:00") {
        dataRent.end = "23:59";
      } else {
        dataRent.end = this.addHour(dataRent.start);
      }
    },
  },
  methods: {
    ...mapMutations(['CHANGE_RESULT', 'SET_START_RENT', 'SET_END_RENT', 'SET_SUM_RENT', 'SET_DATE_RENT']),
    addHour(h) {
      const date = new Date()
      const splitH = h.split(":");
      const hour = parseInt(splitH[0], 10);
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
