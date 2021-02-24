<template>
  <v-container fluid class="pa-0">
    <v-img :height="screenHeight" src="@/assets/riven-0.jpg" />
  </v-container>
</template>

<script>
export default {
  name: "MainPage",

  data: () => ({}),

  computed: {
    screenHeight() {
      return this.$vuetify.breakpoint.height;
    },
  },
};
</script>