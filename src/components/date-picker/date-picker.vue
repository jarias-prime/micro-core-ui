<template>
  <div>
    <Menu
      v-model:shown="datePopperState"
      aria-id="date-picker-wrapper"
      distance="4"
      :placement="props.placement"
      :triggers="[]"
      :popper-hide-triggers="[]"
      :auto-hide="false"
      :disabled="isDatePickerPopperDisabled"
      :container="props.popperContainer ? props.popperContainer : `#${props.id}`"
      :strategy="
        props.popperStrategy === 'fixed' || props.popperStrategy === 'absolute' ? props.popperStrategy : 'absolute'
      "
      :delay="0"
      :style="{
        position: props.wrapperPosition,
        width: props.width,
      }"
    >
      <div :id="props.id" :class="['mc-grid', { 'mc-gap-size-spacing-4xs': !props.readonly2 }]">
        <label v-if="props.label" :for="props.id" :class="datePickerClasses.labelClasses">
          {{ props.label }}
        </label>
        <slot :handle-click="handleSlotClick">
          <div
            ref="datePickerRef"
            :class="[datePickerClasses.datePickerBaseInputClasses, 'mc-relative mc-z-10']"
            @click="datePopperState = true"
          >
            <div class="mc-flex mc-h-full mc-items-center mc-gap-1.5">
              <input
                :id="`${props.id}-month`"
                ref="monthInputRef"
                v-model="monthInput"
                :class="['mc-w-[38px] mc-min-w-[38px]', datePickerClasses.datePickerInputClasses]"
                type="text"
                placeholder="MMM"
                maxlength="3"
                :disabled="props.disabled"
                :readonly="props.readonly || props.readonly2"
                autocomplete="off"
                @input="handleMonthInput"
                @keyup="handleMonthInput"
                @keydown="handleBackspace('month', $event)"
              />
              <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
              <input
                :id="`${props.id}-date`"
                ref="dateInputRef"
                v-model="dateInput"
                :class="['mc-w-[24px] mc-min-w-[24px] mc-text-center', datePickerClasses.datePickerInputClasses]"
                type="text"
                placeholder="DD"
                maxlength="2"
                :disabled="props.disabled"
                :readonly="props.readonly || props.readonly2"
                autocomplete="off"
                @input="handleDateInput"
                @keyup="handleDateInput"
                @keydown="handleBackspace('date', $event)"
              />
              <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
              <input
                :id="`${props.id}-year`"
                ref="yearInputRef"
                v-model="yearInput"
                :class="['mc-w-[42px] mc-min-w-[42px]', datePickerClasses.datePickerInputClasses]"
                type="text"
                placeholder="YYYY"
                maxlength="4"
                :disabled="props.disabled"
                :readonly="props.readonly || props.readonly2"
                autocomplete="off"
                @input="handleYearInput"
                @keyup="handleYearInput"
                @keydown="handleBackspace('year', $event)"
              />
            </div>
            <div v-if="!props.readonly2 && !props.readonly" class="mc-flex mc-items-center mc-justify-center">
              <Icon class="mc-text-color-supporting mc-h-4 mc-w-4" icon="ph:calendar-blank" />
            </div>
          </div>
        </slot>
      </div>

      <template #popper>
        <div ref="datePickerRef">
          <div
            :class="[
              'mc-flex mc-justify-between mc-gap-2 mc-px-4 mc-py-3',
              'mc-border mc-border-x-0 mc-border-b mc-border-t-0 mc-border-solid mc-border-mushroom-200',
            ]"
          >
            <!-- Tabs -->
            <div class="mc-flex mc-gap-1">
              <mc-button
                :class="getTabClasses('tab-months')"
                variant="secondary"
                size="small"
                @click="handleTabClick('tab-months')"
              >
                {{ getMonthObject('monthValue', calendarTabPageData.selectedMonth)?.fullText }}
              </mc-button>
              <mc-button
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
            <div v-if="currentTab === 'tab-calendar'" class="mc-grid mc-grid-cols-7">
              <div
                v-for="(dayOfWeek, dayOfWeekIndex) in daysOfWeek"
                :key="dayOfWeekIndex"
                class="mc-py-1 mc-text-center mc-font-semibold"
              >
                {{ dayOfWeek.text }}
              </div>

              <template v-for="day in calendarTabPageData.calendarDays" :key="day.date">
                <div
                  v-if="minMaxYear.min <= day.date.getFullYear() && minMaxYear.max >= day.date.getFullYear()"
                  :class="[
                    datePickerClasses.calendarTabItemsBaseClasses,
                    {
                      // Rest Days
                      'mc-background-color-disabled': calendarTabIsRestDay(day),

                      // Today Indicator - only apply brand color if not selected
                      'mc-text-color-brand-base': calendarTabIsTodayIndicator(day) && !calendarTabIsSelectedDate(day),

                      // Active Month Dates - only apply if not selected and not today
                      'mc-text-color-strong':
                        calendarTabIsActiveMonthDates(day) &&
                        !calendarTabIsSelectedDate(day) &&
                        !calendarTabIsTodayIndicator(day),

                      // Inactive Month Dates (Past/Future)
                      'mc-text-color-disabled': calendarTabIsInactiveMonthDates(day),

                      // Selected Date
                      'mc-background-color-brand-base active:mc-background-color-brand-pressed mc-text-color-inverted-strong mc-cursor-pointer !mc-text-white-50 active:mc-scale-95':
                        calendarTabIsSelectedDate(day),

                      // Unselected Date
                      'hover:mc-background-color-hover mc-border-color-weak active:mc-background-color-pressed mc-cursor-pointer mc-border mc-border-solid active:mc-scale-95':
                        calendarTabIsUnSelectedDate(day),

                      // Disabled Dates
                      'mc-cursor-not-allowed mc-opacity-30': calendarTabIsDateIsDisabled(day),
                    },
                  ]"
                  @click="!calendarTabIsDateIsDisabled(day) ? calendarTabHandleDateInput(day) : null"
                >
                  <span>{{ day.date.getDate() }}</span>
                  <div
                    v-if="calendarTabIsTodayIndicator(day)"
                    class="mc-background-color-brand-base mc-absolute mc-bottom-1 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full"
                  ></div>
                </div>
                <div v-else></div>
              </template>
            </div>

            <!-- Months Tab  -->
            <div v-if="currentTab === 'tab-months'" class="mc-grid mc-grid-cols-4 mc-gap-2">
              <div
                v-for="(month, monthIndex) in monthsList"
                :key="monthIndex"
                :class="[
                  datePickerClasses.monthsTabItemsBaseClasses,
                  {
                    'mc-text-color-brand-base': month.monthValue === currentDate.month(),
                    'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
                      month.text.toLowerCase() !== monthInput.toLowerCase(),
                    'mc-border-color-brand-base mc-background-color-single-active':
                      month.text.toLowerCase() === monthInput.toLowerCase(),
                  },
                ]"
                @click="monthTabHandleSelectedMonth(month)"
              >
                <span>{{ month.text }}</span>

                <div
                  v-if="month.monthValue === currentDate.month()"
                  class="mc-background-color-brand-base mc-absolute mc-bottom-2 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full"
                ></div>
              </div>
            </div>

            <!-- Years Tab  -->
            <div v-if="currentTab === 'tab-years'" class="mc-grid mc-grid-cols-4 mc-gap-2">
              <div
                v-for="(year, index) in yearTabCurrentYearPage"
                :key="index"
                :class="[
                  datePickerClasses.yearsTabItemsBaseClasses,
                  {
                    'mc-text-color-brand-base': year === currentDate.year(),
                    'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
                      year !== Number(yearInput),
                    'mc-border-color-brand-base mc-background-color-single-active': year === Number(yearInput),
                  },
                ]"
                @click="yearTabHandleSelectedYear(String(year))"
              >
                <span>{{ year }}</span>
                <div
                  v-if="year === currentDate.year()"
                  class="mc-background-color-brand-base mc-absolute mc-bottom-2 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Menu>
    <div v-if="props.displayHelper" :class="datePickerClasses.datePickerInputHelperClasses">
      <slot name="helperMessage">
        <Icon v-if="props.helperIcon" class="mc-h-5 mc-min-h-5 mc-w-5 mc-min-w-5" :icon="props.helperIcon" />
        <span>{{ props.helperText }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Menu } from 'floating-vue';
import { Icon } from '@iconify/vue';

import 'floating-vue/dist/style.css';

import { datePickerPropTypes, datePickerEmitTypes } from './date-picker';
import { useDatePicker } from './use-date-picker';

import McButton from '@/components/button/button.vue';

const props = defineProps(datePickerPropTypes);
const emit = defineEmits(datePickerEmitTypes);

const {
  datePickerClasses,
  datePickerRef,
  monthInputRef,
  dateInputRef,
  yearInputRef,
  datePopperState,
  currentTab,
  currentDate,
  daysOfWeek,
  dateInput,
  monthsList,
  monthInput,
  yearInput,
  calendarTabPageData,
  calendarTabIsMinMonth,
  calendarTabIsMaxMonth,
  calendarTabIsRestDay,
  calendarTabIsTodayIndicator,
  calendarTabIsActiveMonthDates,
  calendarTabIsInactiveMonthDates,
  calendarTabIsSelectedDate,
  calendarTabIsUnSelectedDate,
  calendarTabIsDateIsDisabled,
  calendarTabHandleDateInput,
  getMonthObject,
  getTabClasses,
  isDatePickerPopperDisabled,
  calendarTabPrevMonth,
  calendarTabNextMonth,
  monthTabHandleSelectedMonth,
  yearTabCurrentYearPage,
  yearTabGoToPreviousPage,
  yearTabGoToNextPage,
  yearTabIsPreviousButtonDisabled,
  yearTabIsNextButtonDisabled,
  yearTabHandleSelectedYear,
  handleMonthInput,
  handleDateInput,
  handleYearInput,
  handleTabClick,
  handleBackspace,
  clearDate,
  handleSlotClick,
} = useDatePicker(props, emit);

defineExpose({
  clear: () => clearDate(),
});
</script>
