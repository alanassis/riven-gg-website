<template>
  <v-container fluid class="pa-0">
    <v-img :height="screenHeight" src="@/assets/riven-0.jpg">
      <v-container fill-height v-if="summoner">
        <v-row justify="center" align="center">
          <v-card width="75vmin" height="75vmin"> </v-card>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
export default {
  name: "MainPage",

  data: () => ({}),

  props: {
    summoner: Object,
  },

  computed: {
    screenHeight() {
      return this.$vuetify.breakpoint.height;
    },
  },
};
</script>