<template>
  <div>
    <Menu
      v-model:shown="monthYearPopperState"
      aria-id="month-year-picker-wrapper"
      distance="4"
      :placement="props.placement"
      :triggers="[]"
      :popper-hide-triggers="[]"
      :auto-hide="true"
      :disabled="isMonthYearPickerPopperDisabled"
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
      <div :id="props.id" class="mc-grid mc-gap-size-spacing-4xs">
        <label v-if="props.label" :for="props.id" :class="monthYearPickerClasses.labelClasses">
          {{ props.label }}
        </label>
        <slot :handle-click="handleSlotClick">
          <div
            ref="monthYearPickerRef"
            :class="[monthYearPickerClasses.monthYearPickerBaseInputClasses, 'mc-relative mc-z-10']"
            @click="monthYearPopperState = true"
          >
            <div class="mc-flex mc-h-full mc-items-center mc-gap-1.5">
              <input
                :id="`${props.id}-month`"
                ref="monthInputRef"
                v-model="monthInput"
                :class="['mc-w-[38px] mc-min-w-[38px]', monthYearPickerClasses.monthYearPickerInputClasses]"
                type="text"
                placeholder="MMM"
                maxlength="3"
                :disabled="props.disabled"
                :readonly="props.readonly"
                autocomplete="off"
                @input="handleMonthInput"
                @keyup="handleMonthInput"
                @keydown="handleBackspace('month', $event)"
              />
              <span class="mc-text-color-strong mc-font-size-200 mc-text-color-weak">/</span>
              <input
                :id="`${props.id}-year`"
                ref="yearInputRef"
                v-model="yearInput"
                :class="['mc-w-[42px] mc-min-w-[42px]', monthYearPickerClasses.monthYearPickerInputClasses]"
                type="text"
                placeholder="YYYY"
                maxlength="4"
                :disabled="props.disabled"
                :readonly="props.readonly"
                autocomplete="off"
                @input="handleYearInput"
                @keyup="handleYearInput"
                @keydown="handleBackspace('year', $event)"
              />
            </div>
            <div class="mc-flex mc-items-center mc-justify-center">
              <Icon class="mc-text-color-supporting mc-h-4 mc-w-4" icon="ph:calendar-blank" />
            </div>
          </div>
        </slot>
      </div>

      <template #popper>
        <div ref="monthYearPickerRef">
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
                {{ getMonthObject('monthValue', selectedMonth ?? 0)?.fullText || 'Month' }}
              </mc-button>
              <mc-button
                :class="getTabClasses('tab-years')"
                variant="secondary"
                size="small"
                @click="handleTabClick('tab-years')"
              >
                {{ yearInput || 'Year' }}
              </mc-button>
            </div>

            <!-- Next & Previous Buttons (for Year Tab) -->
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
            <!-- Months Tab -->
            <div v-if="currentTab === 'tab-months'" class="mc-grid mc-grid-cols-4 mc-gap-2">
              <div
                v-for="(month, monthIndex) in monthsList"
                :key="monthIndex"
                :class="[
                  monthYearPickerClasses.monthsTabItemsBaseClasses,
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

            <!-- Years Tab -->
            <div v-if="currentTab === 'tab-years'" class="mc-grid mc-grid-cols-4 mc-gap-2">
              <div
                v-for="(year, index) in yearTabCurrentYearPage"
                :key="index"
                :class="[
                  monthYearPickerClasses.yearsTabItemsBaseClasses,
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
    <div v-if="props.displayHelper" :class="monthYearPickerClasses.monthYearPickerInputHelperClasses">
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

import { monthYearPickerPropTypes, monthYearPickerEmitTypes } from './month-year-picker';
import { useMonthYearPicker } from './use-month-year-picker';

import McButton from '@/components/button/button.vue';

const props = defineProps(monthYearPickerPropTypes);
const emit = defineEmits(monthYearPickerEmitTypes);

const {
  monthYearPickerClasses,
  monthYearPickerRef,
  monthInputRef,
  yearInputRef,
  monthYearPopperState,
  currentTab,
  currentDate,
  monthsList,
  monthInput,
  yearInput,
  selectedMonth,
  monthTabHandleSelectedMonth,
  yearTabCurrentYearPage,
  yearTabGoToPreviousPage,
  yearTabGoToNextPage,
  yearTabIsPreviousButtonDisabled,
  yearTabIsNextButtonDisabled,
  yearTabHandleSelectedYear,
  getMonthObject,
  getTabClasses,
  isMonthYearPickerPopperDisabled,
  handleMonthInput,
  handleYearInput,
  handleTabClick,
  handleBackspace,
  clearMonthYear,
  handleSlotClick,
} = useMonthYearPicker(props, emit);

defineExpose({
  clear: () => clearMonthYear(),
});
</script>
