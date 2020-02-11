<template>
  <v-toolbar
    color="#ececec"
    dark
  >
    <v-toolbar-title>
      <v-img
        alt="Речной порт"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="../assets/logo.png"
        width="auto"
      />
    <p class="header-name">Аренда теплоходов</p>
    </v-toolbar-title>
  </v-toolbar>  
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