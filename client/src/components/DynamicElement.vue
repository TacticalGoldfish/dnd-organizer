<template>
  <span v-if="element.type == 'span'" :style="element.style ? element.style : ''" :class="element.class ? element.class : ''"> 
    {{ element.text }}
  </span>
  <a v-else-if="element.type == 'anchor'" :style="element.style ? element.style : ''" :class="element.class ? element.class : ''" @click.prevent="openDetails(element.targetModule, element.targetId)" >
    {{ element.text }}
  </a>
  <v-row v-else-if="element.type == 'row'" :style="element.style ? element.style : ''" :class="element.class ? element.class : ''">
    {{ element.text ? element.text : '' }}
    <DynamicElement 
      v-for="child, chi in element.children" 
      :element="child" 
      :layer="layer + 1" 
      :key="`${child.type}-element-${chi}-layer-${layer}`" 
      @openDetails="(moduleShortcut, id) => openDetails(moduleShortcut, id)"
       />
  </v-row>
  <v-col v-else-if="element.type == 'column'" :lg="element.colslg" :md="element.colsmd" :sm="element.colssm" :xs="element.colsxs" :cols="element.cols" :style="element.style ? element.style : ''" :class="element.class ? element.class : ''" >
    {{ element.text ? element.text : '' }}
    <DynamicElement 
      v-for="child, chi in element.children" 
      :element="child" 
      :layer="layer + 1" 
      :key="`${child.type}-element-${chi}-layer-${layer}`"  
      @openDetails="(moduleShortcut, id) => openDetails(moduleShortcut, id)"/>
  </v-col>
  <br v-else-if="element.type == 'newLine'" />
  <v-img v-else-if="element.type == 'image'" :src="`./img/${element.source}`" :height="element.height" :contain="element.contain ? element.contain : false" />
</template>

<script>
  import { unpackDescription } from '@/helpers/contentHelper';
  import DynamicElement from '@/components/DynamicElement';
  export default {
    name: 'DynamicElement',
    components: {
      DynamicElement
    },
    data: () => ({
      selectedCharacter: null
    }),
    props: {
      element: {
        type: Object,
        default: () => {},
      },
      layer: {
        type: Number,
        default: 0,
      }
    },
    methods: {
      unpackDescription(description){
        const descriptionElements = unpackDescription(description);
        return descriptionElements;
      },
      openDetails(module, id){
        this.$emit('openDetails', module, id);
      }
    }
  }
</script>
