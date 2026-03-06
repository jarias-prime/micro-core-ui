<template>
  <div class="mc-font-main">
    <!-- Header Section -->
    <template
      v-if="props.searchableMenu || props.displayListItemSelected || (props.multiSelect && props.allowSelectAll)"
    >
      <div :class="listClasses.headerClasses" :style="stickyOffsetStyle">
        <mc-input-search
          v-if="props.searchableMenu"
          v-model="searchText"
          :placeholder="props.searchableMenuPlaceholder"
          autocomplete="off"
          @keyup="handleSearchKeyup"
        />
        <slot name="list-controls">
          <div
            v-if="
              props.supportingDisplayText ||
              props.displayListItemSelected ||
              (props.multiSelect && props.allowSelectAll)
            "
            :class="listClasses.listControlsClasses"
          >
            <span
              v-if="props.supportingDisplayText || props.displayListItemSelected"
              class="mc-label-sm-medium mc-text-color-base mc-block"
            >
              {{ props.supportingDisplayText || `${selectedItems.length} Selected` }}
            </span>

            <mc-button
              v-if="props.multiSelect && props.allowSelectAll"
              id="select-all-button"
              :class="{ 'mc-ml-auto': true }"
              variant="secondary"
              size="small"
              @click="handleSelectAll"
            >
              {{ hasSelectedItems ? 'Unselect All' : 'Select All' }}
            </mc-button>
          </div>
        </slot>
      </div>
    </template>

    <div class="mc-p-size-spacing-3xs">
      <!-- Grouped Items -->
      <template v-if="hasGroupedItems">
        <div class="mc-grid mc-gap-3">
          <div v-for="(list, listIndex) in groupedMenuList" :key="listIndex" class="mc-grid mc-gap-0.5">
            <div
              v-if="list.groupLabel !== 'no-group'"
              class="mc-label-xs-medium mc-text-color-base mc-px-size-spacing-4xs mc-py-size-spacing-3xs mc-uppercase"
            >
              {{ list.groupLabel }}
            </div>
            <div class="mc-grid mc-gap-[2px]">
              <ListItem
                v-for="item in list.items"
                :key="item.value"
                :item="item"
                :is-selected="isItemSelected(item)"
                :classes="getListItemClasses(item)"
                :multi-select="props.multiSelect"
                :lozenge="props.lozenge"
                :ladderized="props.ladderized"
                :no-check="props.noCheck"
                :item-icon="props.itemIcon"
                :item-icon-tone="props.itemIconTone"
                :item-icon-fill="props.itemIconFill"
                :disabled-unselected-items="props.disabledUnselectedItems"
                :radio-list="props.radioList"
                :avatar-variant="props.avatarVariant"
                :avatar-source="props.avatarSource"
                @select="handleSelectedItem(item)"
              />
              <div v-if="props.infiniteScrollLoader" class="mc-flex mc-items-center mc-justify-center mc-p-2">
                <Icon icon="svg-spinners:270-ring" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Non-Grouped Items -->
      <template v-else-if="localizedMenuList && localizedMenuList.length > 0">
        <div class="mc-grid mc-gap-[2px]">
          <ListItem
            v-for="item in localizedMenuList"
            :key="item.value"
            :item="item"
            :is-selected="isItemSelected(item)"
            :classes="getListItemClasses(item)"
            :multi-select="props.multiSelect"
            :lozenge="props.lozenge"
            :ladderized="props.ladderized"
            :no-check="props.noCheck"
            :item-icon="props.itemIcon"
            :item-icon-tone="props.itemIconTone"
            :item-icon-fill="props.itemIconFill"
            :disabled-unselected-items="props.disabledUnselectedItems"
            :radio-list="props.radioList"
            :avatar-variant="props.avatarVariant"
            :avatar-source="props.avatarSource"
            @select="handleSelectedItem(item)"
          />
          <div v-if="props.infiniteScrollLoader" class="mc-flex mc-items-center mc-justify-center mc-p-2">
            <Icon icon="svg-spinners:270-ring" />
          </div>
        </div>
      </template>

      <!-- Loading State -->
      <template v-else-if="props.loading">
        <div class="mc-grid mc-gap-[2px]">
          <div v-for="i in 5" :key="i" class="mc-skeletal-loader mc-h-8 mc-w-full mc-rounded-md" />
        </div>
      </template>

      <!-- Empty State -->
      <template v-else>
        <div class="mc-flex mc-items-center mc-justify-center mc-p-2 mc-text-center">
          <span class="mc-body-sm-regular mc-m-0">No results found</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';

import McInputSearch from '@/components/input/input-search/input-search.vue';
import McButton from '@/components/button/button.vue';
import ListItem from './list-item/list-item.vue';

import { listPropTypes, listEmitTypes } from './list';
import { useList } from './use-list';

const props = defineProps(listPropTypes);
const emit = defineEmits(listEmitTypes);

const {
  listClasses,
  stickyOffsetStyle,
  selectedItems,
  searchText,
  localizedMenuList,
  groupedMenuList,
  hasGroupedItems,
  hasSelectedItems,
  isItemSelected,
  getListItemClasses,
  handleSelectedItem,
  handleSelectAll,
  handleSearchKeyup,
} = useList(props, emit);
</script>
