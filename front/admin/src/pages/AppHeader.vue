<template>
  <v-app-bar
    :key="Math.random()"
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
        >
        <router-link to="/" class="nav-link" v-text="'Аренда'"/>
      </v-btn>
      <!-- <v-btn text :disabled="routerPath === '/client'">
        <router-link to="/client" class="nav-link" v-text="'Клиенты'"/>
      </v-btn> -->
      <v-btn text :disabled="routerPath === '/ship'">
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
      intervalId: 0,
      routerPath: '/',
    };
  },
  watch: {
    $route(to) {
      this.routerPath = to.path;
    },
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
