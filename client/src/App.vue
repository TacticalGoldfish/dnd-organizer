<template>
  <v-app>
    <v-main>    
      <v-stepper v-model="selectedStep">
        <v-stepper-header>
          <template v-for="module, i in modules">
            <v-divider
              v-if="i > 0"
              :key="module.id"
            ></v-divider>
            <v-stepper-step
              v-if="true"
              :key="`${module.id}-step`"
              :complete="selectedStep > module.id"
              :step="module.id"
              editable
            >
              {{ module.title }}
            </v-stepper-step>

          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="module in modules"
            :key="`${module.id}-content`"
            :step="module.id"
          >
            <v-card
              class="mb-12"
            > 
              <dynamic-entry-list :module="module" :ref="`${module.shortcut}-module`" @switchModule="(moduleShortcut, id) => switchModule(moduleShortcut, id)" />
              <!--<faction-list ref="factionList" @switchModule="(module, id) => switchModule(module, id)" v-if="n.shortcut == 'f'" />
              <character-list ref="characterList" @switchModule="(module, id) => switchModule(module, id)" v-if="n.shortcut == 'c'"/>-->
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>

<script>
//import CharacterList from './components/CharacterList';
//import FactionList from './components/FactionList';
import DynamicEntryList from './components/DynamicEntryList';
//import modules from '@/data/modules'

export default {
  name: 'App',

  components: {
    DynamicEntryList
  },
  created() {
    this.init();
  },

  data: () => ({
    selectedStep: 1,
    
    selectedModule: 1,
  }),
  computed: {
    modules() {
      if(this.$modules) return this.$modules;
      return [];
    }
  },

  watch: {
  },
  methods: {
    init() {
      this.$vuetify.theme.dark = true;
    },
    switchModule(moduleShortcut, id) {
      const selectedModule = this.modules.find(x => x.shortcut == moduleShortcut);
      if(selectedModule && this.$refs[`${moduleShortcut}-module`] && this.$refs[`${moduleShortcut}-module`][0]) {
        this.selectedStep = selectedModule.id;
        this.$refs[`${moduleShortcut}-module`][0].openDetails(moduleShortcut, id)
      }
    },
  }
};
</script>
<style>
  .v-stepper__step__step {
    display: none !important;
  }
</style>