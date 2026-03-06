<template>
  <div :class="getTableClasses.tableWrapperClasses">
    <div v-if="!!$slots.default" :class="getTableClasses.tableActionSlotClasses">
      <slot />
    </div>
    <div v-if="hasTableActions" :class="getTableClasses.tableHeaderActionsClasses">
      <mc-table-actions
        v-model:search-model="searchField"
        :toggle-search="props.tableActions.search"
        :toggle-option="props.tableActions.option"
        :toggle-filter="props.tableActions.filter"
        @update:search-model="updateSearchField"
      >
        <template #tableActionSection>
          <slot name="tableActionSection" />
        </template>
      </mc-table-actions>
    </div>
    <div :class="getTableClasses.tableBackgroundClasses">
      <table
        :id="props.id"
        :key="tableKey"
        aria-describedby="describe"
        class="mc-h-full mc-w-full"
        cellspacing="0"
        cellpadding="0"
      >
        <thead>
          <tr v-if="!(props.removeHeaderOnEmpty && tableData.length <= 0)">
            <th
              v-if="props.isMultiSelect"
              :class="[getTableClasses.multiselectClass, getTableClasses.headerClasses(null)]"
            >
              <div class="mc-flex mc-items-center mc-justify-center">
                <mc-checkbox
                  label=""
                  :checked="isAllSelected || isIndeterminate"
                  :indeterminate="isIndeterminate"
                  @update:model-value="handleSelectAll"
                />
              </div>
            </th>
            <th
              v-for="(header, keyHeader) in headers"
              :key="keyHeader"
              :class="[getTableClasses.headerClasses(header)]"
              :style="{ width: header?.width }"
            >
              <div
                v-if="header.headerDropdown?.enabled"
                class="hover:mc-background-color-hover active:mc-background-color-pressed mc-absolute mc-inset-0 mc-z-[2] mc-cursor-pointer"
                @click="handleHeaderDropdownClick(keyHeader)"
              ></div>
              <!-- Header with Dropdown Filter -->
              <mc-table-header-dropdown
                v-if="header.headerDropdown?.enabled"
                :id="`${props.id}-th-dropdown-${keyHeader}`"
                :ref="(el: unknown) => setHeaderDropdownRef(el, keyHeader)"
                :header="header"
                :is-sortable="header.headerDropdown?.isSortable"
                :header-classes="getTableClasses.headerNameClass"
                :filter-options="header.headerDropdown?.filterList || []"
                :has-select-all="header.headerDropdown?.hasSelectAll"
                @on-apply-filter="(filters) => emit('onApplyFilter', filters)"
              />
              <!-- Default Header -->
              <div v-else :class="getTableClasses.headerNameClass">
                <span :class="[{ 'mc-cursor-pointer': header.sort }]" @click="header.sort && sortData(header.field)">
                  {{ header.name }}
                </span>

                <span v-if="header.badgeText">
                  <mc-badge :text="header.badgeText" :variant="header.badgeVariant" size="small" />
                </span>
                <span
                  v-if="header.sort"
                  :class="[
                    'mc-flex mc-flex-row mc-items-center mc-p-size-spacing-6xs',
                    'hover:mc-rounded-border-radius-xs hover:mc-bg-mushroom-300',
                    { 'mc-cursor-pointer': header.sort },
                  ]"
                  @click="header.sort && sortData(header.field)"
                >
                  <Icon
                    :icon="getSortIcon(header.field)"
                    height="16"
                    width="16"
                    :class="[{ 'mc-text-kangkong-700': sortField === header.field }]"
                  />
                </span>
                <span v-if="header.headerDropdown?.enabled">
                  <Icon
                    icon="ph:funnel-simple"
                    height="20"
                    width="20"
                    class="mc-ml-size-spacing-5xs mc-text-[#4B685E]"
                  />
                </span>
              </div>
            </th>

            <!-- for action Button -->
            <th v-if="action" :class="getTableClasses.headerClasses(null)">
              <slot name="action-name" :class="getTableClasses.tableCellSlotClasses" />
            </th>
          </tr>
        </thead>

        <tbody v-if="tableData.length > 0 && !loading" ref="sortableTBody" :class="getTableClasses.tableBodyClasses">
          <tr
            v-for="(item, keyIndex) in tableData"
            :key="getRowKey(item, keyIndex)"
            :data-id="getRowKey(item, keyIndex)"
            :class="[
              getTableClasses.tableRowClasses,
              {
                'hover:mc-background-color-hover': !isDragging && !isRowSelected(item),
                'mc-bg-kangkong-100': isRowSelected(item),
              },
            ]"
            @click="handleRowClick(item, keyIndex)"
            @mouseover="$emit('onHover', { active: true, data: item })"
            @mouseleave="$emit('onHover', { active: false, data: item })"
          >
            <td
              v-if="props.isMultiSelect"
              :class="[getTableClasses.multiselectClass, getTableClasses.multiselectRowClass]"
            >
              <div class="mc-flex mc-items-center mc-justify-center">
                <mc-checkbox label="" :checked="isRowSelected(item)" @update:model-value="handleSelect(item)" />
              </div>
            </td>
            <td
              v-for="(column, headerKey) in headers"
              :key="headerKey"
              :class="getTableClasses.tableDataClasses"
              :style="{ width: column?.width }"
            >
              <slot v-if="$slots[column.field]" :name="column.field" :row="item" :row-index="keyIndex" />
              <template v-else>
                <div v-if="tableData[keyIndex][column.field]" class="mc-flex mc-flex-row mc-items-center mc-gap-2">
                  <mc-avatar
                    v-if="column.hasAvatar"
                    size="lg"
                    :src="sortedDataItem(keyIndex, column.field).image"
                    alt="User Avatar"
                    :variant="column.avatarVariant ? column.avatarVariant : 'initial'"
                    :initial="sortedDataItem(keyIndex, column.field).title as string"
                  />
                  <div v-if="column.hasIcon" class="mc-flex mc-items-center mc-rounded-full mc-bg-mushroom-200 mc-p-1">
                    <Icon :icon="sortedDataItem(keyIndex, column.field).icon || ''" />
                  </div>
                  <div>
                    <!-- Array Title -->
                    <div
                      v-if="Array.isArray(sortedDataItem(keyIndex, column.field).title)"
                      class="mc-flex mc-flex-wrap mc-gap-2"
                    >
                      <div v-for="(cell, index) in sortedDataItem(keyIndex, column.field).title" :key="index">
                        <div v-if="column.hasLozengeTitle" class="mc-mt-1">
                          <mc-table-lozenge-title :cell="cell as LozengeTitle" />
                        </div>
                        <div v-else-if="column.hasChipTitle" class="mc-mt-1">
                          <mc-table-chips-title :cell="cell as ChipTitle" />
                        </div>
                      </div>
                    </div>

                    <!-- Single Title Handling -->
                    <div v-else>
                      <div v-if="column.hasLozengeTitle" class="mc-mt-1">
                        <!-- Defining lozenge title in the title so it wont confuse the consumer; hence the title.title-->
                        <!-- Also this structure allows multiple instances -->
                        <mc-table-lozenge-title :cell="sortedDataItem(keyIndex, column.field).title as LozengeTitle" />
                      </div>
                      <!-- Defining the chip title so it wont confuse the consumer; hence the title.title -->
                      <!-- Also this structure allows multiple instances -->
                      <div v-else-if="column.hasChipTitle" class="mc-mt-1">
                        <mc-table-chips-title :cell="sortedDataItem(keyIndex, column.field).title as ChipTitle" />
                      </div>
                      <div v-else class="mc-text-color-strong mc-font-size-200 mc-font-normal">
                        {{ sortedDataItem(keyIndex, column.field).title }}
                      </div>
                    </div>

                    <!-- Subtitle -->
                    <div v-if="column.hasSubtext" class="mc-text-color-base mc-text-xs mc-font-normal">
                      {{ sortedDataItem(keyIndex, column.field).subtext }}
                    </div>
                  </div>
                </div>
              </template>
            </td>
            <td v-if="action" :class="getTableClasses.tableRowActionClasses">
              <div class="mc-flex mc-items-center">
                <slot name="action" :row="item" />
              </div>
            </td>
            <td v-if="isDraggable" :class="getTableClasses.tableRowDragIconClasses">
              <div class="table-row-drag-icon mc-flex mc-items-center mc-justify-center">
                <Icon icon="ph:dots-six-vertical" width="16px" height="16px" />
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else id="tbody_empty_state" ref="sortableTBody" :class="getTableClasses.emptyStateClasses">
          <tr v-if="!loading" class="mc-h-full">
            <td :colspan="getHeaderCount" class="mc-flex mc-h-full mc-items-center mc-justify-center">
              <slot name="empty-state">
                <McEmptyState :size="getEmptyStateSize" />
              </slot>
            </td>
          </tr>
          <tr v-else>
            <td :colspan="getHeaderCount" class="mc-overflow-hidden">
              <slot name="loading">
                <div class="mc-flex mc-items-center mc-justify-center">Loading...</div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="$slots.footer" :class="getTableClasses.tableFooterClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import McAvatar from '@/components/avatar/avatar.vue';
import McEmptyState from '@/components/empty-state/empty-state.vue';
import McBadge from '@/components/badge/badge.vue';
import McTableActions from '@/components/table/table-actions/table-actions.vue';
import McTableLozengeTitle from '@/components/table/table-lozenge-title/table-lozenge-title.vue';
import McTableChipsTitle from '@/components/table/table-chips-title/table-chips-title.vue';
import McCheckbox from '@/components/checkbox/checkbox.vue';
import McTableHeaderDropdown from '@/components/table/table-header-dropdown/table-header-dropdown.vue';

import { tablePropTypes, tableEmitTypes } from './table';
import type { ChipTitle } from '@/components/table/table-chips-title/table-chips-title';
import type { LozengeTitle } from '@/components/table/table-lozenge-title/table-lozenge-title';
import { useTable } from './use-table';
import { useDraggableTableRows } from './use-draggable-table-rows';

const props = defineProps(tablePropTypes);
const emit = defineEmits(tableEmitTypes);
const slots = useSlots();
const headerDropdownRefs = ref<Record<string, Element | null>>({});

const setHeaderDropdownRef = (el: unknown, key: string | number) => {
  if (el) {
    headerDropdownRefs.value[String(key)] = el as Element;
  }
};

const handleHeaderDropdownClick = (keyHeader: string | number) => {
  const dropdownRef = headerDropdownRefs.value[String(keyHeader)] as InstanceType<typeof McTableHeaderDropdown> | null;
  dropdownRef?.showDropdown();
};

const sortableTBody = ref<HTMLElement | null>(null);

const {
  getHeaderCount,
  hasTableActions,
  searchField,
  getTableClasses,
  getEmptyStateSize,
  isAllSelected,
  isIndeterminate,
  sortField,
  tableData,
  isDraggable,
  dragOptions,
  tableKey,
  isDragging,

  isRowSelected,
  sortData,
  updateSearchField,
  handleRowClick,
  handleSelect,
  handleSelectAll,
  sortedDataItem,
  getSortIcon,
  getRowKey,
  clearSelectedData,
} = useTable(props, emit, slots);

const { reinitializeSortable } = useDraggableTableRows(sortableTBody, dragOptions);

defineExpose({
  clearSelectedData,
});

watch(tableKey, () => {
  reinitializeSortable();
});
</script>
