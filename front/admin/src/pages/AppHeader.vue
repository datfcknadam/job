<template>
  <v-app-bar
    color="#ececec"
    class="mb-5"
  >
    <v-toolbar-title
      class="header-name"
      v-text="'Панель администратора'"
    />
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        text
        :disabled="routerPath === '/'"
        @click="console"
        >
        <router-link to="/" class="nav-link" v-text="'Аренда'"/>
      </v-btn>
      <v-btn text :disabled="routerPath === '/client'"  @click="console">
        <router-link to="/client" class="nav-link" v-text="'Клиенты'"/>
      </v-btn>
      <v-btn text :disabled="routerPath === '/ship'" @click="console">
        <router-link to="/ship" class="nav-link" v-text="'Теплоходы'"/>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      routerPath: this.$router.currentRoute.path,
      intervalId: 0,
    };
  },
  methods: {
    console() {
      this.routerPath = this.$router.currentRoute.path;
    },
  },
  mounted() {
      let {$router, intervalId} = this;
      if (intervalId) clearInterval(intervalId);
      if ($router.currentRoute.path === "/") return;
      if ($router.currentRoute.path === "/client") return;
      if ($router.currentRoute.path === "/ship") {
        this.$store.dispatch('getShips');
        intervalId = setInterval(() => this.$store.dispatch('getShips'), 5000);
      }
  },
  watch: {
    routerPath() {
      let {$router, intervalId} = this;
      if (intervalId) clearInterval(intervalId);
      if ($router.currentRoute.path === "/") return;
      if ($router.currentRoute.path === "/client") return;
      if ($router.currentRoute.path === "/ship") {
        this.$store.dispatch('getShips');
        intervalId = setInterval(() => this.$store.dispatch('getShips'), 5000);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
<style scoped>
.header-name {
  font: 30px/70px 'Roboto', sans-serif;
  font-weight: 500;
  color: #004d9f;
  transition: .15s color;
  position: absolute;
  text-align: left;
  width: 100%;
}
.nav-link {
  height: -webkit-fill-available;
  display: flex;
  align-items: center;
}
.v-btn--disabled > span > a {
  color: #9c9c9c;
}
</style>
