<template>
  <v-container fluid class="pa-0">
    <v-img :height="screenHeight" src="@/assets/riven-0.jpg">
      <v-container fill-height v-if="summoner">
        <v-row justify="center" align="center">
          <v-card
            width="80vmin"
            height="90vmin"
            class="pa-4"
            color="rgb(255, 255, 255, 0.75)"
          >
            <v-row justify="center" dense>
              <v-col>
                <span v-show="leagues.length > 0">
                  <div class="d-flex justify-center">
                    <v-avatar size="17vmin">
                      <v-img
                        v-if="soloDuoLeague.tier !== 'UNRANKED'"
                        :src="
                          require(`@/assets/ranked-emblems/${soloDuoLeague.tier}.png`)
                        "
                      />
                    </v-avatar>
                  </div>
                  <v-card-title class="text-subtitle-2 justify-center mt-n2">{{
                    `${soloDuoLeague.tier} ${soloDuoLeague.rank}`
                  }}</v-card-title>
                  <v-card-title class="text-caption justify-center mt-n8"
                    >SOLO/DUO</v-card-title
                  >
                </span>
              </v-col>
              <v-avatar size="30vmin">
                <v-img
                  :src="`http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`"
                />
              </v-avatar>
              <v-col>
                <span v-show="leagues.length > 0">
                  <div class="d-flex justify-center">
                    <v-avatar size="17vmin">
                      <v-img
                        v-if="flexLeague.tier !== 'UNRANKED'"
                        :src="
                          require(`@/assets/ranked-emblems/${flexLeague.tier}.png`)
                        "
                      />
                    </v-avatar>
                  </div>
                  <v-card-title class="text-subtitle-2 justify-center mt-n2">{{
                    `${flexLeague.tier} ${flexLeague.rank}`
                  }}</v-card-title>
                  <v-card-title class="text-caption justify-center mt-n8"
                    >FLEX</v-card-title
                  >
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
                    :items="matches"
                    height="300"
                    item-height="64"
                  >
                    <template v-slot:default="{ item }">
                      <v-list-item :key="item.gameId">
                        <v-list-item-action class="mr-2">
                          <v-avatar>
                            <v-img
                              :src="`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.summonerParticipant.championName}.png`"
                            />
                          </v-avatar>
                        </v-list-item-action>

                        <!-- <v-list-item-content>
                          <v-list-item-title class="text-subtitle-2">
                            {{ item.summonerParticipant.championName }}
                          </v-list-item-title>
                        </v-list-item-content> -->

                        <v-list-item-content>
                          <v-list-item-title class="text-center">
                            {{ getKDA(item.summonerParticipant.stats) }}
                          </v-list-item-title>
                          <v-list-item-title class="text-center">
                            {{
                              item.summonerParticipant.stats.totalMinionsKilled
                            }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                          <strong class="text-center">VS</strong>
                        </v-list-item-content>

                        <v-list-item-content>
                          <v-list-item-title class="text-center">
                            {{ getKDA(item.enemyParticipant.stats) }}
                          </v-list-item-title>
                          <v-list-item-title class="text-center">
                            {{ item.enemyParticipant.stats.totalMinionsKilled }}
                          </v-list-item-title>
                        </v-list-item-content>

                        <!-- <v-list-item-content>
                          <v-list-item-title class="text-subtitle-2 text-end">
                            {{ item.enemyParticipant.championName }}
                          </v-list-item-title>
                        </v-list-item-content> -->

                        <v-list-item-action class="ml-2">
                          <v-avatar>
                            <v-img
                              :src="`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${item.enemyParticipant.championName}.png`"
                            />
                          </v-avatar>
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
    matches: [],
  }),

  props: {
    version: String,
    summoner: Object,
  },

  methods: {
    getLeagues() {
      ProfileRepository.getLeagues(this.summoner)
        .then((res) => {
          this.leagues = res.data;
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    getMatches() {
      ProfileRepository.getMatches(this.summoner)
        .then((res) => {
          this.matches = res.data;
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    getKDA({ kills, deaths, assists }) {
      return `${kills}/${deaths}/${assists}`;
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
        if (i.queueType === "RANKED_SOLO_5x5") return i;
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
    summoner() {
      this.getLeagues();
      this.getMatches();
    },
  },
};
</script>