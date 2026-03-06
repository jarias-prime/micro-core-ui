<template>
  <McCard flexbox :has-content-padding="false" class="mc-flex mc-h-full mc-flex-col mc-overflow-hidden">
    <template #content>
      <div :class="getCalendarClasses.contentWrapper">
        <div :class="[getCalendarClasses.headerWrapper]">
          <div class="mc-flex mc-items-center mc-justify-center mc-gap-size-spacing-3xs">
            <div class="mc-flex">
              <mc-button id="calendar-prev-week" variant="tertiary" has-icon @click="prevWeek">
                <Icon icon="ph:caret-left-fill" class="mc-text-color-success-base" />
              </mc-button>
              <mc-button id="calendar-next-week" variant="tertiary" has-icon @click="nextWeek">
                <Icon icon="ph:caret-right-fill" class="mc-text-color-success-base" />
              </mc-button>
            </div>
            <div class="mc-heading-xs">{{ weekRangeDisplay }}</div>
          </div>

          <div class="mc-flex mc-items-center mc-justify-center mc-gap-size-spacing-3xs">
            <mc-button id="calendar-today" variant="secondary" size="large" @click="goToToday"> Today </mc-button>
            <slot name="headerActions" />
          </div>
        </div>
        <!-- Filters -->
        <slot name="filter" />

        <div class="mc-table-wrapper mc-relative mc-flex mc-h-full mc-flex-col mc-overflow-hidden">
          <div class="mc-h-full">
            <table id="table-calendar" aria-describedby="calendar" :class="getCalendarClasses.calendarTable">
              <!-- Calendar Header -->
              <thead>
                <tr>
                  <th
                    :class="[
                      getCalendarClasses.tableHeaderEmployeeName,
                      'mc-sticky mc-left-0',
                      getCalendarClasses.borderClasses,
                    ]"
                  >
                    <div :class="getCalendarClasses.headerContent">
                      <div class="mc-font-size-200">Employee Name</div>
                      <div
                        id="calendar-sort-button"
                        :class="['mc-flex mc-cursor-pointer mc-flex-row mc-items-center mc-p-size-spacing-6xs']"
                        @click="handleSorting"
                      >
                        <Icon :icon="getSortIcon" height="16" width="16" :class="[{ 'mc-text-kangkong-700': sort }]" />
                      </div>
                    </div>
                  </th>
                  <th
                    v-for="(date, index) in weekDates"
                    :key="index"
                    :class="[getCalendarClasses.borderClasses, getCalendarClasses.tableHeader]"
                  >
                    <div :class="getCalendarClasses.headerContent">
                      <div
                        :class="[
                          getCalendarClasses.headerDate,
                          {
                            'mc-background-color-brand-base mc-text-color-inverted-strong': isToday(date),
                          },
                        ]"
                      >
                        {{ formatDate(date, 'DD') }}
                      </div>
                      <div class="mc-body-sm-regular">
                        {{ formatDate(date, 'ddd').toUpperCase() }}
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="employees.length > 0 && !loading" ref="tableBodyRef" class="mc-h-full mc-overflow-y-auto">
                <tr v-for="employee in employees" :key="employee.id">
                  <td
                    :class="[
                      getCalendarClasses.borderClasses,
                      'mc-bg-white mc-sticky mc-left-0 mc-z-10 mc-h-[200px] mc-content-start mc-border-y mc-border-l-0 mc-border-r mc-border-t-0 mc-p-size-spacing-xs',
                    ]"
                  >
                    <div class="mc-flex mc-flex-col mc-gap-size-spacing-3xs mc-overflow-hidden">
                      <mc-avatar
                        :src="employee.avatar"
                        :initial="employee.name"
                        size="md"
                        :variant="employee.avatar ? 'image' : 'initial'"
                      />
                      <div class="mc-label-xs-regular">
                        {{ employee.name }}
                      </div>
                      <div class="mc-text-color-supporting mc-label-xs-regular mc-uppercase">
                        {{ employee.position }}
                      </div>
                    </div>
                    <div v-if="employee.hoursWorked && employee.hoursTarget" class="mc-mt-size-spacing-xs">
                      <mc-lozenge
                        :label="`${employee.hoursWorked || 0}/${employee.hoursTarget || 48} HRS`"
                        tone="neutral"
                      >
                        <template #icon>
                          <Icon icon="ph:clock" />
                        </template>
                      </mc-lozenge>
                    </div>
                  </td>
                  <td
                    v-for="(date, index) in weekDates"
                    :key="index"
                    :class="[
                      getCalendarClasses.borderClasses,
                      'mc-min-w-[180px] mc-content-start mc-space-y-size-spacing-3xs mc-border-x mc-border-b mc-border-t-0 mc-p-size-spacing-3xs last:mc-mb-size-spacing-lg last:mc-border-r-0',
                    ]"
                    @mouseover="handleHover(true, index, employee.id)"
                    @mouseleave="handleHover(false, index, employee.id)"
                    @click.self="handleClick(true, index, employee.id)"
                  >
                    <slot
                      name="calendarData"
                      :details="{
                        data: { ...employee },
                        date: formatDate(date, dateFormat),
                        shift: employee.schedule[formatDate(date, dateFormat)],
                        index: index,
                        employeeId: employee.id,
                      }"
                    >
                      <section
                        v-if="
                          employee.schedule[formatDate(date, dateFormat)] &&
                          employee.schedule[formatDate(date, dateFormat)].length > 0
                        "
                        class="mc-flex mc-flex-col mc-justify-start mc-gap-size-spacing-3xs"
                      >
                        <div
                          v-for="(schedule, scheduleIndex) in employee.schedule[formatDate(date, dateFormat)]"
                          :key="scheduleIndex"
                          class="mc-w-full"
                        >
                          <div
                            v-if="schedule.type === 'restday' || schedule.type === 'exempted'"
                            class="mc-flex mc-flex-col mc-items-center mc-justify-start"
                            @click="
                              onCellClick({
                                employeeId: employee.id,
                                date: formatDate(date, dateFormat),
                                shift: 'restday',
                              })
                            "
                          >
                            <mc-calendar-cell :type="schedule.type === 'restday' ? 'restday' : 'exempt'" fullwidth>
                              <template v-if="schedule.type === 'restday'" #prefix>
                                <Icon icon="ph:bed" />
                              </template>
                            </mc-calendar-cell>
                          </div>
                          <div
                            v-else
                            class="mc-flex mc-flex-col mc-items-center mc-justify-start"
                            @click="
                              onCellClick({
                                employeeId: employee.id,
                                date: formatDate(date, dateFormat),
                                shift: schedule,
                              })
                            "
                          >
                            <mc-calendar-cell
                              :view-only="false"
                              :title="`${schedule.startTime} - ${schedule.endTime}`"
                              :description="schedule.location"
                              :sub-description="schedule.type"
                              :type="schedule.color"
                              fullwidth
                            />
                          </div>
                        </div>
                      </section>

                      <section>
                        <slot
                          name="fixedCell"
                          :details="{
                            employeeId: employee.id,
                            date: formatDate(date, dateFormat),
                            shift: employee.schedule[formatDate(date, dateFormat)],
                          }"
                        />
                      </section>

                      <section v-if="showCustomSlot(index, employee.id)">
                        <slot
                          name="hoverCell"
                          :details="{
                            employeeId: employee.id,
                            date: formatDate(date, dateFormat),
                            shift: employee.schedule[formatDate(date, dateFormat)],
                          }"
                        />
                      </section>

                      <section
                        v-if="clickedCellIndex === index && employeeIdClickedCell === Number(employee.id) && isClick"
                      >
                        <slot
                          name="clickedCell"
                          :details="{
                            employeeId: employee.id,
                            date: formatDate(date, dateFormat),
                            shift: employee.schedule[formatDate(date, dateFormat)],
                          }"
                        />
                      </section>
                    </slot>

                    <section v-if="showCopyShift(index, employee.id)">
                      <slot
                        name="copy"
                        :copy="{
                          employeeId: employee.id,
                          date: formatDate(date, dateFormat),
                          shift: employee.schedule[formatDate(date, dateFormat)],
                        }"
                      >
                        <mc-calendar-cell
                          :view-only="false"
                          custom-border-size="1"
                          custom-color="#FFFFFF"
                          fullwidth
                          @on-click="
                            onCellClick({ employeeId: details.employeeId, date: details.date, shift: details.shift })
                          "
                        >
                          <div class="mc-flex mc-w-full mc-items-center mc-justify-center mc-gap-size-spacing-3xs">
                            <Icon icon="ph:copy-light" />
                            <div class="mc-label-xs-medium">Copy</div>
                          </div>
                        </mc-calendar-cell>
                      </slot>
                    </section>
                  </td>
                </tr>
                <tr v-if="props.infiniteLoading || props.loadingTextCompleted">
                  <td
                    :colspan="weekDates.length + 1"
                    class="mc-flex mc-h-full mc-items-center mc-justify-center mc-p-size-spacing-xs"
                  >
                    <div v-if="props.infiniteLoading">
                      <Icon icon="svg-spinners:ring-resize" class="mc-text-color-success-base mc-font-size-400" />
                    </div>

                    <div v-else>
                      {{ props.loadingTextCompleted }}
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="employees.length === 0 && loading">
                <tr v-for="employeeKey in 10" :key="employeeKey">
                  <td
                    :class="[
                      getCalendarClasses.borderClasses,
                      'mc-bg-white mc-sticky mc-left-0 mc-z-10 mc-content-start mc-border-y mc-border-l-0 mc-border-r mc-border-t-0 mc-p-size-spacing-xs',
                    ]"
                  >
                    <div class="mc-flex mc-flex-col mc-gap-size-spacing-3xs mc-overflow-hidden">
                      <mc-avatar size="md" variant="initial" color="tertiary" loading />
                      <div :class="[{ 'mc-skeletal-loader mc-h-6 mc-rounded-md': true }]" />
                      <div :class="[{ 'mc-skeletal-loader mc-h-6 mc-rounded-md': true }]" />
                    </div>
                    <div class="mc-mt-size-spacing-xs">
                      <mc-lozenge loading />
                    </div>
                  </td>
                  <td
                    v-for="weekDays in 7"
                    :key="weekDays"
                    :class="[
                      getCalendarClasses.borderClasses,
                      'mc-min-w-[180px] mc-content-start mc-space-y-size-spacing-3xs mc-border-x mc-border-b mc-border-t-0 mc-p-size-spacing-sm last:mc-mb-size-spacing-lg last:mc-border-r-0',
                    ]"
                  >
                    <section class="mc-flex mc-flex-col mc-justify-start mc-gap-size-spacing-3xs">
                      <div v-for="weekDaysValue in 1" :key="weekDaysValue" class="mc-w-full">
                        <div class="mc-flex mc-flex-col mc-items-center mc-justify-start">
                          <mc-calendar-cell type="restday" fullwidth loading />
                        </div>
                      </div>
                    </section>
                  </td>
                </tr>
              </tbody>
              <tbody v-else class="mc-h-full">
                <tr v-if="!loading" class="mc-h-full">
                  <td :colspan="weekDates.length + 1" class="mc-flex mc-h-full mc-items-center mc-justify-center">
                    <slot name="empty-state">
                      <McEmptyState
                        size="large"
                        :description="emptyStateTitle"
                        :sub-description="emptyStateDescription"
                      >
                        <template v-if="emptyStateButtonText" #button>
                          <mc-button tone="success"
                            ><Icon icon="ph:plus" @click="$emit('onClickEmptyButton')" />{{
                              emptyStateButtonText
                            }}</mc-button
                          >
                        </template>
                      </McEmptyState>
                    </slot>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </template>
  </McCard>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';
import { Icon } from '@iconify/vue';
import McButton from '@/components/button/button.vue';
import McAvatar from '@/components/avatar/avatar.vue';
import McCard from '@/components/card/card.vue';
import McLozenge from '@/components/lozenge/lozenge.vue';
import McCalendarCell from '@/components/calendar-cell/calendar-cell.vue';
import McEmptyState from '@/components/empty-state/empty-state.vue';
import { calendarPropTypes, calendarEmitTypes } from './calendar';

const props = defineProps(calendarPropTypes);
import { useCalendar } from './use-calendar';
const emit = defineEmits(calendarEmitTypes);
const slots = useSlots();

const {
  // State
  weekDates,
  weekRangeDisplay,
  getCalendarClasses,
  dateFormat,
  getSortIcon,
  sort,
  tableBodyRef,
  // Function
  formatDate,
  isToday,
  prevWeek,
  nextWeek,
  goToToday,
  onCellClick,
  handleHover,
  showCopyShift,
  handleSorting,
  showCustomSlot,
  handleClick,
  clickedCellIndex,
  employeeIdClickedCell,
  isClick,
} = useCalendar(props, emit, slots);
</script>
