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
          :max="end"
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
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentSet: 0,
      picker: new Date().toISOString().substr(0, 10),
      start: "08:00",
      end: "24:00",
      currentDate: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    minTime() {
      return this.addHours(this.start);
    },
  },
  methods: {
    addHours(h) {
      this.setHours(this.getHours() + h);
      return this;
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
</style>
