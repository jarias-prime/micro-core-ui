<template>
  <div ref="dateCalendarPickerRef" :class="dateCalendarPickerClasses">
    <div
      :class="[
        'mc-flex mc-justify-between mc-gap-2 mc-px-4 mc-py-3',
        'mc-border mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-border-mushroom-200',
      ]"
    >
      <!-- Tabs -->
      <div class="mc-flex mc-gap-1">
        <mc-button
          v-if="showMonthInput"
          :class="getTabClasses('tab-months')"
          variant="secondary"
          size="small"
          @click="handleTabClick('tab-months')"
        >
          {{ getMonthObject('monthValue', calendarTabPageData.selectedMonth)?.fullText }}
        </mc-button>
        <mc-button
          v-if="showYearInput"
          :class="getTabClasses('tab-years')"
          variant="secondary"
          size="small"
          @click="handleTabClick('tab-years')"
        >
          {{ calendarTabPageData.selectedYear }}
        </mc-button>
      </div>

      <!-- Next & Previous Buttons  -->
      <div v-if="currentTab === 'tab-calendar'" class="mc-flex mc-gap-1">
        <mc-button
          class="mc-cursor-pointer"
          variant="secondary"
          size="small"
          :disabled="calendarTabIsMinMonth"
          @click="calendarTabPrevMonth"
        >
          <Icon icon="ph:caret-left" />
        </mc-button>
        <mc-button
          class="mc-cursor-pointer"
          variant="secondary"
          size="small"
          :disabled="calendarTabIsMaxMonth"
          @click="calendarTabNextMonth"
        >
          <Icon icon="ph:caret-right" />
        </mc-button>
      </div>

      <div v-if="currentTab === 'tab-years'" class="mc-flex mc-gap-1">
        <mc-button
          class="mc-cursor-pointer"
          variant="secondary"
          size="small"
          :disabled="yearTabIsPreviousButtonDisabled"
          @click="yearTabGoToPreviousPage"
        >
          <Icon icon="ph:caret-left" />
        </mc-button>
        <mc-button
          class="mc-cursor-pointer"
          variant="secondary"
          size="small"
          :disabled="yearTabIsNextButtonDisabled"
          @click="yearTabGoToNextPage"
        >
          <Icon icon="ph:caret-right" />
        </mc-button>
      </div>
    </div>

    <div class="mc-px-4 mc-pb-4 mc-pt-2">
      <!-- Calendar Tab  -->
      <DatePickerCalendarTab
        v-if="currentTab === 'tab-calendar' && showDateInput"
        :calendar-days="calendarDays"
        :selected-month="selectedMonthComputed"
        :selected-year="selectedYearComputed"
        :selected-day="selectedDayComputed"
        :min-max-year="minMaxYear"
        :rest-days="restDays"
        :disabled-dates="disabledDates"
        :disabled="disabled"
        :readonly="readonly"
        @update:date="handleCalendarDateUpdateWrapper as any"
        @update:month="handleCalendarMonthUpdateWrapper as any"
        @update:year="handleCalendarYearUpdateWrapper as any"
      />

      <!-- Months Tab  -->
      <DatePickerMonthTab
        v-if="currentTab === 'tab-months' && showMonthInput"
        :selected-month="selectedMonthComputed"
        :selected-year="selectedYearComputed"
        :min-max-year="minMaxYear"
        :disabled="disabled"
        :readonly="readonly"
        @update:month="handleMonthTabMonthUpdateWrapper as any"
      />

      <!-- Years Tab  -->
      <DatePickerYearTab
        v-if="currentTab === 'tab-years' && showYearInput"
        :selected-month="selectedMonthComputed"
        :selected-year="selectedYearComputed"
        :min-max-year="minMaxYear"
        :years-array="yearTabPageData.yearsArray"
        :current-page="yearTabPageData.currentPage"
        :items-per-page="yearTabPageData.itemsPerPage"
        :disabled="disabled"
        :readonly="readonly"
        @update:year="handleYearTabYearUpdateWrapper as any"
        @update:current-page="handleYearTabCurrentPageUpdateWrapper as any"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import classNames from 'classnames';

import SprButton from '@/components/button/button.vue';
import DatePickerCalendarTab from '../tabs/DatePickerCalendarTab.vue';
import DatePickerMonthTab from '../tabs/DatePickerMonthTab.vue';
import DatePickerYearTab from '../tabs/DatePickerYearTab.vue';

import { useDateCalendarPicker } from './use-date-calendar-picker';
import { dateCalendarPickerEmitTypes, dateCalendarPickerPropTypes } from './date-calendar-picker';

const props = defineProps(dateCalendarPickerPropTypes);
const emit = defineEmits(dateCalendarPickerEmitTypes);

const dateCalendarPickerRef = ref<HTMLElement | null>(null);

// Use the composable for all logic
const {
  // State
  currentTab,
  calendarTabPageData,
  yearTabPageData,

  // Computed properties
  showMonthInput,
  showDateInput,
  showYearInput,
  calendarDays,
  selectedMonthComputed,
  selectedYearComputed,
  selectedDayComputed,
  calendarTabIsMinMonth,
  calendarTabIsMaxMonth,
  yearTabIsPreviousButtonDisabled,
  yearTabIsNextButtonDisabled,

  // Functions
  getTabClasses,
  handleTabClick,
  getMonthObject,
  calendarTabPrevMonth,
  calendarTabNextMonth,
  yearTabGoToPreviousPage,
  yearTabGoToNextPage,

  // Event handlers
  handleCalendarDateUpdateWrapper,
  handleCalendarMonthUpdateWrapper,
  handleCalendarYearUpdateWrapper,
  handleMonthTabMonthUpdateWrapper,
  handleYearTabYearUpdateWrapper,
  handleYearTabCurrentPageUpdateWrapper,
} = useDateCalendarPicker(props, emit);

// Compute CSS classes using classNames utility
const dateCalendarPickerClasses = computed(() => {
  return classNames(
    'date-calendar-picker-container mc-bg-white mc-rounded-lg mc-shadow-lg mc-border mc-border-solid mc-border-mushroom-200 min-w-[320px]',
    {
      'mc-disabled': props.disabled,
      'mc-readonly': props.readonly,
    },
  );
});
</script>
