<template>
  <div class="mc-grid mc-grid-cols-4 mc-gap-2">
    <div
      v-for="(month, monthIndex) in monthsList"
      :key="monthIndex"
      :class="[
        'mc-subheading-xs mc-relative mc-flex mc-cursor-pointer mc-items-center mc-justify-center mc-rounded-lg mc-p-4',
        'mc-border mc-border-solid',
        'mc-transition mc-duration-150 mc-ease-in-out',
        'active:mc-scale-95',
        {
          'mc-text-color-brand-base': month.monthValue === currentMonth,
          'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
            month.monthValue !== selectedMonth,
          'mc-border-color-brand-base mc-background-color-single-active': month.monthValue === selectedMonth,
        },
      ]"
      @click="handleMonthClick(month)"
    >
      <span>{{ month.text }}</span>

      <div
        v-if="month.monthValue === currentMonth"
        class="mc-background-color-brand-base mc-absolute mc-bottom-2 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import dayjs from 'dayjs';
import type { TabComponentProps, MonthTabEmits } from '../date-picker';

interface Props extends TabComponentProps {
  selectedMonth: number;
}

type Emits = MonthTabEmits;

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { selectedMonth } = toRefs(props);

const monthsList = computed(() =>
  Array.from({ length: 12 }, (_, i) => ({
    text: dayjs().month(i).format('MMM'),
    fullText: dayjs().month(i).format('MMMM'),
    monthValue: i,
  })),
);

const currentMonth = computed(() => dayjs().month());

const handleMonthClick = (month: { text: string; fullText: string; monthValue: number }) => {
  emit('update:month', month.monthValue);
};
</script>
