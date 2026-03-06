<template>
  <mc-dropdown
    :id="props.id"
    ref="tableHeaderDropdown"
    width="100%"
    :triggers="[]"
    :popper-triggers="[]"
    popper-width="448px"
    no-padding
  >
    <div :class="props.headerClasses" @click="showDropdown">
      <span> {{ props.header.name }} </span>
      <span>
        <Icon class="!mc-justify-normal mc-text-[#4B685E]" icon="ph:funnel-simple" height="20px" width="20px" />
      </span>
    </div>

    <template #popper>
      <mc-card class="mc-max-h-[372px] mc-font-main" border-width="0px" :has-content-padding="false" show-header>
        <template #header>
          <div
            class="mc-border-color-weak mc-flex mc-w-full mc-flex-row mc-items-center mc-justify-between mc-border-0 mc-border-b mc-border-solid mc-p-size-spacing-xs"
          >
            <span class="mc-subheading-xs mc-capitalize">{{ props.header.name }}</span>
            <mc-button v-if="props.hasSelectAll" size="small" variant="secondary" @click="selectAll"
              >Select All</mc-button
            >
          </div>
        </template>
        <template #content>
          <div class="mc-max-h-[251px] mc-overflow-y-auto">
            <div v-if="props.isSortable" class="mc-border-color-weak mc-border-0 mc-border-b mc-border-solid">
              <mc-list
                v-model="selectedSort"
                class="mc-body-sm-regular mc-text-color-strong mc-capitalize [&_svg.mc-text-color-brand-base]:mc-hidden [&_svg]:mc-h-[16px] [&_svg]:mc-w-[16px]"
                :menu-list="props.sortOptions"
                :allow-deselect="true"
              />
            </div>
            <div v-if="props.header.headerDropdown?.filterList && props.header.headerDropdown.filterList.length > 0">
              <mc-list
                v-model="selectedFilters"
                class="mc-body-sm-regular mc-text-color-strong mc-capitalize [&_svg]:mc-h-[16px] [&_svg]:mc-w-[16px]"
                :menu-list="props.header.headerDropdown.filterList"
                multi-select
              />
            </div>
          </div>
        </template>
        <template #footer>
          <div class="mc-ms-auto mc-flex mc-items-center mc-py-size-spacing-5xs">
            <mc-button tone="success" @click="applyFilter">Apply Filter</mc-button>
          </div>
        </template>
      </mc-card>
    </template>
  </mc-dropdown>
</template>

<script setup lang="ts">
import McDropdown from '@/components/dropdown/dropdown.vue';
import McCard from '@/components/card/card.vue';
import McButton from '@/components/button/button.vue';
import McList from '@/components/list/list.vue';
import { Icon } from '@iconify/vue';
import { tableHeaderDropdownEmitTypes, tableHeaderDropdownPropTypes } from './table-header-dropdown';
import { ref } from 'vue';
import { MenuListType } from '@/components/list/list';

const tableHeaderDropdown = ref<InstanceType<typeof McDropdown> | null>(null);
const showDropdown = () => {
  tableHeaderDropdown.value?.showDropdown();
};

const props = defineProps(tableHeaderDropdownPropTypes);
const emits = defineEmits(tableHeaderDropdownEmitTypes);

const selectedSort = ref<MenuListType[]>([]);
const selectedFilters = ref<MenuListType[]>([]);

const applyFilter = () => {
  emits('onApplyFilter', {
    headerField: props.header.field,
    sortBy: selectedSort.value[0] ? (selectedSort.value[0].value as 'asc' | 'desc' | null) : null,
    appliedFilters: selectedFilters.value.reduce(
      (acc, filter) => {
        acc[filter.text] = filter.value as string;
        return acc;
      },
      {} as Record<string, string>,
    ),
  });
  tableHeaderDropdown.value?.hideDropdown();
};

const selectAll = () => {
  selectedFilters.value = props.header.headerDropdown?.filterList ? [...props.header.headerDropdown.filterList] : [];
  emits('onSelectAll');
};

defineExpose({
  showDropdown,
});
</script>
