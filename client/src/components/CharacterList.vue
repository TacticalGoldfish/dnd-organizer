<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-expansion-panels v-model="selectedCharacter" value="id">
          <v-expansion-panel
            v-for="(character,ci) in characters"
            :key="`c-${ci}`"
          >
            <v-expansion-panel-header>
              {{ character.type }} - {{character.name}} {{ character.alias && character.alias != '' ? `(${character.alias})` : '' }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-for="element, ei in unpackDescription(character.description)" >
                <span v-if="element.type == 'span'" :key="`c-${ci}-ds-${ei}`">
                  {{ element.text }}
                </span>
                <a 
                  v-else-if="element.type == 'a'" 
                  :key="`c-${ci}-da-${ei}`"
                  @click="openDetails(element.module, element.id)">
                  {{ element.text }}

                </a>
                <br v-else-if="element.type == 'nl'" :key="`c-${ci}-dnl-${ei}`" />
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import characters from '@/data/characters'
  import { unpackDescription } from '@/helpers/contentHelper';
  export default {
    name: 'CharacterList',
    data: () => ({
      characters: characters,
      selectedCharacter: null
    }),
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(module, id){
        if(module == 'c') {
          const index = this.characters.findIndex(x => x.id == id);
          this.selectedCharacter = index;
        } else {
          this.$emit('switchModule', module, id);
        }

      }
    }
  }
</script>
