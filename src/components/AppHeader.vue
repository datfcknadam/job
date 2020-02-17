<template>
  <v-app-bar
    color="#ececec"
  >
    <v-img
      alt="Речной порт"
      class="shrink mt-1 hidden-sm-and-down"
      contain
      min-width="100"
      src="../assets/logo.png"
      width="auto"
    />
    <v-toolbar-title class="header-name" v-text="'Аренда теплоходов'"/>
  </v-app-bar>  
</template>

<style scoped>
.header-name {
  font: 30px/70px 'Roboto', sans-serif;
  font-weight: 500;
  color: #004d9f;
  transition: .15s color;
  position: absolute;
  text-align: center;
  width: 100%;
}
</style>