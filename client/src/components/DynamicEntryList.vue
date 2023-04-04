<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-expansion-panels v-if="module && module.entries" v-model="selectedEntry" value="id">
          <v-expansion-panel
            v-for="(entry,ci) in module.entries"
            :key="`c-${ci}`"
          >
            <v-expansion-panel-header>
              <span style="font-weight: bold; font-size: 20px;">{{ entry.type ? `${entry.type} - ` : '' }} {{entry.name}} {{ entry.alias && entry.alias != '' ? `(${entry.alias})` : '' }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-for="element, ei in entry.contents" >
                <DynamicElement :element="element" :layer="1" :key="`${element.type}-element-${ei}-layer-0`" v-if="true" @openDetails="(moduleShortcut, id) => openDetails(moduleShortcut, id)" />
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { unpackDescription } from '@/helpers/contentHelper';
  import DynamicElement from '@/components/DynamicElement';
  export default {
    name: 'DynamicEntryList',
    components: {
      DynamicElement
    },
    data: () => ({
      selectedEntry: null
    }),
    props: {
      module: {
        type: Object,
        default: () => {},
      }
    },
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(moduleShortcut, id){
        if(moduleShortcut == this.module.shortcut) {
          const index = this.module.entries.findIndex(x => x.id == id);
          this.selectedEntry = index;
        } else {
          this.$emit('switchModule', moduleShortcut, id);
        }

      }
    }
  }
</script>
