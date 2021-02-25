<template>
  <v-app>
    <v-navigation-drawer :mini-variant.sync="mini" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            src="@/assets/dawnbringer-logo.png"
            @click="mini = !mini"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="ml-6 font-weight-black"
          >RIVEN.GG</v-list-item-title
        >
      </v-list-item>

      <v-divider></v-divider>

      <v-container v-show="!mini">
        <v-row justify="center">
          <span class="mt-12 text-h6 font-weight-bold">Buscar invocador</span>
          <v-col cols="12">
            <v-text-field
              label="Nome de invocador"
              v-model="searchSummonerData.nickname"
              class="mx-4 mt-2 rounded-lg text-subtitle-1 no-border"
              filled
            />
          </v-col>
          <v-col cols="12">
            <v-select
              label="Região"
              v-model="searchSummonerData.region"
              :items="regions"
              class="mx-4 mt-n10 rounded-lg no-border"
              filled
            />
          </v-col>
          <v-col cols="12">
            <v-btn
              color="#d13639"
              min-height="0"
              width="50"
              height="50"
              class="rounded-lg"
              style="min-width: 0; margin-left: 35%"
              @click="searchSummoner"
              :disabled="searchButtonDisabled"
              :dark="!searchButtonDisabled"
              depressed
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <v-main>
      <MainPage :summoner="summoner" />
    </v-main>
  </v-app>
</template>

<script>
import MainPage from "./components/MainPage";
import ProfileRepository from "./services/profileRepository";

export default {
  name: "App",

  components: {
    MainPage,
  },

  data: () => ({
    mini: false,
    waitingForSearch: false,
    searchSummonerData: {
      nickname: "Alankazam",
      region: "br1",
    },
    regions: [
      { text: "Brazil", value: "br1" },
      { text: "EU East", value: "eu_east" },
    ],
    summoner: null,
  }),

  methods: {
    searchSummoner() {
      this.waitingForSearch = true;
      ProfileRepository.getSummoner(this.searchSummonerData)
        .then((res) => {
          this.summoner = res.data;
          this.mini = true;
        })
        .catch((err) => {
          this.showError(err);
        })
        .finally(() => {
          this.waitingForSearch = false;
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
    searchButtonDisabled() {
      if (this.waitingForSearch) return true;
      if (!this.searchSummonerData.nickname) return true;
      if (!this.searchSummonerData.region) return true;
      return false;
    },
  },
};
</script>

<style>
.no-border.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none;
}
.no-border.v-text-field > .v-input__control > .v-input__slot:after {
  border-style: none;
}
</style>