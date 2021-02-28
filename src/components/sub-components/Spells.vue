<template>
  <v-row no-gutters style="width: 20px">
    <v-col cols="12" class="mb-1">
      <v-avatar size="20">
        <v-img
          :src="`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(
            firstSpell
          )}.png`"
        />
      </v-avatar>
    </v-col>
    <v-col cols="12">
      <v-avatar size="20">
        <v-img
          :src="`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(
            secondSpell
          )}.png`"
        />
      </v-avatar>
    </v-col>
  </v-row>
</template>

<script>
import Spells from "@/assets/spells";

export default {
  name: "Spells",

  props: {
    version: String,
    firstSpell: Number,
    secondSpell: Number,
  },

  methods: {
    getSpellName(key) {
      for (const spell of Object.values(Spells)) {
        if (spell.key == key) {
          return spell.id;
        }
      }
    },
  },
};
</script>