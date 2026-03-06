<template>
  <div :class="paginationClasses.baseClass" v-bind="$attrs">
    <mc-dropdown
      v-if="showNumberOfRowsDropdown"
      :id="dropdownId"
      :menu-list="dropdownSelection"
      dropdown-type="single-select"
      placement="bottom"
      :class="paginationClasses.dropdownClass"
      @update:model-value="handleSelectedItem"
    >
      <mc-input v-model="computeSelectedRowCount" :class="paginationClasses.dropdownInputFieldClass" :readonly="true">
        <template #icon>
          <Icon icon="ph:caret-down-bold" :class="paginationClasses.inputFieldIconClass" width="12px" height="12px" />
        </template>
      </mc-input>
    </mc-dropdown>

    <div :class="paginationClasses.rightSideClass">
      <div v-if="editableCurrentPage" class="mc-flex mc-flex-row mc-items-center mc-gap-size-spacing-4xs">
        <span class="mc-body-xs-regular mc-text-color-base">Page</span>
        <input
          v-model="currentPage"
          type="number"
          min="1"
          :max="totalPages"
          class="number-input mc-text-center mc-font-main mc-font-medium mc-font-size-200 mc-font-height-300 sp-text-color-strong mc-p-size-spacing-3xs mc-rounded-border-radius-md mc-border mc-border-solid mc-border-color-base mc-outline-none mc-min-w-[48px] mc-max-h-[36px] mc-w-[48px] mc-h-[32px] mc-box-border"
        />
        <span class="mc-body-xs-regular mc-text-color-base">of {{ totalPages }}</span>
      </div>
      <template v-else>
        <div :class="paginationClasses.computeRowRangeClass">
          {{ computeRowRange }}
        </div>
      </template>
      <div :class="paginationClasses.navigationContainerClass">
        <mc-button
          id="previousButton"
          has-icon
          :class="paginationClasses.navigationButtonClass"
          :disabled="disabledNext"
          @click="previous"
        >
          <Icon icon="ph:caret-left" />
        </mc-button>
        <mc-button
          id="nextButton"
          has-icon
          :class="paginationClasses.navigationButtonClass"
          :disabled="disabledPrevious"
          @click="next"
        >
          <Icon icon="ph:caret-right" />
        </mc-button>
      </div>
    </div>
    <div v-if="slots.actions" id="table_pagination_actions_slot">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { tablePaginationEmitTypes, tablePaginationPropTypes } from './table-pagination';
import { useTablePagination } from './use-table-pagination';

import McInput from '@/components/input/input.vue';
import McButton from '@/components/button/button.vue';
import McDropdown from '@/components/dropdown/dropdown.vue';
import { useSlots } from 'vue';

const emit = defineEmits(tablePaginationEmitTypes);
const slots = useSlots();

const props = defineProps(tablePaginationPropTypes);

const {
  paginationClasses,
  handleSelectedItem,
  computeRowRange,
  computeSelectedRowCount,
  next,
  previous,
  disabledNext,
  disabledPrevious,
  dropdownSelection,
  dropdownId,
  currentPage,
  totalPages,
  showNumberOfRowsDropdown,
} = useTablePagination(props, emit);
</script>

<style scoped>
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

.number-input {
  -moz-appearance: textfield;
}
</style>
