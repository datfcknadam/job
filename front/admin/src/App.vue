<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="overflow-hidden">
        <AppHeader />
        <router-view />
      </v-card>
    </v-app>
  </div>
</template>

<script>
import AppHeader from './pages/AppHeader';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style>
.pages {
  height: 100vh;
  width: 100vw;
}
a {
  text-decoration: none;
}
</style>
