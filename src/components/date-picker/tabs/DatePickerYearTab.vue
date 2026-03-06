<template>
  <div class="mc-grid mc-grid-cols-4 mc-gap-2">
    <div
      v-for="(year, index) in yearTabCurrentYearPage"
      :key="index"
      :class="[
        'mc-subheading-xs mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-lg mc-p-4',
        'mc-border mc-border-solid',
        'mc-transition mc-duration-150 mc-ease-in-out',
        'active:mc-scale-95',
        {
          'mc-text-color-brand-base': year === currentYear,
          'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
            year !== selectedYear,
          'mc-border-color-brand-base mc-background-color-single-active': year === selectedYear,
        },
      ]"
      @click="handleYearClick(year)"
    >
      <span>{{ year }}</span>
      <div
        v-if="year === currentYear"
        class="mc-background-color-brand-base mc-absolute mc-bottom-2 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import dayjs from 'dayjs';
import type { TabComponentProps, YearTabEmits } from '../date-picker';

interface Props extends Omit<TabComponentProps, 'selectedYear'> {
  selectedYear?: number;
  itemsPerPage?: number;
  yearsArray?: number[];
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  selectedYear: undefined,
  itemsPerPage: 12,
  yearsArray: () => [],
  currentPage: 0,
});

const emit = defineEmits<YearTabEmits>();

const yearsArray = computed(() => props.yearsArray || []);

const currentYear = computed(() => dayjs().year());

const yearTabCurrentYearPage = computed(() => {
  const start = props.currentPage * props.itemsPerPage;
  const remainingItems = yearsArray.value.slice(start);

  return remainingItems.length < props.itemsPerPage
    ? remainingItems
    : yearsArray.value.slice(start, start + props.itemsPerPage);
});

const isPreviousButtonDisabled = computed(() => {
  return props.currentPage === 0;
});

const isNextButtonDisabled = computed(() => {
  return (props.currentPage + 1) * props.itemsPerPage >= yearsArray.value.length;
});

const setCurrentPageYear = () => {
  const currentYearIndex = yearsArray.value.indexOf(props.selectedYear || 0);

  if (currentYearIndex !== -1) {
    const page = Math.floor(currentYearIndex / props.itemsPerPage);
    emit('update:currentPage', page);
  }
};

const handleYearClick = (year: number) => {
  emit('update:year', year);
};

// Watch for changes in selectedYear to update current page
watch(
  () => props.selectedYear,
  (newYear) => {
    if (newYear) {
      const yearIndex = yearsArray.value.indexOf(newYear);

      if (yearIndex !== -1) {
        const page = Math.floor(yearIndex / props.itemsPerPage);
        emit('update:currentPage', page);
      }
    }
  },
  { immediate: true },
);

// Watch for changes in minMaxYear to reset current page
watch(
  () => props.minMaxYear,
  () => {
    emit('update:currentPage', 0);
  },
);

// Expose methods for parent component
defineExpose({
  isPreviousButtonDisabled,
  isNextButtonDisabled,
  setCurrentPageYear,
});
</script>
