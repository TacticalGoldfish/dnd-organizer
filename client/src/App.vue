<template>
  <v-app>
    <v-main>    
      <v-stepper v-model="selectedStep">
        <v-stepper-header>
          <template v-for="n, i in steps">
            <v-divider
              v-if="i > 0"
              :key="n.id"
            ></v-divider>
            <v-stepper-step
              v-if="true"
              :key="`${n.id}-step`"
              :complete="selectedStep > n.id"
              :step="n.id"
              editable
            >
              Step {{ n.title }}
            </v-stepper-step>

          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="n in steps"
            :key="`${n.id}-content`"
            :step="n.id"
          >
            <v-card
              class="mb-12"
            > 

              <faction-list ref="factionList" @switchModule="(module, id) => switchModule(module, id)" v-if="n.shortcut == 'f'" />
              <character-list ref="characterList" @switchModule="(module, id) => switchModule(module, id)" v-if="n.shortcut == 'c'"/>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>

<script>
import CharacterList from './components/CharacterList';
import FactionList from './components/FactionList';

export default {
  name: 'App',

  components: {
    CharacterList,
    FactionList,
  },
  created() {
    this.init();
  },

  data: () => ({
    selectedStep: 1,
    steps: [
      {
        id: 1,
        title: 'Characters',
        shortcut: 'c',
      },
      {
        id: 2,
        title: 'Factions',
        shortcut: 'f',
      }
    ],
    selectedModule: 1,
  }),

watch: {
},
  methods: {
    init() {
      this.$vuetify.theme.dark = true;
    },
    switchModule(module, id) {
      const selectedModule = this.steps.find(x => x.shortcut == module);
      if(selectedModule) {
        this.selectedStep = selectedModule.id;
        switch(module) {
          case 'c':
            this.$refs.characterList[0].openDetails(module, id);
            break;
          case 'f': 
            this.$refs.factionList[0].openDetails(module, id);
            break;
          default:
            break;
        }

      }
    },
  }
};
</script>
