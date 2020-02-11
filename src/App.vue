<template>
  <v-app>
    <AppHeader/>
    <AppContent/>
  </v-app>
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
