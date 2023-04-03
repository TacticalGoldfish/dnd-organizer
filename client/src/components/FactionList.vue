<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-expansion-panels v-model="selectedFaction" value="id">
          <v-expansion-panel
            v-for="(faction,fi) in factions"
            :key="`f-${fi}`"
          >
            <v-expansion-panel-header>
              {{faction.name}}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-for="element, ei in unpackDescription(faction.description)" >
                <span v-if="element.type == 'span'" :key="`f-${fi}-ds-${ei}`">
                  {{ element.text }}
                </span>
                <a 
                  v-else-if="element.type == 'a'" 
                  :key="`f-${fi}-da-${ei}`"
                  @click="openDetails(element.module, element.id)">
                  {{ element.text }}

                </a>
                <br v-else-if="element.type == 'nl'" :key="`f-${fi}-dnl-${ei}`" />
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import factions from '@/data/factions'
  import { unpackDescription } from '@/helpers/contentHelper';
  export default {
    name: 'FactionList',
    data: () => ({
      factions: factions,
      selectedFaction: null
    }),
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(module, id){
        if(module == 'f') {
          const index = this.factions.findIndex(x => x.id == id);
          this.selectedFaction = index;
        } else {
          this.$emit('switchModule', module, id);
        }

      }
    }
  }
</script>
