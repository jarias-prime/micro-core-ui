<template>
  <Menu
    :shown="isFilterActive"
    aria-id="attribute_filter_wrapper"
    :distance="props.distance"
    :placement="props.placement"
    :triggers="props.triggers"
    :popper-triggers="props.popperTriggers"
    :auto-hide="props.autoHide"
    :disabled="props.disabled"
    :container="`#${props.id}`"
    :strategy="
      props.popperStrategy === 'fixed' || props.popperStrategy === 'absolute' ? props.popperStrategy : 'absolute'
    "
    :delay="0"
    :style="{
      position: props.wrapperPosition,
      width: props.width,
    }"
    @hide="handleClosePopper"
    @show="handleShowPopper"
  >
    <div @click="handleFilterTrigger">
      <slot>
        <mc-chips
          :label="props.filterLabel"
          :active="isFilterActive"
          icon="ph:funnel-simple"
          :badge="props.showSelectedFilterCount"
          :badge-text="props.selectedFilterCount ?? savedFilters.length.toString()"
          :badge-variant="props.badgeVariant"
          :closable="props.clearable"
          :disabled="props.disabled"
          @close="handleClear"
        />
      </slot>
    </div>

    <div
      :id="props.id"
      :style="{
        width: props.popperWidth,
      }"
    ></div>
    <template #popper="{ hide }">
      <div
        id="attribute_filter_popper"
        :style="{
          width: props.popperInnerWidth,
        }"
      >
        <slot name="header">
          <div
            id="attribute_filter_header"
            class="mc-border-color-weak mc-flex mc-items-center mc-justify-between mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-px-size-spacing-xs mc-py-size-spacing-2xs"
          >
            <span class="mc-text-color-strong mc-text-300 mc-font-medium"> {{ props.headerLabel }} </span>
            <Icon icon="ph:x" width="20px" height="20px" class="mc-text-color-weak mc-cursor-pointer" @click="hide()" />
          </div>
        </slot>
        <div
          v-if="props.searchable"
          id="attribute_filter_subheader"
          class="mc-border-color-weak mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-px-size-spacing-xs mc-py-size-spacing-2xs"
        >
          <mc-input-search
            v-model="searchModel"
            label=""
            placeholder="Search..."
            class="!mc-py-0"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
          />
        </div>
        <slot name="actions"> </slot>
        <slot name="body">
          <div
            v-if="!noList"
            id="attribute_filter_body"
            ref="filterDropdownRef"
            class="mc-max-h-[250px] mc-overflow-y-auto"
          >
            <mc-list
              v-model="selectedFilters"
              :menu-list="attributeFilterList"
              :multi-select="props.multiselect"
              @update:model-value="handleOnSelect"
            />
          </div>
        </slot>
        <slot name="footer">
          <div
            id="attribute_filter_footer"
            class="mc-border-color-weak mc-flex mc-items-center mc-justify-end mc-gap-size-spacing-3xs mc-border-x-0 mc-border-b-0 mc-border-t mc-border-solid mc-px-size-spacing-xs mc-py-size-spacing-2xs"
          >
            <mc-button variant="secondary" size="medium" @click="isFilterActive = false"> Cancel </mc-button>
            <mc-button variant="primary" size="medium" tone="success" @click="handleSave"> Save </mc-button>
          </div>
        </slot>
      </div>
    </template>
  </Menu>
</template>
<script lang="ts" setup>
import { Menu } from 'floating-vue';
import { attributeFilterEmitTypes, attributeFilterPropTypes } from './attribute-filter';
import { useAttributeFilter } from './use-attribute-filter';
import McChips from '../chips/chips.vue';
import { Icon } from '@iconify/vue';
import McInputSearch from '../input/input-search/input-search.vue';
import McList from '../list/list.vue';
import McButton from '../button/button.vue';

import 'floating-vue/dist/style.css';

const props = defineProps(attributeFilterPropTypes);
const emit = defineEmits(attributeFilterEmitTypes);
const searchModel = defineModel<string>('search', {
  default: '',
});
const {
  isFilterActive,
  isSearchFocused,
  attributeFilterList,
  handleFilterTrigger,
  selectedFilters,
  savedFilters,
  handleClosePopper,
  handleShowPopper,
  handleSave,
  handleOnSelect,
  filterDropdownRef,
  handleClear,
} = useAttributeFilter(props, emit, searchModel);
</script>
