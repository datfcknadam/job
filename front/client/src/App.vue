<template>
  <div id="app">
    <v-app id="inspire">
      <v-card class="overflow-hidden">
        <app-header />
        <app-content />
        <success />
      </v-card>
    </v-app>
  </div>
</template>

<script>
import AppContent from './pages/AppContent.vue';
import AppHeader from './pages/AppHeader.vue';
import Success from './components/Success';

export default {
  name: 'App',
  components: {
    AppContent,
    AppHeader,
    Success,
  },
};
</script>
<style lang="sass">
#app
  max-width: 100vw
</style>
