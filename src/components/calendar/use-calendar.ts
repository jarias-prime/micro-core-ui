import { computed, SetupContext, toRefs, ref, watch, Slots } from 'vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import classNames from 'classnames';
import { useInfiniteScroll } from '@vueuse/core';
import { useVModel } from '@vueuse/core';

dayjs.extend(isBetween);

import type { CalendarPropTypes, CalendarEmitTypes, SelectedShift } from './calendar';

export const useCalendar = (props: CalendarPropTypes, emit: SetupContext<CalendarEmitTypes>['emit'], slots: Slots) => {
  const { initialDate, hideCopyButton } = toRefs(props);

  const state = {
    dateFormat: ref('YYYY-MM-DD'),
    companyDropDown: ref([]),
    departmentDropDown: ref([]),
    branchDropDown: ref([]),
    currentDate: ref(dayjs(initialDate.value)),
    searchTerm: ref<string>(''),
    selectedCompany: ref<string>(''),
    selectedDepartment: ref<string>(''),
    selectedBranch: ref<string>(''),
    isHover: ref<boolean>(false),
    hoveredCell: ref<number>(),
    employeeId: ref<number>(),
    sort: ref<string>(''),
    tableBodyRef: ref<HTMLElement | null>(null),

    isClick: ref<boolean>(false),
    clickedCellIndex: ref<number>(),
    employeeIdClickedCell: ref<number>(),
  };

  const searchEmployee = useVModel(props, 'search', emit);
  const selectedCell = useVModel(props, 'selectedCell', emit);

  const getSortIcon = computed(() => {
    if (!state.sort.value) {
      return 'ph:caret-up-down-light';
    }

    return state.sort.value === 'asc' ? 'ph:arrow-up' : 'ph:arrow-down';
  });

  const startDate = computed(() => state.currentDate.value.startOf('week'));

  const weekDates = computed(() => {
    return Array.from({ length: 7 }).map((_, index) => startDate.value.add(index, 'day'));
  });

  const weekRangeDisplay = computed(() => {
    const weekStart = startDate.value;
    const weekEnd = startDate.value.add(6, 'day');
    const format = 'MMM YYYY';

    if (weekStart.format('YYYY') !== weekEnd.format('YYYY')) {
      return `${weekStart.format(format)} - ${weekEnd.format(format)}`;
    }

    if (weekStart.format('MMM') !== weekEnd.format('MMM')) {
      return `${weekStart.format('MMM')} - ${weekEnd.format(format)}`;
    }

    return `${weekStart.format(format)}`;
  });

  const formatDate = (date: dayjs.Dayjs, formatStr: string) => date.format(formatStr);

  const isToday = (date: dayjs.Dayjs) => date.isSame(dayjs(), 'day');

  const prevWeek = () => {
    state.currentDate.value = state.currentDate.value.subtract(1, 'week');
  };

  const nextWeek = () => {
    state.currentDate.value = state.currentDate.value.add(1, 'week');
  };

  const getFirstAndLastDayOfWeek = () => {
    if (!state.currentDate.value) return;

    const firstDayOfWeek = state.currentDate.value.startOf('week');
    const lastDayOfWeek = state.currentDate.value.endOf('week');

    emit('update:firstLastDayOfWeek', {
      firstDay: firstDayOfWeek.format(state.dateFormat.value),
      lastDay: lastDayOfWeek.format(state.dateFormat.value),
    });
  };

  const goToToday = () => {
    const today = dayjs();
    const currentWeekStart = state.currentDate.value.startOf('week');
    const currentWeekEnd = state.currentDate.value.endOf('week');

    // Only update if today is not within the current week
    if (!today.isBetween(currentWeekStart, currentWeekEnd, 'day', '[]')) {
      state.currentDate.value = today;
    }
  };

  const onCellClick = (selected: SelectedShift) => {
    selectedCell.value = selected;
    emit('onCellClick', selected);
  };

  const handleHover = (isHover: boolean, index: number, employeeId: number) => {
    state.isHover.value = isHover;
    state.hoveredCell.value = isHover ? index : undefined;
    state.employeeId.value = employeeId;
    emit('onHover', { isHover, index, employeeId });
  };

  const showCopyShift = (index: number, employeeId: number) => {
    return (
      state.hoveredCell.value === index &&
      state.isHover.value &&
      state.employeeId.value === employeeId &&
      !hideCopyButton.value
    );
  };

  const showCustomSlot = (index: number, employeeId: number) => {
    return (
      state.hoveredCell.value === index &&
      state.isHover.value &&
      state.employeeId.value === employeeId &&
      slots.hoverCell
    );
  };

  const handleClick = (isClick: boolean, index: number, employeeId: number) => {
    state.isClick.value = isClick;
    state.clickedCellIndex.value = index;
    state.employeeIdClickedCell.value = employeeId;
    emit('onClick', { isClick, index, employeeId });
  };

  const handleSorting = () => {
    if (state.sort.value === 'asc') state.sort.value = '';
    else state.sort.value = state.sort.value === 'desc' ? 'asc' : 'desc';

    emit('update:sort', state.sort.value);
  };

  useInfiniteScroll(
    state.tableBodyRef,
    () => {
      emit('loadMore');
    },
    {
      distance: 50,
      direction: 'bottom',
    },
  );

  const getCalendarClasses = computed(() => {
    const borderClasses = classNames(' mc-border mc-border-color-weak mc-border-solid');
    const headerWrapper = classNames(
      'mc-bg-color-weak mc-flex mc-w-full mc-items-center mc-justify-between mc-p-size-spacing-sm',
    );

    const contentWrapper = classNames(
      ' mc-flex mc-flex-col mc-h-full mc-divide-color-weak mc-divide-x-0 mc-divide-y mc-divide-solid',
    );
    const calendarTable = classNames(
      'mc-h-full mc-table mc-w-full mc-table-fixed mc-border-collapse mc-border-spacing-0 mc-rounded-border',
    );
    const tableHeaderEmployeeName = classNames(
      'mc-sticky mc-left-0 mc-z-20 mc-background-color mc-body-xs-regular-medium mc-p-size-spacing-3xs mc-py-size-spacing-xs mc-text-left mc-overflow-hidden mc-h-full mc-border-x-0 mc-border-t-0 ',
    );
    const tableHeader = classNames(
      'mc-background-color mc-border-x-0 mc-border-t-0 mc-border-l  mc-px-size-spacing-3xs mc-py-size-spacing-xs mc-text-center',
    );
    const headerContent = classNames(
      'mc-flex lg:mc-flex-row md:mc-flex-col sm:mc-flex-col mc-w-full mc-items-center mc-gap-size-spacing-3xs mc-overflow-hidden',
    );
    const headerDate = classNames(
      'mc-font-size-400 mc-line-height-500 mc-letter-spacing-dense mc-flex mc-h-size-spacing-md mc-w-size-spacing-md mc-items-center mc-justify-center mc-rounded-full mc-font-main mc-font-normal',
    );

    getFirstAndLastDayOfWeek();

    watch(state.searchTerm, (value, oldValue) => {
      if (value === oldValue) return; // Prevent unnecessary updates
      searchEmployee.value = value;
    });
    return {
      borderClasses,
      headerWrapper,
      contentWrapper,
      calendarTable,
      tableHeaderEmployeeName,
      tableHeader,
      headerContent,
      headerDate,
    };
  });

  return {
    weekDates,
    weekRangeDisplay,
    getCalendarClasses,
    getSortIcon,

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

    ...state,
  };
};
