<template>
<div id="app">
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <AppHeader/>
      <AppContent/>
    </v-card>
  </v-app>
</div>
</template>

<script>
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';

export default {
  name: 'App',
  components: {
    AppContent,
    AppHeader,
  },
};
</script>
