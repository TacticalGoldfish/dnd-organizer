<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-expansion-panels v-if="module && entries" v-model="selectedEntry" value="id">
          <v-expansion-panel
            v-for="(entry,ci) in entries"
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
      selectedEntry: null,
      entries: [],
    }),
    props: {
      module: {
        type: Object,
        default: () => {},
      }
    },
    watch: {
      module: {
        immediate: true,
        handler(val){
          if (!val) return;
          if(typeof this.module.entries == "string") {
            this.fetchEntryJson().then((res) => {
              this.entries = res;
            } );
          } else if (typeof this.module.entries == "object") {
            this.entries = [...this.module.entries];
          }
        },
      }
    },
    computed: {
    },
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(moduleShortcut, id){
        if(moduleShortcut == this.module.shortcut) {
          console.log(this.module)
          const index = this.entries.findIndex(x => x.id == id);
          this.selectedEntry = index;
        } else {
          this.$emit('switchModule', moduleShortcut, id);
        }

      },
      async fetchEntryJson() {
        const response = await fetch(`/${this.module.entries}`);
        const file = await response.json();
        return file;
        // const baseUrl = process.env.BASE_URL;
        // return await this.someHttpClient.get(`${ baseUrl }/${this.module.entries}`);
      }
    }
  }
</script>
