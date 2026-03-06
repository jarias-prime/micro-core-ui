<template>
  <div>
    <Menu
      v-model:shown="datePopperState"
      aria-id="date-range-picker-wrapper"
      distance="4"
      :placement="finalPlacement"
      :triggers="[]"
      :popper-hide-triggers="[]"
      :auto-hide="false"
      :disabled="isDateRangePickerPopperDisabled"
      :container="props.popperContainer ? props.popperContainer : `#${props.id}`"
      :reference="activeInputRef"
      :strategy="
        props.popperStrategy === 'fixed' || props.popperStrategy === 'absolute' ? props.popperStrategy : 'absolute'
      "
      :delay="0"
      :auto-placement="!isUsingCustomSlot"
      :style="{
        position: props.wrapperPosition,
        width: props.width,
      }"
    >
      <div :id="props.id" class="mc-grid mc-gap-size-spacing-4xs">
        <label v-if="props.label" :for="props.id" :class="dateRangePickerClasses.labelClasses">
          {{ props.label }}
        </label>

        <!-- Date Range Input Container -->
        <div class="mc-flex mc-w-full mc-items-center mc-gap-2">
          <slot :handle-click="handleCustomComponentClick">
            <!-- fallback: original input fields -->
            <!-- Start Date Input -->
            <div
              ref="startDateContainerRef"
              :class="['mc-flex-1', dateRangePickerClasses.dateRangePickerBaseInputClasses]"
              @click.stop="handleStartDateClick"
            >
              <div class="mc-flex mc-h-full mc-items-center mc-gap-1.5">
                <input
                  :id="`${props.id}-start-month`"
                  ref="startMonthInputRef"
                  v-model="startMonthInput"
                  :class="[
                    'mc-w-[38px] mc-min-w-[38px] mc-uppercase',
                    dateRangePickerClasses.dateRangePickerInputClasses,
                  ]"
                  type="text"
                  placeholder="MMM"
                  maxlength="3"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleStartMonthInput"
                  @keyup="handleStartMonthInput"
                  @keydown="handleBackspace('start-month', $event)"
                />
                <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
                <input
                  :id="`${props.id}-start-date`"
                  ref="startDateInputRef"
                  v-model="startDateInput"
                  :class="[
                    'mc-w-[24px] mc-min-w-[24px] mc-text-center',
                    dateRangePickerClasses.dateRangePickerInputClasses,
                  ]"
                  type="text"
                  placeholder="DD"
                  maxlength="2"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleStartDateInput"
                  @keyup="handleStartDateInput"
                  @keydown="handleBackspace('start-date', $event)"
                />
                <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
                <input
                  :id="`${props.id}-start-year`"
                  ref="startYearInputRef"
                  v-model="startYearInput"
                  :class="['mc-w-[42px] mc-min-w-[42px]', dateRangePickerClasses.dateRangePickerInputClasses]"
                  type="text"
                  placeholder="YYYY"
                  maxlength="4"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleStartYearInput"
                  @keyup="handleStartYearInput"
                  @keydown="handleBackspace('start-year', $event)"
                />
              </div>
              <div class="mc-flex mc-items-center mc-justify-center">
                <Icon class="mc-text-color-supporting mc-h-4 mc-w-4" icon="ph:calendar-blank" />
              </div>
            </div>
            <!-- Separator -->
            <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">{{ props.separator }}</span>
            <!-- End Date Input -->
            <div
              ref="endDateContainerRef"
              :class="['mc-flex-1', dateRangePickerClasses.dateRangePickerBaseInputClasses]"
              @click.stop="handleEndDateClick"
            >
              <div class="mc-flex mc-h-full mc-items-center mc-gap-1.5">
                <input
                  :id="`${props.id}-end-month`"
                  ref="endMonthInputRef"
                  v-model="endMonthInput"
                  :class="[
                    'mc-w-[38px] mc-min-w-[38px] mc-uppercase',
                    dateRangePickerClasses.dateRangePickerInputClasses,
                  ]"
                  type="text"
                  placeholder="MMM"
                  maxlength="3"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleEndMonthInput"
                  @keyup="handleEndMonthInput"
                  @keydown="handleBackspace('end-month', $event)"
                />
                <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
                <input
                  :id="`${props.id}-end-date`"
                  ref="endDateInputRef"
                  v-model="endDateInput"
                  :class="[
                    'mc-w-[24px] mc-min-w-[24px] mc-text-center',
                    dateRangePickerClasses.dateRangePickerInputClasses,
                  ]"
                  type="text"
                  placeholder="DD"
                  maxlength="2"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleEndDateInput"
                  @keyup="handleEndDateInput"
                  @keydown="handleBackspace('end-date', $event)"
                />
                <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
                <input
                  :id="`${props.id}-end-year`"
                  ref="endYearInputRef"
                  v-model="endYearInput"
                  :class="['mc-w-[42px] mc-min-w-[42px]', dateRangePickerClasses.dateRangePickerInputClasses]"
                  type="text"
                  placeholder="YYYY"
                  maxlength="4"
                  :disabled="props.disabled"
                  :readonly="props.readonly"
                  @input="handleEndYearInput"
                  @keyup="handleEndYearInput"
                  @keydown="handleBackspace('end-year', $event)"
                />
              </div>
              <div class="mc-flex mc-items-center mc-justify-center">
                <Icon class="mc-text-color-supporting mc-h-4 mc-w-4" icon="ph:calendar-blank" />
              </div>
            </div>
          </slot>
        </div>
      </div>

      <template #popper>
        <div ref="dateRangePickerRef">
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
                  v-if="minMaxYear.min <= day.date.year() && minMaxYear.max >= day.date.year()"
                  :class="[
                    dateRangePickerClasses.calendarTabItemsBaseClasses,
                    {
                      // Rest Days
                      'mc-background-color-disabled': calendarTabIsRestDay(day),

                      // Today Indicator - only apply green color if not selected
                      'mc-text-green-600': calendarTabIsTodayIndicator(day) && !calendarTabIsSelectedDate(day),

                      // Active Month Dates - only apply if not selected and not today
                      'mc-text-color-strong':
                        calendarTabIsActiveMonthDates(day) &&
                        !calendarTabIsSelectedDate(day) &&
                        !calendarTabIsTodayIndicator(day) &&
                        !calendarTabIsInRange(day),

                      // Inactive Month Dates (Past/Future)
                      'mc-text-color-disabled': calendarTabIsInactiveMonthDates(day),

                      // Selected Date (Start or End) - Use brand color scheme from date picker
                      'mc-background-color-brand-base active:mc-background-color-brand-pressed mc-text-color-inverted-strong mc-font-medium !mc-text-white-50 active:mc-scale-95':
                        calendarTabIsSelectedDate(day),

                      // In Range (between start and end) - Light green background with brand outline, no border, using mc- prefix
                      'mc-cursor-pointer mc-bg-green-100 mc-outline mc-outline-1 mc-outline-offset-[-0.5px] mc-outline-kangkong-700':
                        calendarTabIsInRange(day),

                      // Unselected Date - Gray border, no hover effects
                      'mc-cursor-pointer mc-border mc-border-solid mc-border-gray-300':
                        calendarTabIsUnSelectedDate(day) && !calendarTabIsInRange(day),

                      // Disabled Dates
                      'mc-cursor-not-allowed mc-opacity-30': calendarTabIsDateIsDisabled(day),
                    },
                  ]"
                  @click="!calendarTabIsDateIsDisabled(day) ? calendarTabHandleDateInput(day) : null"
                >
                  <span>{{ day.date.date() }}</span>
                  <div
                    v-if="calendarTabIsTodayIndicator(day)"
                    class="mc-absolute mc-bottom-1 mc-m-auto mc-h-1 mc-w-1 mc-rounded-full mc-bg-green-600"
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
                  dateRangePickerClasses.monthsTabItemsBaseClasses,
                  {
                    'mc-text-color-brand-base': month.monthValue === currentDate.month(),
                    'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
                      month.text.toLowerCase() !== startMonthInput.toLowerCase() &&
                      month.text.toLowerCase() !== endMonthInput.toLowerCase(),
                    'mc-border-color-brand-base mc-background-color-single-active':
                      month.text.toLowerCase() === startMonthInput.toLowerCase() ||
                      month.text.toLowerCase() === endMonthInput.toLowerCase(),
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
                  dateRangePickerClasses.yearsTabItemsBaseClasses,
                  {
                    'mc-text-color-brand-base': year === currentDate.year(),
                    'mc-border-color-weak hover:mc-background-color-hover active:mc-background-color-pressed':
                      year !== Number(startYearInput) && year !== Number(endYearInput),
                    'mc-border-color-brand-base mc-background-color-single-active':
                      year === Number(startYearInput) || year === Number(endYearInput),
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

    <div v-if="props.displayHelper" :class="dateRangePickerClasses.dateRangePickerInputHelperClasses">
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

import { dateRangePickerPropTypes, dateRangePickerEmitTypes } from './date-range-picker';
import { useDateRangePicker } from './use-date-range-picker';

import McButton from '@/components/button/button.vue';

const props = defineProps(dateRangePickerPropTypes);
const emit = defineEmits(dateRangePickerEmitTypes);

const {
  dateRangePickerClasses,
  dateRangePickerRef,
  startMonthInputRef,
  startDateInputRef,
  startYearInputRef,
  endMonthInputRef,
  endDateInputRef,
  endYearInputRef,
  startDateContainerRef,
  endDateContainerRef,
  activeInputRef,
  datePopperState,
  currentTab,
  currentDate,
  daysOfWeek,
  monthsList,
  startMonthInput,
  startDateInput,
  startYearInput,
  endMonthInput,
  endDateInput,
  endYearInput,
  calendarTabPageData,
  calendarTabIsMinMonth,
  calendarTabIsMaxMonth,
  calendarTabIsRestDay,
  calendarTabIsTodayIndicator,
  calendarTabIsActiveMonthDates,
  calendarTabIsInactiveMonthDates,
  calendarTabIsSelectedDate,
  calendarTabIsInRange,
  calendarTabIsUnSelectedDate,
  calendarTabIsDateIsDisabled,
  calendarTabHandleDateInput,
  getMonthObject,
  getTabClasses,
  isDateRangePickerPopperDisabled,
  calendarTabPrevMonth,
  calendarTabNextMonth,
  monthTabHandleSelectedMonth,
  yearTabCurrentYearPage,
  yearTabGoToPreviousPage,
  yearTabGoToNextPage,
  yearTabIsPreviousButtonDisabled,
  yearTabIsNextButtonDisabled,
  yearTabHandleSelectedYear,
  handleStartMonthInput,
  handleStartDateInput,
  handleStartYearInput,
  handleEndMonthInput,
  handleEndDateInput,
  handleEndYearInput,
  handleTabClick,
  handleBackspace,
  isUsingCustomSlot,
  finalPlacement,
  handleStartDateClick,
  handleEndDateClick,
  handleCustomComponentClick,
} = useDateRangePicker(props, emit);
</script>
