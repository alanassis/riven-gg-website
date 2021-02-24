<template>
  <v-container fluid class="pa-0">
    <v-img :height="screenHeight" src="@/assets/riven-0.jpg">
      <v-container fill-height v-if="summoner">
        <v-row justify="center" align="center">
          <v-card width="75vmin" height="75vmin" class="pa-4">
            <v-row justify="center">
              <v-avatar size="17vmin">
                <v-img src="@/assets/dawnbringer-logo.png" />
              </v-avatar>
              <v-avatar size="30vmin">
                <v-img :src="summoner.profileIcon" />
              </v-avatar>
              <v-avatar size="17vmin">
                <v-img src="@/assets/dawnbringer-logo.png" />
              </v-avatar>
              <div>
                <v-card-title class="text-h4">{{
                  summoner.nickname
                }}</v-card-title>
              </div>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
import LeagueRepository from "../services/leagueRepository";

export default {
  name: "MainPage",

  data: () => ({
    leagues: {},
  }),

  props: {
    summoner: Object,
  },

  methods: {
    getLeague() {
      LeagueRepository.getLeague(this.summoner)
        .then((res) => {
          this.leagues = res.data;
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    showError(error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(error.response);
      }
    },
  },

  computed: {
    screenHeight() {
      return this.$vuetify.breakpoint.height;
    },
  },

  watch: {
    summoner(newSummoner) {
      if (newSummoner && newSummoner.id) {
        this.getLeague();
      }
    },
  },
};
</script>