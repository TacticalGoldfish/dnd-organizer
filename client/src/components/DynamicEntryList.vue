<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" lg="3" sm="6">
        <v-text-field hide-details v-if="module.searchBar" label="search..." v-model="searchText" outlined dense></v-text-field>
      </v-col>
      <v-col cols="12" lg="3" sm="6">
        <v-select 
          v-if="module.filters && module.filters.some(x => x == 'type')" 
          v-model="selectedTypes" 
          :items="types" 
          multiple
          chips
          dense
          label="types..." 
          outlined
        >
          <template #selection="{ item }">
          <v-chip small>{{item}}</v-chip>
        </template>
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels v-if="module && entries" v-model="selectedEntry" value="id">
          <v-expansion-panel
            v-for="(entry,ci) in filteredEntries"
            :key="`c-${ci}`"
          >
            <v-expansion-panel-header>
              <span style="font-weight: bold; font-size: 20px;">{{ entry.type ? `${entry.type} - ` : '' }} {{entry.name}} {{ entry.alias && entry.alias != '' ? `(${entry.alias})` : '' }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-for="element, ei in entry.children" >
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
      searchText: '',
      selectedTypes: [],
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
              if(val.searchBar) {
                res.forEach(entry => {
                  entry.allText = this.getAllText(entry);
                });
              }
              this.entries = res;
            } );
          } else if (typeof this.module.entries == "object") {
            this.entries = [...this.module.entries];
          }
        },
      }
    },
    computed: {
      filteredEntries() {
        const lowcaseSearch = this.searchText.toLowerCase()
        return this.entries.filter(x => (this.selectedTypes.length == 0 || this.selectedTypes.some(type => type == x.type)) && (x.type?.toLowerCase().includes(lowcaseSearch) || x.name?.toLowerCase().includes(lowcaseSearch) || x.alias?.toLowerCase().includes(lowcaseSearch) || x.allText ?.toLowerCase().includes(lowcaseSearch)))
      },
      types() {
        let types = [];
        this.entries.forEach(entry => {
          if(types.indexOf(entry.type) == -1) types.push(entry.type);
        })
        return types;
      }
    },
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(moduleShortcut, id){
        if(moduleShortcut == this.module.shortcut) {
          this.searchText = ''
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
      },
      getAllText(entry) {
        let allText =  '';
        entry?.children?.forEach(child => {
          allText += child.text ? ` ${child.text}` : '';
          if(child.children != null) allText += ` ${this.getAllText(child)}`
        });
        return allText
      }
    }
  }
</script>
