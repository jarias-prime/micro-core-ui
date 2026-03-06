<template>
  <div :class="tableActionsBaseClasses">
    <slot name="tableActionSection">
      <div :class="searchFilterClasses">
        <mc-input-search
          v-if="props.toggleSearch"
          :model-value="props.searchModel"
          :class="inputSearchClasses"
          placeholder="Search"
          @update:model-value="updateSearchField"
        />
        <mc-button v-if="props.toggleFilter" variant="secondary" has-icon>
          <Icon icon="ph:sliders-horizontal" />
        </mc-button>
      </div>
      <mc-button v-if="props.toggleOption">
        <Icon icon="ph:dots-three-vertical" />
      </mc-button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useTableActions } from './use-table-actions';
import McInputSearch from '@/components/input/input-search/input-search.vue';
import McButton from '@/components/button/button.vue';
import { Icon } from '@iconify/vue';
import { tableActionEmitTypes, tableActionPropTypes } from './table-actions';

const emit = defineEmits(tableActionEmitTypes);

const props = defineProps(tableActionPropTypes);

const { tableActionsBaseClasses, inputSearchClasses, searchFilterClasses, updateSearchField } = useTableActions(emit);
</script>
