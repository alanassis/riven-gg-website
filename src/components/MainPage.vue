<template>
  <v-container fluid class="pa-0">
    <v-img :height="screenHeight" src="@/assets/riven-0.jpg">
      <v-container fill-height v-if="summoner">
        <v-row justify="center" align="center">
          <v-card
            width="75vmin"
            height="90vmin"
            class="pa-4"
            color="rgb(255, 255, 255, 0.75)"
          >
            <v-row justify="center" dense>
              <v-col>
                <span v-show="leagues.length > 0">
                  <div class="d-flex justify-center">
                    <v-avatar size="17vmin">
                      <v-img src="@/assets/dawnbringer-logo.png" />
                    </v-avatar>
                  </div>
                  <v-card-title class="text-subtitle-2 justify-center mt-n4">{{
                    `${soloDuoLeague.tier} ${soloDuoLeague.rank}`
                  }}</v-card-title>
                </span>
              </v-col>
              <v-avatar size="30vmin">
                <v-img :src="summoner.profileIcon" />
              </v-avatar>
              <v-col>
                <span v-show="leagues.length > 0">
                  <div class="d-flex justify-center">
                    <v-avatar size="17vmin">
                      <v-img src="@/assets/dawnbringer-logo.png" />
                    </v-avatar>
                  </div>
                  <v-card-title class="text-subtitle-2 justify-center mt-n4">{{
                    `${flexLeague.tier} ${flexLeague.rank}`
                  }}</v-card-title>
                </span>
              </v-col>
              <v-col class="text-center" cols="12">
                <v-card-title class="text-h4 justify-center">{{
                  summoner.nickname
                }}</v-card-title>
              </v-col>
              <v-col cols="12">
                <v-card color="gray">
                  <v-virtual-scroll
                    :bench="benched"
                    :items="items"
                    height="300"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item :key="item">
                        <v-list-item-action class="mr-2">
                          <v-btn fab small depressed color="primary">
                            {{ item }}
                          </v-btn>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title class="text-subtitle-2">
                            RIVEN
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title class="text-center">
                            15/2/12
                          </v-list-item-title>
                          <v-list-item-title class="text-center">
                            266cs
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <strong class="text-center">VS</strong>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title class="text-center">
                            15/2/12
                          </v-list-item-title>
                          <v-list-item-title class="text-center">
                            266cs
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title class="text-subtitle-2 text-end">
                            RIVEN
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action class="ml-2">
                          <v-btn fab small depressed color="primary">
                            {{ item }}
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                  </v-virtual-scroll>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
import ProfileRepository from "../services/profileRepository";

export default {
  name: "MainPage",

  data: () => ({
    leagues: [],
  }),

  props: {
    summoner: Object,
  },

  methods: {
    getLeague() {
      ProfileRepository.getLeague(this.summoner)
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
    items() {
      return Array.from({ length: 25 }, (k, v) => v + 1);
    },
    length() {
      return 7000;
    },
    screenHeight() {
      return this.$vuetify.breakpoint.height;
    },
    soloDuoLeague() {
      for (let i of this.leagues) {
        if (i.queueType === "RANKED_SOLO_SR") return i;
      }
      return { tier: "UNRANKED", rank: "" };
    },
    flexLeague() {
      for (let i of this.leagues) {
        if (i.queueType === "RANKED_FLEX_SR") return i;
      }
      return { tier: "UNRANKED", rank: "" };
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